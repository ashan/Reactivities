using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading;
using System.Threading.Tasks;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Core.Result<List<Activity>>>
        {

        }
        public class Handler : IRequestHandler<Query, Core.Result<List<Activity>>>
        {
            public readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Core.Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _context.Activities.ToListAsync();
                return Core.Result<List<Activity>>.Success(results);
            }
        }
  }
}