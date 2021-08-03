using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : MediatR.IRequest
        {
            public Domain.Activity Activity { get; set; }
        }

        public class Handler : MediatR.IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(Persistence.DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
  }
}