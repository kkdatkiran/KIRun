<table style="font-family: Roboto, Arial; background-color: #edf0f1; width: 100%; box-sizing: border-box;border:none;" cellspacing="0" cellpadding="0">
<tr><td style="padding:10px">
	<table style="width:80%;border:none;" cellspacing="0" cellpadding="0" align="center">
	<tr><td style="background-color: #ffffff; height: 250px; text-align:center;padding-bottom:15px;">
		<div><img src="cid:top" style="height: 350px; margin-top: 10px;" /></div>
	</td></tr>
	<tr><td style="background-color: #FFFFFF;padding-top:20px" align="center">
		<h1 style="font-size: 25px; line-height: 35px; font-weight: bold; color: #a85b37">Verify email address and activate user for KIRun</h1>
		<div style="width: 100%; font-size: 15px; color: #000; padding: 30px 45px; box-sizing: border-box; min-height: 300px; text-align: justify">
			Hi ${user.firstName} ${user.lastName},<br /> <br />			
			Please click on the button below to verify and activate user.
			<div style="width: 100%;text-align:center; padding: 30px;">
			<a href="${urlPrefix}/activateUser/${user.email}/${user.activationString}" style="text-decoration:none;line-height:100%;background:#a85b37;color:white;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;padding: 10px 30px;border-radius:3px">Verify</a>
			</div>
			If the above button don't work please copy the link below and open in a browser.
			<span style="color: #a85b37;font-weight:bold; display:block;padding:10px;text-align:center">${urlPrefix}/activateUser/${user.email}/${user.activationString}</span>	
		</div>
	</td></tr>
	<tr><td style="background-color: #fbfbfb; padding: 30px;" align="center">
	<div style="color: #a85b37;">
		<table cellspacing="0" cellpadding="0" style="border:none; border-bottom: 1px solid #a85b37">
		<tr><td>
			<div style="font-size: 12px; color: #a85b37; padding-top: 20px; padding-left: 15px; padding-bottom: 20px;">
				<div style="text-align: justify">The contents of this mail are intended for the person it is addressed to. Any unauthorized use or dissemination is strictly prohibited. If you received this mail in error, please notify us immediately by replying to this email and erase all the communication after.</div>
			</div>
			</td><td>
			<div style="padding-left: 30px; padding-right: 15px; padding-bottom: 20px; box-sizing: border-box;">
				<img src="cid:logo"	style="height: 50px;" />
			</div>
			</td>
		</tr></table>
		<div style="color: #EAEAEA; font-size: 25px; padding-top: 20px; padding-left: 15px; width: 100%; box-sizing: border-box; text-align: left;">KINETIC INSTRUCTION RUNTIME</div>
	</td></tr>
	</table>
</td></tr>
</table>