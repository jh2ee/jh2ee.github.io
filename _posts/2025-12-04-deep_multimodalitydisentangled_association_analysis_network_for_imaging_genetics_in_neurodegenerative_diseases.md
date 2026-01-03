---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYQMAPVF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCuSimwEy9zQV0YRyyqp14O%2FMcpinhEe%2Fgf%2BSoyVBuwwAIhANh0pngu8v%2BKvUgFFEFL3zQv81lQ8sTTQeO25RTGy1bxKv8DCBMQABoMNjM3NDIzMTgzODA1IgyJidkLYn%2BhIBIbU1cq3AOf8WV%2ByI%2BsWQg4hxI7VOrZA37AIC2IAAYNA4BGrH4kp9kntdhnZILEKFjyu0EBbk%2F97HnX6EgiWLxy3sZu%2FNfnwIdwVW7OE2%2BiozFDzZ0Jqwe02OkTd1ZnQZlGeZhgNhC85BuPWDn%2FhOIvx3TnlLnyTw23i2EW%2BFJ%2FpSaBeEr6gAIGXhKkr%2BE53rDbm1GqL5ITosfcLx%2F7SbQYKD1jwWnperxrhquIktv8YxMy7U8aa%2FY9sOM%2FYVh%2BzPsQalnVKhLBHuVteunpieApPHYvsyHr6m94srDrbn9kpqWU26xbtIG8i8gNVAUEfSdV%2FOnrfUJ5Gu4kJ2oThxhqA16icTh0hPEsJ%2FMkQ3ahS19r%2BMa4sbbZ2X%2FZwpe4hjpwISxtbw3SHcUBvovEdcB%2FQ%2FzFI%2BoWzkoFrweOFowhowLDPvHn6RYdhwQYV8UTy7wuuJiQYjJh61Aj9xJ%2FFOm6zUSiRn13LYkHJ%2BAJpT4jW1N6m7XYvmpArPe0nUF1Lwz0JSxwk95UCO4Y9QyQQepGbn58YoLwKpfl%2BT5KlS4T5B30%2BSrtjwnk9VYRM0JSAKQjmznGVznZpzW7S786%2BGcRsJGBVA9cZGfzgJCMDI0Tv%2BT8QfxylBT209%2FFlQaJ82iSZTDfyOPKBjqkAacNp5uGJn2IUDJLPG1LsFu4Zu4YIA%2BUwQN3mjwACv8d9jHuXgQLBxYJ3tBHM64TJ8kmP4SVEmp2r8KWPTzxwSiNzO8sXsrq2h3Z1KYckormtxmG0MkfTbewunHIZVlS%2BZvTbZGTGhssznF4d%2BNjQRYviKtVEOkIxheIh%2BO0WA5n6rakULBqPNcxHssln2bMgIPWLHHAnsm4knXZC4UpQSS2fJI0&X-Amz-Signature=53f1bdc70230c02570e62afc3d16bd65913c9a876d717f8edf8c08ca0f466bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYQMAPVF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCuSimwEy9zQV0YRyyqp14O%2FMcpinhEe%2Fgf%2BSoyVBuwwAIhANh0pngu8v%2BKvUgFFEFL3zQv81lQ8sTTQeO25RTGy1bxKv8DCBMQABoMNjM3NDIzMTgzODA1IgyJidkLYn%2BhIBIbU1cq3AOf8WV%2ByI%2BsWQg4hxI7VOrZA37AIC2IAAYNA4BGrH4kp9kntdhnZILEKFjyu0EBbk%2F97HnX6EgiWLxy3sZu%2FNfnwIdwVW7OE2%2BiozFDzZ0Jqwe02OkTd1ZnQZlGeZhgNhC85BuPWDn%2FhOIvx3TnlLnyTw23i2EW%2BFJ%2FpSaBeEr6gAIGXhKkr%2BE53rDbm1GqL5ITosfcLx%2F7SbQYKD1jwWnperxrhquIktv8YxMy7U8aa%2FY9sOM%2FYVh%2BzPsQalnVKhLBHuVteunpieApPHYvsyHr6m94srDrbn9kpqWU26xbtIG8i8gNVAUEfSdV%2FOnrfUJ5Gu4kJ2oThxhqA16icTh0hPEsJ%2FMkQ3ahS19r%2BMa4sbbZ2X%2FZwpe4hjpwISxtbw3SHcUBvovEdcB%2FQ%2FzFI%2BoWzkoFrweOFowhowLDPvHn6RYdhwQYV8UTy7wuuJiQYjJh61Aj9xJ%2FFOm6zUSiRn13LYkHJ%2BAJpT4jW1N6m7XYvmpArPe0nUF1Lwz0JSxwk95UCO4Y9QyQQepGbn58YoLwKpfl%2BT5KlS4T5B30%2BSrtjwnk9VYRM0JSAKQjmznGVznZpzW7S786%2BGcRsJGBVA9cZGfzgJCMDI0Tv%2BT8QfxylBT209%2FFlQaJ82iSZTDfyOPKBjqkAacNp5uGJn2IUDJLPG1LsFu4Zu4YIA%2BUwQN3mjwACv8d9jHuXgQLBxYJ3tBHM64TJ8kmP4SVEmp2r8KWPTzxwSiNzO8sXsrq2h3Z1KYckormtxmG0MkfTbewunHIZVlS%2BZvTbZGTGhssznF4d%2BNjQRYviKtVEOkIxheIh%2BO0WA5n6rakULBqPNcxHssln2bMgIPWLHHAnsm4knXZC4UpQSS2fJI0&X-Amz-Signature=53f1bdc70230c02570e62afc3d16bd65913c9a876d717f8edf8c08ca0f466bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XB3P3E6%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIA3OpXtyKzkFqFe%2Be6sl08jrzwfvgWcpmLTY%2BHvsrtTSAiAx9HCk0ehLFP28AcZD2jHY%2FODY5yfDFkMuoNR1Bf2nKyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIM%2BWOD9aMiW1V%2FBcEWKtwD%2FMUQzRQ%2BhXSc%2BiQjVU7Zj11zL%2FRP%2ForP57Uo5b6kQnt1oqz%2FwWmjmyHeOg8BwGD%2BTGjZhWIAGQuNetptS7VpiN1Zy3iv%2BQAaWKZXcWsU7pW2smyLGQBo%2BHcl38tgv3NsYeL%2BlcdznZ%2BKBMhi6rKizGGs7EMUeqplc%2Fw3Hh6toMrCzwpORKxQdxcgjX4ew8FmDrmGat2%2BMj3l41OeZhzRSCWiNhgDKsxNQMEvo9L%2B1WuE2I2Cr1gVtM7CIidGxY5nsE6pvtzgbKZwtnxanwQSXvVUZQhLuc2afVwrjPvu4FYLCBnpAud9gysOm3fIyZNV2ChS6R03Kdmj8m89zBlmzyg9XmplkB0WqDNOjlZDG0OwvfsB0OeOxQAq3jvQkVboYBbao0Jt7IQ%2BrHbNN8DD0TPqxvK9OYgQDt%2B3940GTNJ%2Fj8raVwyHLvN1hL%2F5ccxTtT22Ed341torYW%2BMlEmgywBLh2wNU6%2BMI1d%2BUlYUQFxu4DD%2FCW4HhTUM0PDloAC9vg21ArsWvLV6Vwc5IHXB3eusFsgjPr%2Fq9SW9WCAMWcrvLo2%2F0qd2AHH4OeMjllTXxwVPoD%2FgH4lKqpQ5gvghnAWmFq7hIxv3koLEDXDDNKd2ZLoB%2FadDvE3n%2BdEwscnjygY6pgHcmqZg7lO71Y2s6lQ8AXO1Q7CwOCLErG1tcDij7CmnLOfkxjYR77KwdGsHGpEaR4ML3UysevLTVzpCuykVx9RxEM10U8TYulIVKBUiyM3hbpudDhJo9f%2BbJiMIrT%2FNGmd9Cy0w56nfTjPUhOC1QzuuWUkMmO%2BKfAMKbeqKJeyMWKFT91imZBDCYFDjfgQlgCj8blfihiRqqf0AoHZc2PTKnSQuv%2Bb2&X-Amz-Signature=54645c734db30cea9470877cb2913f3e9d0ed1daf059814e805891251788f7c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEJNIFQ2%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIEcuY1H%2BYWFI041MvcglA3cpv8jas0Ya005BXf2kFV5jAiAcicTuIYLMMwr%2FaYxthlKtgZytb5%2F3TmVo1LHhj36pmyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMlFYDDIzU6pcj1z8%2BKtwDyvaBKlAYmBKeafYZzlJOmlI%2B0Yezvrq7H6UviY%2FT%2FlaLxfb76s5N4l%2B%2BMrWkHOzyw1xA32Q1q6wuPrsd5AqfI2UTCR3vHfTiJaFQ9LzNlHHyGfFidjk8Il87YTc3sx6goZDpIzh0ynXI3V%2BL%2BlKPfA4gNloSwoa5Ac7ejSvgfZlTlFrpUW1fze1CF0EkNN1jib%2B3j2OOPbY5MYq0Pew0rz8i%2BwTFSryBU%2Bhh9iKS3KoO959oyBL1MJNbK%2Byif1gAf587JEVSUsHfo7D7bGpz7Xljn9ECIwvTJ62QlbQPOz9LEe045DgxsNRy3F%2Fv1pCDy%2Fuv1VCk8tosq74Sr7jQGlcOBWz%2FqwkRxuBlW%2BR0Jsn%2FFhu69FViW1YABWwduz%2FITwFo1os7VKiYKKbS7gyAWKz355Z9WEklIaQ7i4ySGOE7NDQBnCDmVgiGllHHdXDvqzqDNKCUB6q%2Bq7NoNsnHi6fP9lm0J3OsM15aOaaqp1VNhqFZzOcHUY05xUkCpn9xSNATwNqw75HfNi30kHLEbFL57KiPzNezwh%2FIfEbO1ZIvYuML2VsGEeE2WoEwG%2FXM1RDZ3JBZY92C%2Bo1D4eGkM7tL8UrhNJK%2FbDzbY9TUkUsqVxtagUX11%2BNsDeAw0MTjygY6pgFbH0Znr%2FLw04%2BNZwTwaAf4ceM2STO3U7RGxVFLMc26tnIvHNWtXVFFi2IlsVWGbF0jAueNJs3mosKIZxi6KHzWFtJsR7HjrJlJFfD9iRV8HZCuBCKx89wIJfuTihmHCTk2MFdCBb7KFFeky5wi9SRHwNbUmGa076Huc4tjyzKqYpQMU5k7R%2BIyNtyoZFRvPDR2k%2BAGg2RHCilYV9Rd29Ete%2F8CIyws&X-Amz-Signature=29ea1f098b4e292fb8268ecce966d837cc191ce0ec188042b99c5f8446fe91e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEJNIFQ2%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIEcuY1H%2BYWFI041MvcglA3cpv8jas0Ya005BXf2kFV5jAiAcicTuIYLMMwr%2FaYxthlKtgZytb5%2F3TmVo1LHhj36pmyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMlFYDDIzU6pcj1z8%2BKtwDyvaBKlAYmBKeafYZzlJOmlI%2B0Yezvrq7H6UviY%2FT%2FlaLxfb76s5N4l%2B%2BMrWkHOzyw1xA32Q1q6wuPrsd5AqfI2UTCR3vHfTiJaFQ9LzNlHHyGfFidjk8Il87YTc3sx6goZDpIzh0ynXI3V%2BL%2BlKPfA4gNloSwoa5Ac7ejSvgfZlTlFrpUW1fze1CF0EkNN1jib%2B3j2OOPbY5MYq0Pew0rz8i%2BwTFSryBU%2Bhh9iKS3KoO959oyBL1MJNbK%2Byif1gAf587JEVSUsHfo7D7bGpz7Xljn9ECIwvTJ62QlbQPOz9LEe045DgxsNRy3F%2Fv1pCDy%2Fuv1VCk8tosq74Sr7jQGlcOBWz%2FqwkRxuBlW%2BR0Jsn%2FFhu69FViW1YABWwduz%2FITwFo1os7VKiYKKbS7gyAWKz355Z9WEklIaQ7i4ySGOE7NDQBnCDmVgiGllHHdXDvqzqDNKCUB6q%2Bq7NoNsnHi6fP9lm0J3OsM15aOaaqp1VNhqFZzOcHUY05xUkCpn9xSNATwNqw75HfNi30kHLEbFL57KiPzNezwh%2FIfEbO1ZIvYuML2VsGEeE2WoEwG%2FXM1RDZ3JBZY92C%2Bo1D4eGkM7tL8UrhNJK%2FbDzbY9TUkUsqVxtagUX11%2BNsDeAw0MTjygY6pgFbH0Znr%2FLw04%2BNZwTwaAf4ceM2STO3U7RGxVFLMc26tnIvHNWtXVFFi2IlsVWGbF0jAueNJs3mosKIZxi6KHzWFtJsR7HjrJlJFfD9iRV8HZCuBCKx89wIJfuTihmHCTk2MFdCBb7KFFeky5wi9SRHwNbUmGa076Huc4tjyzKqYpQMU5k7R%2BIyNtyoZFRvPDR2k%2BAGg2RHCilYV9Rd29Ete%2F8CIyws&X-Amz-Signature=5b3b41234cc36513d52926200b06f7d81f90c611318182a5ceddf838d8ad6e12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJZEUSXG%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIGK9C3dcy2VnbNOIWsdBPhspM211xSS1McXD54Rc%2FNe6AiAmvxkvPyv5QTfdilrlDKJIBxXBYKNZSTLbnkCy10nG0ir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMH3GT%2BZufTLfxnsMnKtwD2cqZVQ0ZxrU1qrso94%2By3KLBe%2FGwx1C0EkCrfsRNHnd0qaGas98b6g9RV5biDi%2FuJ7zTVtU%2F%2Fk%2BlNu%2BotpsXpsiXE4R8sF06CpRy8cdIkM3YpSdrSRCX8XUAjDD84UpgDGinzftkc0KFUcIT%2Fa5HNR4MmouYBIv%2BRpbavl1w%2FqJMiq3N1gPEps7pNtPf51Qfk0f54q0%2F06W6UMfqxK%2BLV4Ebr8aMt6fxqoEPfqWbQceqcnCwv8r8pJPJ1%2FcR3cL7EEnwAwxRXLa10hVs6DEZkhX8CLE1HqYqLnX%2BuF6RqPHjW2JQUyDKuRExv5LDtHKc4KMeowxBY8Y6xaOsZY%2FU6jaHLiRFH2gQgQCNckC5ag07qyAr%2F5OaE%2FgNVvO0UlgHLUNJAFSlNz6KSRi32URq4s5gr9m%2FWVa4EPcthkKtj06tNFYoZkltG6elTacAyLphv7J7QNfg0wXNsQyGteT2djGiDpupigP1ZxXcUZPIG2CR05o0HZpYPrNZHKutd%2FvaTWZ1kXRAKQ4mFGT57%2FdhdZNrIqpyjcVmz4W0xC%2FF%2BJkLPBRXqetKVCriiHRqM2NOKC75%2BlzDSCFMxMMRZI6fTuRI0KLJK1crzXKoCKpbaGSV%2B%2F7%2FkAwscc%2FN05IwnsTjygY6pgE4KEjlxI3UhRJRAkwICcvh3W7bQI5uSeNhmNm0h7W6TJcxRLEnwaA6A8tp1Ts4Yu8HY5cmjAMvCV%2Fjk1rCFnzDD9nk%2FwwpuXtdhmOGD7oglKKqZv57JeP%2B6S%2BU2ihllykRLa7X3rTwW4JrpAmGyGvmA7YSBA3pOaOSswoSWkgjoX3%2B81eJKFmwDk%2FKvQvy0Vz0HXppRxVaihjEBuUCLMtj2WVn8Tjn&X-Amz-Signature=23c3f5a1e29c6f6240197b90a2e58b24a8a7709db83b20f12f2efc105aab52b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQNKTE5B%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCdoiGCYglZ41e2AbKxk0WUXJCJuVY8daICDaBnWHw%2F4wIhAIXAh1zmAn6W%2BzE91ho3hg%2BEEBOTZ9W5XNHR78rDg6qjKv8DCBMQABoMNjM3NDIzMTgzODA1Igy%2B1HyxqGLJLo4ZqF0q3AMaVLtvc7B4rr6CPzKf7jd7sdkz3JzcCD2CmEJREG6jdIgVAE33RPMVB9euzQdJrl8PGFCNJo7EyKC3HA4vKeVXWN37g4yl9S4bZD%2Fr%2B%2BhhZ3os8252A5sxYgdsR3fdntgjCO3p8enfhKyHIURSId3WeUMG7ioHhBOKk8G8NQRG5FifGGkG6n9rierBx3pyUOuweap3ko3kvZx7SryPArrTm9fxqjoxhH%2FJ50zd4vUcIQbzO%2FISYACN3YnEU3AJMBt4wjPvWezgMVp2m%2F51rWjRVA%2FBaCqS9K5CXPVt9ps%2F5WlXdmbYg4EmkPwmdxCmFHywtz%2B0HnE7cCYmPBJO64rRO4WqzPTqWI%2B0cCoMGJCk3FNGrwj1NY4705xpwxLp93BqTccpYLYxFS3wn6D%2F1k8mW0BfXqWREAjVvcH5YODGXlUD%2Bx%2Bb1YdZHOgtxLBuuTh4kPEu9ytzF%2FBkoAYmZxBqsChT1rDuHC%2FRI4EDdc7OjSWVfOXGFrRccuqpozyyT9LDjdabwNgVsrhpC0mo0smEDFoW%2BwPOTDNmDupzb9AiqhfIAMYJBSQJ7BN0wcrDzdFa1cBLG7l%2BR8g8VmVgTiIX%2BcFgdX%2F2SMWonogTGfl%2BsTpiMREICmEL2Lkw6TC5zuPKBjqkAWjtEHP%2Fojg%2Fl1dpMOpiyMLQdGI35zK4BaklrLvxOA93QjpA5F3QYGVQr59ZhfKgQ0NHeRbiLd0XSHvpr7X4zqRtDfr6LchS9wZhWZ7Ye3Eer9vzI2mZcrNmXt8xdNhOHzerkvEDvPFwtcuM5NkShMf6VtozUI7LVZr713NuYlZ%2FApjwRr0tI5%2Flc5EswPKlAeN15Ug0glHwwQlIEXZngSIbDosM&X-Amz-Signature=87c6ea4390a321f2ed8f8c9560ce81c6b789c749e20e9eb5f7e9e9c457095df8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5Z6LDPO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIFzmELhfKgi4F4v%2BI24rlQtc5ALuGZC9AA94gWequa3hAiAiwUlF6Ir3ADvhn0iO3RSgA2ogGPwPki3wbslD%2FMmE6Cr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMODlHiJpPMgx40olKKtwDf9wSpQHc4%2BdtNSzcADXZaF2coh3yY0kFb7RcLnPPfegXEaeKUIf4t9w6wp2oqz76g9M9B0zpl%2Fq6Lok2jY%2FRqeSHVorTdYa2QwQxqJu4bAyRgMsVTojH9bzY6OkmljGf2d4RYj1oKieCYoBN5911kT8g4v1c3V3weT2wCI%2B9ggdb2LlUKu0o4j7PdTno8SpXBVZWNdmbqTy49Exqy4ExwVdpq03RnHXZBnIk0gBeUkrJVavlW2E4CV6tmZHKKK%2B8CleMD9oWrlWtCsB1LRCHI7ZcBzF1vKcBKdk3XpJykjCwl9xlKAm9rMUqi20yLM4uFYfb8YCpE%2FwHwKk1BLYLQ8wT%2B35CHhbtARDhoPdEqrS820UPza1ZLdXJ80RxBMFCJQWxw83%2Ft9zKD8t7%2B%2F6RSZ0p%2FRgLMrbjHKU7pBy7JiyTH2z8GxesE8q7RIpD0fif7b4OdO4R7P%2BLuOZGlL4EHuA9WArePb%2B%2F33P2o7krkVzovvszKeX7UHB5LUFxhU1DHqZ1%2FYCxwwUNdcsKjGMs9Nk40HD6a%2BHG6Rh9WksCqeCOidjTeat%2FMqlHftcP5EKDx0RhB37hhFMZVnqD8h2EpBbK3M9dNFp3usw8jrlt3GP2uuTug6lTTFdYoEkwkczjygY6pgGP%2B%2F539yBjdc%2B%2FlQu2QEiwX6KeFZkVjO7Wa7WoT96zVkHpYu68i%2FuIAynVpQzC9IV%2FPReN99SHtZwDwgX7oadGe3BiHRJ6HtnoqKvSf9Pbd%2FdygR6DKIyj3FmpQ5wlyCm1PmixLOvMaFROnKBZXHdAdcbhZo3KbmPu%2F%2B4KIj%2BOIhs%2F4mBhpKaMBuEqgUrHCL6%2BDpsyXIMB1Y2v4EGZZMfhHYALfXPB&X-Amz-Signature=d123487cc7789edf3bb2d14f3fe3303e53bfea442b588cadce89c7a93d287121&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5VFK5UF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIBO1v6%2BzuYb%2BN3GwCpa8xEOOrtMsTVSkdiNbOwddJ7ScAiEA%2Fxs%2F1nplojtNJ0HoozsqBGCKncoswqHONiw%2F0k3F%2Fi8q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDDvaUojeE5CQYVLo0CrcA76Gp%2BzQPw9INivy%2ByomgROAZLpfEMutl90WYDRUF0a107vEDyGa1YGNPLthZAdF84ip7q1FPX8BXiakxrKWxlV%2BQK4CE06tPIiHXTVLzUB0nL2pXlb6Hon9Id7EUMouJaPEBQZ7jAN4aE7HQunk5KA0hGUQ9IET4AYrIvnEMe8xDUDIeRC5EpSMmStyQVyKM%2F2AyvDwF7isDm7CKxHvNEDN6vBeMTbyQx7bxZEHJf%2BXpjpGsmjqE3Rzb0oqqJlQTApVLn3n%2B09yHi2GiiyxfEUJ2HxKfzagbrEUkTC3On69h9zjWEhFUYHNap0BRrPHtHZnMM4KfTCE%2B1fSYk8Ht%2Bqk34rrQexommy8VJBucJYEiMJU%2FmTVMllEvJxaXOSz5Tfv1taQJjAefFSxaBorqUBxj56tryTfG%2B%2FxpBF1wk3Lel44PhAKaFByW3g8waYA7QSzWH7uarnsANtHfQlI0JNSf%2FWqOJpLsxi2NRutNxwiRPililc%2BC%2F50spzUhqQmMhrFr5ez0DQZeqLvjkQahopEnDss1dPHVeGjF%2B7qOvszxfh0SNH4B6d7d8f0PZtHf5%2BZf7mZhaoFbPjiR3Q75z4qAkHDrl6mEdTUJ6iUq2%2F6WS4KSWLwTKZsKp%2FpMIvN48oGOqUBhbmc%2FmiNojelF%2BJBtmakGOotvb0GZvH0eP7x3XjnHNAQ1Asvhl1%2F%2BP%2F1TqC1R8IuVgoWSaM0SNtb99XVBTYbtPMlQA4xJRBOhzV2djMxpTF9SyQtsCFfQXTbX6awZ549jpBIOBmMR4ebJ%2FbnH1FOR0Pk8ElPrTV2prIcq7t%2BfLvjMjNBFMDek%2FqrXu5nmJXOWrtK9b%2FNIZfH%2FfukOBGA%2FIy65Ppz&X-Amz-Signature=d0c7f88afda1da351d1d91d7416e32825ec550a215076c24d4549dcec2918a92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5VFK5UF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIBO1v6%2BzuYb%2BN3GwCpa8xEOOrtMsTVSkdiNbOwddJ7ScAiEA%2Fxs%2F1nplojtNJ0HoozsqBGCKncoswqHONiw%2F0k3F%2Fi8q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDDvaUojeE5CQYVLo0CrcA76Gp%2BzQPw9INivy%2ByomgROAZLpfEMutl90WYDRUF0a107vEDyGa1YGNPLthZAdF84ip7q1FPX8BXiakxrKWxlV%2BQK4CE06tPIiHXTVLzUB0nL2pXlb6Hon9Id7EUMouJaPEBQZ7jAN4aE7HQunk5KA0hGUQ9IET4AYrIvnEMe8xDUDIeRC5EpSMmStyQVyKM%2F2AyvDwF7isDm7CKxHvNEDN6vBeMTbyQx7bxZEHJf%2BXpjpGsmjqE3Rzb0oqqJlQTApVLn3n%2B09yHi2GiiyxfEUJ2HxKfzagbrEUkTC3On69h9zjWEhFUYHNap0BRrPHtHZnMM4KfTCE%2B1fSYk8Ht%2Bqk34rrQexommy8VJBucJYEiMJU%2FmTVMllEvJxaXOSz5Tfv1taQJjAefFSxaBorqUBxj56tryTfG%2B%2FxpBF1wk3Lel44PhAKaFByW3g8waYA7QSzWH7uarnsANtHfQlI0JNSf%2FWqOJpLsxi2NRutNxwiRPililc%2BC%2F50spzUhqQmMhrFr5ez0DQZeqLvjkQahopEnDss1dPHVeGjF%2B7qOvszxfh0SNH4B6d7d8f0PZtHf5%2BZf7mZhaoFbPjiR3Q75z4qAkHDrl6mEdTUJ6iUq2%2F6WS4KSWLwTKZsKp%2FpMIvN48oGOqUBhbmc%2FmiNojelF%2BJBtmakGOotvb0GZvH0eP7x3XjnHNAQ1Asvhl1%2F%2BP%2F1TqC1R8IuVgoWSaM0SNtb99XVBTYbtPMlQA4xJRBOhzV2djMxpTF9SyQtsCFfQXTbX6awZ549jpBIOBmMR4ebJ%2FbnH1FOR0Pk8ElPrTV2prIcq7t%2BfLvjMjNBFMDek%2FqrXu5nmJXOWrtK9b%2FNIZfH%2FfukOBGA%2FIy65Ppz&X-Amz-Signature=23e29eaae146b50089d1d934ab09a7c58c42a9197db84d7508e5548cc1c66b41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSWTFS64%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDcSXVs7gWte5NztUyb6UC3Q6xU4q6XNoM3%2BY09hlbZ7QIhAPbSX4L7zG4iujudc38svgcVlnGDwVW6jbxwKKidcTSQKv8DCBMQABoMNjM3NDIzMTgzODA1IgyKxqLy%2Br5d9bTGkbwq3APeiuExQF2uT0zrl83lwsBLxL%2Fz4qg6B2eCDyGb2aKMbBIfFEZwxwEZEmca%2BgSZIGS1I%2BHqpsMXVZeTsdFrKy90MsDjZSuTDh9aKv8dR8i5mbkerqEpqUEeW6U4JlNAtnNWdBOd4UC%2B7xttqzQXRSc6LmgzI6KU9%2F7jlycfyJsZQHgFD3lUqGhao8ZJnR8VXKOOHr6nxrGkG5gRJqbg%2Fm6SPHbn7UEt07Pu6Qa2juqyqoLyRlrRlIih3%2B4xPIzuKkkKrjvmWE1uegJwsjymk%2BP4Yv%2BgKoNUUnEgQe%2Bw9eK8Va3oGDb5RiicC3p2JFdWKzznG%2FkcnlyBhWiNIdcvAkJO5kmJl8jotQvlOcYxoAju%2FtA6tr5LZDi6dWFZOmUWr8p2D2zLoJkhCgwSXbO80HITOKNOocBOIMqQkLzen1oOhm%2BFZqXlPR4UTyz1g55oBNrDpyBkif5RFiAbAK%2FkE03vw%2BFbJeOm7QERFY1FtSSvPFHGT%2BXJjAvPeDrv%2B6FzVd3WOWJdDe6c%2FT4c5oA7hzhLshIWnQuIVRhziEQSTTl0ER6dGikNDpnqdptbh8wttqyBqxau1KUy93Ws49Epj8J8%2FLjcAeSqJ6fnk1WzaRBapOCF8NYSv%2FW%2BQIVLjjDXw%2BPKBjqkAe4HHkO%2B5XTjoTecArPSgmWKfmycXitgEcE5oDxTpt9RTFdCnBmkVsrRnrLeHLc1%2FqQWWqM3Ffwoft9AWPbiao24a9Ra4PO3gLYhC9bCYhvBFHFHU1TkPWyPGwV2Rg65je6OfJmxn0g5KN4NN8nRjOHpEI06N1JQUpcF9d2v2GZqFAEvAB80klzv%2FFxldu8XK%2BbJ4M0NYoF47GaiJS9Xu5EBrMgw&X-Amz-Signature=6ffc6cc3293745e2c2e5c7db537a4a04d96fd6fa60ab0737d047a3ffd59eca82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4YZA5DO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIAjz%2FAkN6PcWdGEbf0P5nRAoy5DVK8z08oNB%2FYzYQJ27AiEAiY8eA956DDaEFFBVPbTF8dwX20Z%2FnGOP05UJPUglHbgq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDJ0UYUv94y5H62lMFCrcA%2FHrs3C8N5SWqRIXzvXwknIh05QnLo8rb9e54ipZhvlyNVzEcGvvlCPCBY4FzgErKKxDtSANKOmGWVwKsT%2FyKPS%2BGUBqeplWu%2FdOs%2Bew2R6aoKQMWMd47aSU9QWITvsnpKZtRRuTgVk2k8kGBcQ9n%2FgDmREK%2B%2BXlAHNCNeqI%2Bcj9PY5nJYfVe7Ynkrqgd8x%2FX0NtlNLuExsdissdrSlJnOiMV6hd2vCASfejXf5qw7IttpMJ7ofhJlNOM5BGjrjXPrub%2FHehE2Szbb9SbsOqwL7YRCiNBo39uMDUQcETqpFqzlFWroNgriadrohxTvS1fZpU4Y6i0OC9X5Yfnfj29J3mAfuYlg1HXVBlwyreZ2POLrhrMAm9pp4TOHTFqOlW82BA5ugjS%2F3pl2VQgt%2BmmXFZvd3TVUkLol5qIhP2FIF1fLKpFGBCMHB1ozUA605PyiqKX2OSfAtEAiPezGIJIY4D3snWvwSXbJsPvtFgr3UyH14we0UqtuJp7fWus2OUQFnlORqZ4kex9hVAjID77FQX0WFIHd7fif3e0ng08VgP5c1wbwAtY2yKbhI2eF0Myf4aj%2BU6P9Ug4REJ%2FzXwQBRT22%2BJA0fVHx1ghv%2FxdP4pp9nsq9Rn1LT1cfJKMLvJ48oGOqUBDv%2BiEoonumwqyq5EOuBoZA6Bacnm0pMhoSTa%2BCz35JxF9I%2BQMkYS13kU0ChiDGJfhW6nqzJpah6n1eix7xJBT8HvSC4vvXmMGL%2BYxcFVPsdPjn4iIwNMZNtUMmGlMrlAnl61p5%2BX7Qz9Ed6GKHT3YJypd6u9zzSCWYjEQwUSyEGusuwTcvkXYuUjwTimqVFmoUlj6e7FTm9SDtCh44AJdD1Sxyl%2F&X-Amz-Signature=c136e3f9a4c6f68d85d6a2d6080dd879926e74606d34789261b71e9f1165d59e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4YZA5DO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIAjz%2FAkN6PcWdGEbf0P5nRAoy5DVK8z08oNB%2FYzYQJ27AiEAiY8eA956DDaEFFBVPbTF8dwX20Z%2FnGOP05UJPUglHbgq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDJ0UYUv94y5H62lMFCrcA%2FHrs3C8N5SWqRIXzvXwknIh05QnLo8rb9e54ipZhvlyNVzEcGvvlCPCBY4FzgErKKxDtSANKOmGWVwKsT%2FyKPS%2BGUBqeplWu%2FdOs%2Bew2R6aoKQMWMd47aSU9QWITvsnpKZtRRuTgVk2k8kGBcQ9n%2FgDmREK%2B%2BXlAHNCNeqI%2Bcj9PY5nJYfVe7Ynkrqgd8x%2FX0NtlNLuExsdissdrSlJnOiMV6hd2vCASfejXf5qw7IttpMJ7ofhJlNOM5BGjrjXPrub%2FHehE2Szbb9SbsOqwL7YRCiNBo39uMDUQcETqpFqzlFWroNgriadrohxTvS1fZpU4Y6i0OC9X5Yfnfj29J3mAfuYlg1HXVBlwyreZ2POLrhrMAm9pp4TOHTFqOlW82BA5ugjS%2F3pl2VQgt%2BmmXFZvd3TVUkLol5qIhP2FIF1fLKpFGBCMHB1ozUA605PyiqKX2OSfAtEAiPezGIJIY4D3snWvwSXbJsPvtFgr3UyH14we0UqtuJp7fWus2OUQFnlORqZ4kex9hVAjID77FQX0WFIHd7fif3e0ng08VgP5c1wbwAtY2yKbhI2eF0Myf4aj%2BU6P9Ug4REJ%2FzXwQBRT22%2BJA0fVHx1ghv%2FxdP4pp9nsq9Rn1LT1cfJKMLvJ48oGOqUBDv%2BiEoonumwqyq5EOuBoZA6Bacnm0pMhoSTa%2BCz35JxF9I%2BQMkYS13kU0ChiDGJfhW6nqzJpah6n1eix7xJBT8HvSC4vvXmMGL%2BYxcFVPsdPjn4iIwNMZNtUMmGlMrlAnl61p5%2BX7Qz9Ed6GKHT3YJypd6u9zzSCWYjEQwUSyEGusuwTcvkXYuUjwTimqVFmoUlj6e7FTm9SDtCh44AJdD1Sxyl%2F&X-Amz-Signature=c136e3f9a4c6f68d85d6a2d6080dd879926e74606d34789261b71e9f1165d59e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662IREKZF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T132130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIAfmInU0LIuWLzOgx8oygR4WSw6%2BeYMvurNwDo2tiTGHAiEAkAVxnH4D0Wy0dKXNf6KG5cCrujpwrdWB6F%2BhPhmD2Ksq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDLYhiM3WUV0IKoTaHircA9Sx63CBE15aNohWtRJs2J3QjPQXkGZzPg37yMaCldEXGKQjZfPTeWV0MR2wOkrwtM9u9%2Bywr9vdjARqqktC3JUUq%2BFnePsbpA5vr3%2FYIQeDcBVycJadicReRmbpbv%2F%2BUAWDDKzLnI1kV4cTRnlpzqDDP7RUHlhSScqSyAS8Wc969owO1BYXXjdJXzgMLY6Bi6wPx53zND6TQlyWLOmalauj4bvPuI4M8dvawQ0DDSnUp1tIDLyELSSjGTwPqNTgC8pkSbXNmEMvPEO5%2BMKbhcqwlhXX%2FbCqZG2EiQrtX%2BpnpqF8h4IKq0g%2BQZ3G6RQNWRyokTbMJJ0iICz%2FSq5Cq0QYO1Q7i4elXtGNKFopg9gOu6wVjjAQia6dlJ4p5%2BxidwB%2FZlPW4WppzSAaz07AHlv80A42YGMApsmIwngXr%2B3P5yJzRwi5XKrjZ9nsHlqgjadBXEz%2Bz6xXiXet9frte1QerxhA9gBIY%2F7yXmX5osMFdCmxW%2Bey0YH6Um5xf9SXGLUzjXnzpT0IfO3WbHM9aPfDixyJR3xjAsykrAZQpoIGDEarOI5LsEmttgtkssoPHeTskQhW9B%2BGO3oUo827QjnXyBkeZCsQGP4IK39YVurfnEUEU9AmmVUQ0yeXMP7H48oGOqUBi3vRrPrO6lLobRpW1cWvTpX%2Bw5BVpJNquSWOWshKYO1v%2FHLI02GfmZbAmk0%2BKGK0Hqoda78lm4amoix0U97X3zRUkTZI3L9v7u4JBkJqpR%2FZAP6oOhk916vVYW19NXZh4BOhVserTs%2FVAQLENWMecENRA6K7t2R%2BeBPt1%2FOXh3Zbcitst8Ifv82TMfOFc0t%2FmmEv4sUBpnHBDaSoOso%2Fy7HRvRTs&X-Amz-Signature=746f56582b623abd252dbac285a5034f0c85df3193b573a8a7cd3f4addc21964&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

