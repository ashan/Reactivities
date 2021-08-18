using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
  public class Edit
  {
    public class Command : MediatR.IRequest<Application.Core.Result<MediatR.Unit>>
    {
      public Domain.Activity Activity { get; set; }

    }
    public class CommandValidator : FluentValidation.AbstractValidator<Command>
    {
      public CommandValidator()
      {
          RuleFor(c => c.Activity).SetValidator(new ActivityVAlidator());
      }
    }

    public class Handler : MediatR.IRequestHandler<Command, Application.Core.Result<MediatR.Unit>>
    {
      private readonly Persistence.DataContext _context;
      private readonly AutoMapper.IMapper _mappeer;

      public Handler(Persistence.DataContext context, AutoMapper.IMapper mappeer)
      {
        _context = context;
        _mappeer = mappeer;
      }

      public async Task<Application.Core.Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _context.Activities.FindAsync(request.Activity.Id);
        if(activity == null) return null;

        _mappeer.Map(request.Activity, activity);
        var result = await _context.SaveChangesAsync() > 0;
        if(!result) return Application.Core.Result<MediatR.Unit>.Failure("Failed to update activity");
        return Application.Core.Result<MediatR.Unit>.Success(MediatR.Unit.Value);
      }
    }
  }
}