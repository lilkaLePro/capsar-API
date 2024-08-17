import { mockRequest, mockResponse } from "../../moks"
import { getUsers } from "./userController"

describe('getUsers' , () => {
  it('should return an array of users', () => {
    getUsers(mockRequest , mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith([])
  })
})