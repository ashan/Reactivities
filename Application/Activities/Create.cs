using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
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
            private readonly DataContext _context;

            public Handler(Persistence.DataContext context)
            {
                _context = context;
            }

            public async Task<Application.Core.Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Application.Core.Result<MediatR.Unit>.Failure("Failed to create activity");
                return Application.Core.Result<MediatR.Unit>.Success(Unit.Value);
            }
        }
  }
}