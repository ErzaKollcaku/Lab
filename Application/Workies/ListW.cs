using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Workies
{
    public class ListW
    {
        public class Query : IRequest<Result<List<Works>>> { }

        public class Handler : IRequestHandler<Query,Result<List<Works>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Works>>> Handle(Query request, CancellationToken cancellationToken)
            {
              
                return Result<List<Works>>.Success(await _context.Workies.ToListAsync(cancellationToken));
            }
        }
    }
}