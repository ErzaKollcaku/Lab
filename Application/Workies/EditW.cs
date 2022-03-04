using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Workies
{
    public class EditW
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Works Works { get; set; }
        }


           public class  CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Works).SetValidator( new WorksValidator());
            }
            
        }
        public class Handler : IRequestHandler<Command , Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var works = await _context.Workies.FindAsync(request.Works.Id);
                
                if(works == null) return null;
               _mapper.Map(request.Works, works);

               var result  = await _context.SaveChangesAsync() > 0;

            if(!result) return Result<Unit>.Failure("Failed to update works");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
