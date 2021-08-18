using FluentValidation;

namespace Application.Activities
{
  public class ActivityVAlidator : FluentValidation.AbstractValidator<Domain.Activity>
  {
        public ActivityVAlidator()
        {
            RuleFor(a => a.Title).NotEmpty();
            RuleFor(a => a.Description).NotEmpty();
            RuleFor(a => a.Date).NotEmpty();
            RuleFor(a => a.Category).NotEmpty();
            RuleFor(a => a.City).NotEmpty();
            RuleFor(a => a.Venue).NotEmpty();
    }
  }
}