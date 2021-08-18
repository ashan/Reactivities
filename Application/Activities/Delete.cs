using System.Threading;
using System.Threading.Tasks;
using Persistence;

namespace Application.Activities
{
    public class Delete{ 
        public class Command : MediatR.IRequest<Application.Core.Result<MediatR.Unit>>
        {
            public System.Guid Id { get; set; }
        }

        public class Handler : MediatR.IRequestHandler<Command, Application.Core.Result<MediatR.Unit>>
        {
            private readonly DataContext _context;

            public Handler(Persistence.DataContext context)
            {
            _context = context;
            }

            public async Task<Application.Core.Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                // if(activity == null) return null;

                _context.Remove(activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Application.Core.Result<MediatR.Unit>.Failure("Failed to delete the Activity");
                return Application.Core.Result<MediatR.Unit>.Success(MediatR.Unit.Value);
            }
        }
    }
}