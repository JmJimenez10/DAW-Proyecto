package es.jimenezyhormigo.tfg.mapper;

import es.jimenezyhormigo.tfg.dto.ReqRes;
import es.jimenezyhormigo.tfg.entity.OurUser;

public class UserMapper {
	
	public static ReqRes mapToUserDto(OurUser user) {
	    ReqRes reqRes = new ReqRes();
	    reqRes.setDni(user.getDni());
	    reqRes.setName(user.getName());
	    reqRes.setSurnames(user.getSurnames());
	    reqRes.setEmail(user.getEmail());
	    reqRes.setPassword(user.getPassword());
	    reqRes.setEmailNotifications(user.isEmailNotifications());
	    reqRes.setRole(user.getRole());
	    reqRes.setCreationDate(user.getCreationDate());
	    return reqRes;
	}
	
	public static OurUser mapToUser(ReqRes userDto) {
	    OurUser ourUser = new OurUser();
	    ourUser.setDni(userDto.getDni());
	    ourUser.setName(userDto.getName());
	    ourUser.setSurnames(userDto.getSurnames());
	    ourUser.setEmail(userDto.getEmail());
	    ourUser.setPassword(userDto.getPassword());
	    ourUser.setEmailNotifications(userDto.isEmailNotifications());
	    ourUser.setRole(userDto.getRole());
	    ourUser.setCreationDate(userDto.getCreationDate());
	    return ourUser;
	}

}
