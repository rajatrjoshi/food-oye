const button = document.querySelectorAll(".get-data");

let dishes = [];
let dishesLength = 0;
dishes = JSON.parse(sessionStorage.getItem("fo_dishes"));
if(dishes != null)
	dishesLength = dishes.length;
else
	dishes = [];

for(let i = 0; i < button.length; i++)
{
	button[i].addEventListener
	(
		"click",
		() =>
		{
			let dishId = button[i].value;
			let isPresent = false;
			for(let j = 0; j < dishesLength; j++)
			{
				if(dishId === dishes[j])
				{
					isPresent = true;
					break;
				}
			}

			if(isPresent === false)
			{
				dishes.push(dishId);
				button[i].innerHTML="ADDED TO CARD";
				button[i].disabled = true;
				sessionStorage.setItem("fo_dishes", JSON.stringify(dishes));
			}
		}
	);
}

window.addEventListener
(
	"load",
	() =>
	{
		const dishesArr = JSON.parse(sessionStorage.getItem("fo_dishes"));

		if(dishesArr)
		{
			for(let i = 0; i < button.length; i++)
			{
				for(let j = 0; j < dishesArr.length; j++)
				{
					if(dishesArr[j] === button[i].value)
					{
						button[i].innerHTML = "ADDED TO CART";
						button[i].disabled = true;
					}
				}
			}
		}
	}	
);