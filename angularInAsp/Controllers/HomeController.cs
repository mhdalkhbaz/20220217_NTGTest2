using angularInAsp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace angularInAsp.Controllers
{
    public class HomeController : Controller
    {
        private CompanyDBEntities db = new CompanyDBEntities();


        public ActionResult Index()
        {
            return View();
        }


        // GET: Employees
        public JsonResult GetEmployeesJson()
        {
                var emp = db.Employees.ToList();

            return new JsonResult { Data = emp, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
         }



        public JsonResult GetEmployee(int id)
        {
            var emp = db.Employees.Find(id);
            
            return new JsonResult { Data = emp, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }



        [HttpPost]
        public ActionResult SaveRecord([Bind(Include = "Id,Name,Department,Salary")] Employee employee)
        {
            
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();
                 return RedirectToAction("About");

        }
      

    
    }
}