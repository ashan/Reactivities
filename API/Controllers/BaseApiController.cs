using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private MediatR.IMediator _mediator;
        protected MediatR.IMediator Mediator => _mediator 
            ??= HttpContext.RequestServices.GetService<MediatR.IMediator>();
        
    }
}