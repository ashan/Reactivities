using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Application.Activities
{
  public class Edit
  {
    public class Command : MediatR.IRequest
    {
      public Domain.Activity Activity { get; set; }

    }

    public class Handler : MediatR.IRequestHandler<Command>
    {
      private readonly Persistence.DataContext _context;
      private readonly AutoMapper.IMapper _mappeer;

      public Handler(Persistence.DataContext context, AutoMapper.IMapper mappeer)
      {
        _context = context;
        _mappeer = mappeer;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _context.Activities.FindAsync(request.Activity.Id);
        _mappeer.Map(request.Activity, activity);

        await _context.SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}