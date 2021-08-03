using System.Threading;
using System.Threading.Tasks;
using Domain;

namespace Application.Activities
{
  public class Details
  {
    public class Query : MediatR.IRequest<Domain.Activity>
    {
      public System.Guid Id { get; set; }
    }

    public class Handler : MediatR.IRequestHandler<Query, Domain.Activity>
    {
      private readonly Persistence.DataContext _context;
      public Handler(Persistence.DataContext context)
      {
        _context = context;
      }

      public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
      {
        return await _context.Activities.FindAsync(request.Id);
      }
    }
  }
}