using System;
using System.Threading.Tasks;
using Application.Workies;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class WorkiesController : BaseApiController
    {


        [HttpGet]
        public async Task<IActionResult> GetWorkies()
        {
            return HandleResult(await Mediator.Send(new ListW.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorks(Guid id)
        {


            return HandleResult(await Mediator.Send(new DetailsW.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorks(Works works)
        {
            return HandleResult(await Mediator.Send(new CreateW.Command { Works = works }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditWorks(Guid id, Works works)
        {

            works.Id = id;
            return HandleResult(await Mediator.Send(new EditW.Command { Works = works }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorks(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteW.Command { Id = id }));
        }
    }
}