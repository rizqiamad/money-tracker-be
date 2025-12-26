import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface IProps {
  otp?: string;
}

export default function EmailOtp({ otp }: IProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-aws text-[#212121]">
          <Preview>Guardana email verification</Preview>
          <Container className="p-5 mx-auto bg-[#eee]">
            <Section className="bg-white">
              <Section>
                <Img
                  src={`/guardana-logo.png`}
                  height="200"
                  alt="Guardana's Logo"
                />
              </Section>
              <Section className="py-[25px] px-[35px]">
                <Heading className="text-[#333] text-[20px] font-bold mb-[15px]">
                  Verify your email address
                </Heading>
                <Text className="text-[#333] text-[14px] leading-[24px] mt-6 mb-[14px] mx-0">
                  Thanks for starting journey with our app. We
                  want to make sure it's really you. Please enter the following
                  verification code when prompted. If you don&apos;t want to
                  create an account, you can ignore this message.
                </Text>
                <Section className="flex items-center justify-center">
                  <Text className="text-[#333] m-0 font-bold text-center text-[14px]">
                    Verification code
                  </Text>

                  <Text className="text-[#333] text-[36px] my-[10px] mx-0 font-bold text-center">
                    {otp}
                  </Text>
                  <Text className="text-[#333] text-[14px] m-0 text-center">
                    (This code is valid for 10 minutes)
                  </Text>
                </Section>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}