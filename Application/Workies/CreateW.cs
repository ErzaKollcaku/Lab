using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Workies
{
    public class CreateW
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
        public class Handler : IRequestHandler<Command ,Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Workies.Add(request.Works);

              var result =  await _context.SaveChangesAsync() > 0;

              if(!result) return Result<Unit>.Failure("Failed to create works");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}