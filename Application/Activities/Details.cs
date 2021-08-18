using System.Threading;
using System.Threading.Tasks;
using Domain;

namespace Application.Activities
{
  public class Details
  {
    public class Query : MediatR.IRequest<Core.Result<Domain.Activity>>
    {
      public System.Guid Id { get; set; }
    }

    public class Handler : MediatR.IRequestHandler<Query, Core.Result<Domain.Activity>>
    {
      private readonly Persistence.DataContext _context;
      public Handler(Persistence.DataContext context)
      {
        _context = context;
      }

      public async Task<Core.Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
      {
        var activity =  await _context.Activities.FindAsync(request.Id);
        return Core.Result<Domain.Activity>.Success(activity);
      }
    }
  }
}