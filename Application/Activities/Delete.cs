using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete{

    
        public class Command : MediatR.IRequest
        {
            public System.Guid Id { get; set; }
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
                var activity = await _context.Activities.FindAsync(request.Id);

                _context.Remove(activity);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}