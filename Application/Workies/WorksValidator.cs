using Domain;
using FluentValidation;

namespace Application.Workies
{
    public class WorksValidator : AbstractValidator<Works>
    {
        public WorksValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();

        }
    }
}