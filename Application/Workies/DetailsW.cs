using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Workies
{
    public class DetailsW
    {
        public class Query : IRequest<Result<Works>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,   Result <Works>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Works>> Handle(Query request, CancellationToken cancellationToken)
            {
               
                var works = await _context.Workies.FindAsync(request.Id);
            
              

                return Result<Works>.Success(works);
            }
        }
    }
}