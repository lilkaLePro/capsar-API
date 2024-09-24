import { mockRequest, mockResponse } from "../../moks"
import { getAllUsers } from "./userController"

describe('getUsers' , () => {
  it('should return an array of users', () => {
    getAllUsers(mockRequest , mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith([])
  })
})  