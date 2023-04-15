def main():
    user_input = input("Greeting: ")
    if user_input == "hello":
        print("$100")
        return
    split_input = list(user_input)
    if split_input[0] == "h":
        print("$20")
    else:
        print("$0")


main()
