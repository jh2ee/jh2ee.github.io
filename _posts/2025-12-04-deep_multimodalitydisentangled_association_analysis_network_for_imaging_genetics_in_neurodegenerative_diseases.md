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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6DSZKC4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIG4DfQGzbDo73jzSnYr4V2r0tJVvurKbmk8PEwMnTomJAiAW8rAvdJpEVhH8gPXWH4rtRaNiqln4xYNSJ230DxCDIir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMvK%2BOkzgygEDRmAPzKtwDWODKcTCFOffratvIhlq7xi3em24XW04AcqCp%2Fudy1ifq8sQ%2BHE8jDQHOUJrmrOce%2B96dhZEb10zF2B8XbycX1IGxxT3HozmMZ9GRwoE3eR58SllWvhsRW4RmWgx9f1gLyklyw50gdcaGJSIgEEoA4mHC%2FkLxUD%2FprE3jNs6vHU6zX0jS3OA%2B6pXXjfZbseLhdhtL7B9%2FdFw6hqg2d0xgOn%2FumJdtpgd7AJ7V1W5ZBmFxjtfcSAva0BAj5CnmJeGgR4yJQ2Yd0svrxXw76IBs5rp4oMFTfUtjxcZBnOGSF%2FLU4nokoL%2BUte2dbG5xPqsjx3iENYPLxKEzEbeXmGcoi0dG9%2FPe%2F9T%2FawDcmCzy9v01WvDAiP9QSQD1cdTNUiE83XP5DeGwoILTMyjZoLxhNFcAM0mA4ejzb5nHXxIx5V6wsQogUCsuqjxdYVjbjlM1nbt0GevqBV99JYpfrlGDsk8hsxGmpeAS7sLTT98zkRKL1Ib9%2BJ6G1%2FeNBqWZxi%2B3j2cSdE3H%2BTzUl0kdfPaj%2F5CRuFTom7kVU0%2BW7dU9THQi63FDQbfMS2KgeqBGCv%2FBuTXtTpalxWbnQgPpTwihQEavV1EbJWpAGLilguis6ZVytzj%2FW9rXeHWLwRswqPqGzQY6pgEX1t9tbdX6rW5CEsT%2FGbwbV5DNiOeyoSLpZIiwOoQB68qYNwcT6VJU62yWDjHJuIXyimzk63dWkrZAg7Mij7dzVnay0kVp9IvExxp%2FhxerKkzJysdCgcb2Ple0zoWJ2q1b3dr5q8FzIbXSXjHUCaBhTSaJAs7eC1sNyeEFSYRRdignzrDSD6UGDWZynf0oTM3ivKTBLzVESH8lbqpqyEilITtrysMI&X-Amz-Signature=08efe8d75134dfd885c90209c872ba0ec2fd0e16d1068c2095132f0f50fa8cbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6DSZKC4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIG4DfQGzbDo73jzSnYr4V2r0tJVvurKbmk8PEwMnTomJAiAW8rAvdJpEVhH8gPXWH4rtRaNiqln4xYNSJ230DxCDIir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMvK%2BOkzgygEDRmAPzKtwDWODKcTCFOffratvIhlq7xi3em24XW04AcqCp%2Fudy1ifq8sQ%2BHE8jDQHOUJrmrOce%2B96dhZEb10zF2B8XbycX1IGxxT3HozmMZ9GRwoE3eR58SllWvhsRW4RmWgx9f1gLyklyw50gdcaGJSIgEEoA4mHC%2FkLxUD%2FprE3jNs6vHU6zX0jS3OA%2B6pXXjfZbseLhdhtL7B9%2FdFw6hqg2d0xgOn%2FumJdtpgd7AJ7V1W5ZBmFxjtfcSAva0BAj5CnmJeGgR4yJQ2Yd0svrxXw76IBs5rp4oMFTfUtjxcZBnOGSF%2FLU4nokoL%2BUte2dbG5xPqsjx3iENYPLxKEzEbeXmGcoi0dG9%2FPe%2F9T%2FawDcmCzy9v01WvDAiP9QSQD1cdTNUiE83XP5DeGwoILTMyjZoLxhNFcAM0mA4ejzb5nHXxIx5V6wsQogUCsuqjxdYVjbjlM1nbt0GevqBV99JYpfrlGDsk8hsxGmpeAS7sLTT98zkRKL1Ib9%2BJ6G1%2FeNBqWZxi%2B3j2cSdE3H%2BTzUl0kdfPaj%2F5CRuFTom7kVU0%2BW7dU9THQi63FDQbfMS2KgeqBGCv%2FBuTXtTpalxWbnQgPpTwihQEavV1EbJWpAGLilguis6ZVytzj%2FW9rXeHWLwRswqPqGzQY6pgEX1t9tbdX6rW5CEsT%2FGbwbV5DNiOeyoSLpZIiwOoQB68qYNwcT6VJU62yWDjHJuIXyimzk63dWkrZAg7Mij7dzVnay0kVp9IvExxp%2FhxerKkzJysdCgcb2Ple0zoWJ2q1b3dr5q8FzIbXSXjHUCaBhTSaJAs7eC1sNyeEFSYRRdignzrDSD6UGDWZynf0oTM3ivKTBLzVESH8lbqpqyEilITtrysMI&X-Amz-Signature=08efe8d75134dfd885c90209c872ba0ec2fd0e16d1068c2095132f0f50fa8cbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTGJGZGT%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCvhfkIx1kdpNLE%2BdCWjzZEV5aIYCjjWGaQg7BeVO%2BWAQIgOWiqyieB4HcqSMHTSttBJTNvAqEQW1KEKdc0qqy4i4gq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDMkXukbfTVUv0vFnHSrcA18mp4nRQWz3FkIwHzymPGnCZ3MMCJkSsHaSNZ2T%2FXSLlTQysYnzdxy0IosKmSonFuY4yjMmJN4clpzklHg1dGNCXzUaxn7aZ0xNx3nsqJeIi7kNpGBsj11SUH1mAly0tpsFz7x0FDR%2FHOmxdz1fpYjArZKE4COOXIC%2FYTC3JRiMf8I2%2FzEIPOOqDdZwVhUZTff3GLi95ZDcY5W9wxKV3wA0XGRnMj01F4q3dM2306yKQCTL9Cm85ZqEq1lQcacYEpmH%2BmQDEvC6i2SWFwpOPmCuSpF6zIJn%2Bie0KQ%2BPt%2BieKL8zzwj%2B5hod%2Bi3TbdnRPwP%2FD825NacPFvoVj4ztsCth9G1eH8vRvY3k0jveeyxZYHwQho%2FquCMpD4g%2FaVYu%2FC5gtogBXQOwvCQPdDjRXoqhuSl0rbqyK3lu0U%2BqRkEzSLisqNHI0fy%2B0n0xBGJG7MNjjFu1YHapUC35crordJ%2F1lOiwyao54Ffc1PXiPrLApvgxXXfJj5TnAmTyJNJ%2BHYyHFcCA9jFzeHQGaafTSMaoJaU7suKX9eOhWMEoEXxIvJveHSWfuI%2BUD829xgiW49yy6ENcXdXWO7V5VejtvHyhm0j1FEzKL22UXQONUxYfUMqvtswxlY%2FtzK1eMI76hs0GOqUBI7R1QgNnmQmbo0K9OqOFn2tA725nConLJw7CEzisP1pfP0d6jNvF1R4D3LNSA82sT62Mq4GImtjLCOeHiwPkWdmU8R28mlO64mcEZhBSDYUM4TGAimgXTkvia7tcDFJQNqdr00VCbUeqUbWpjjosDoGiSOWtDpVgUzzD73Q27JZOehJJ2WwdydZUdF96DoPU8UqVeEk36IknHEFDv31GKvaUR7s%2F&X-Amz-Signature=578277a872c720cbe94e58563063690495e8be656f3584740bba530efd0d9dac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLW2UIAS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDPChMBQA39f5IQDuj%2BwqLwKqq7esrTKMxBV%2F%2F6vwmcqQIhAOHP467jb24qABhwHlRSt5Q2gLlwWeK1%2FQARmwYiG49OKv8DCEEQABoMNjM3NDIzMTgzODA1IgxFkn6c%2F7rc34au5iYq3AOfRKsq%2FWkX9AH6I8p4hd0UXB%2Fu9NtpMWaIPPEWHar9x%2BUdFHqvAxj115iPoxnOeMQemfUT9kap%2Ff20oZpf4Z6oRWQHhm%2FSmGVf%2F7YE48WbSQCZ%2FNkrnRLnRbitdfYYpdxPxjYircvNlw4%2FTLzqrvKQqR9uHQd%2B%2FKS3t3e9bhjkiWcJKEnX4CioyuosmxPlKLE2CvY5%2Bmdqb7QpIlcpLevhMEaRSRJ76Cu9NqAjKRtaahx6L6IwEQG5ikVwKwVGqIpVBl5QFoA8J7aXxY6tRTdUzOFPgaejgaQkR5%2FFPz2UCO5walI6wFgj4%2Fogb5AeskR%2FiB6IoVoYtkavD4Rugj1EDA7yNYtERDLSmZUGKoSfTdzrWkR%2BqCcf6v7ahYwCkn3cFeFJF7cOUlmdlUbSJk1im5iPO6EFyCVW16VAZWOK4kmV4YQgJK6RH%2FeKHM%2BRVTu%2Fh9ZNH%2FERI2l8cNm%2FIXqNYrltGjqWE47QtyCEGR1leJaCT%2Fs7lpUUaSKKjpFX2NVi2u1XY4appB3uoUeNcZjqHvFB%2BFU8kb%2Bei72CInMPXlsXJWuw5uo0XY%2BpmG%2FJlFfV5zT1AQFVtcz98vm8xJTXlLPWJces39rG3pCvwXjzKBdb43uYwUq05oRKnjDS%2BYbNBjqkAfVJDbjqhKBzUbmJJ%2FFgnREH4uS8saqeCOqFmEyyiP3AX%2BVSeRWlRopw3bntElRdYtdjLfv5qqGCvGYzBrzYgnoEYtW69KDuXJLb2qv23jccPuZZAzFTAF0mNqiKA%2B5CtU9mTcJzXupNYQyDxNQaYZ7GF8kTwAv0kb1p6OW6eUthgNSUYw9NwaNXlgbHDor6GN%2FBgoYI9XCwTOWcy%2Ft4LbSmn9jv&X-Amz-Signature=5cddc39fcc220f4dce69b23172cf9d39feac2e79ecbaa8069a1fb36d4d3ea913&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLW2UIAS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDPChMBQA39f5IQDuj%2BwqLwKqq7esrTKMxBV%2F%2F6vwmcqQIhAOHP467jb24qABhwHlRSt5Q2gLlwWeK1%2FQARmwYiG49OKv8DCEEQABoMNjM3NDIzMTgzODA1IgxFkn6c%2F7rc34au5iYq3AOfRKsq%2FWkX9AH6I8p4hd0UXB%2Fu9NtpMWaIPPEWHar9x%2BUdFHqvAxj115iPoxnOeMQemfUT9kap%2Ff20oZpf4Z6oRWQHhm%2FSmGVf%2F7YE48WbSQCZ%2FNkrnRLnRbitdfYYpdxPxjYircvNlw4%2FTLzqrvKQqR9uHQd%2B%2FKS3t3e9bhjkiWcJKEnX4CioyuosmxPlKLE2CvY5%2Bmdqb7QpIlcpLevhMEaRSRJ76Cu9NqAjKRtaahx6L6IwEQG5ikVwKwVGqIpVBl5QFoA8J7aXxY6tRTdUzOFPgaejgaQkR5%2FFPz2UCO5walI6wFgj4%2Fogb5AeskR%2FiB6IoVoYtkavD4Rugj1EDA7yNYtERDLSmZUGKoSfTdzrWkR%2BqCcf6v7ahYwCkn3cFeFJF7cOUlmdlUbSJk1im5iPO6EFyCVW16VAZWOK4kmV4YQgJK6RH%2FeKHM%2BRVTu%2Fh9ZNH%2FERI2l8cNm%2FIXqNYrltGjqWE47QtyCEGR1leJaCT%2Fs7lpUUaSKKjpFX2NVi2u1XY4appB3uoUeNcZjqHvFB%2BFU8kb%2Bei72CInMPXlsXJWuw5uo0XY%2BpmG%2FJlFfV5zT1AQFVtcz98vm8xJTXlLPWJces39rG3pCvwXjzKBdb43uYwUq05oRKnjDS%2BYbNBjqkAfVJDbjqhKBzUbmJJ%2FFgnREH4uS8saqeCOqFmEyyiP3AX%2BVSeRWlRopw3bntElRdYtdjLfv5qqGCvGYzBrzYgnoEYtW69KDuXJLb2qv23jccPuZZAzFTAF0mNqiKA%2B5CtU9mTcJzXupNYQyDxNQaYZ7GF8kTwAv0kb1p6OW6eUthgNSUYw9NwaNXlgbHDor6GN%2FBgoYI9XCwTOWcy%2Ft4LbSmn9jv&X-Amz-Signature=cfa608b0a3b6b33aa0796404855abf37e04931cfef129d05ee7e9cde6ad24afb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666O4IZCRJ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIC3Zz149DPbng72ClruMLUlrwUZOLjvYz8P6CSr3FHz8AiBu9yIFgRZPc76I9UzCVbswb4B6qsYGCqfa%2Fw5HG7Mt0ir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIM8rT2RVkoYvcDY8YjKtwDuLNI2hG0RmSNuRxviwLV9OqFSxhPtMRdYFLMkmvC7ozrXf3F4V%2BR0WCLGcVQalPbINhFAnsK7V89Ev9OQgF05Y%2Fon6kX07kX1nCGdK%2B214TeO5TaYEyRgvFz%2B7MWwLUZKu8c2JH1XbWTCVS94Hue1UeXc7ze6zOIk7xKxcj6hk5YL2ekhkDvk%2F%2BN7suCwRqYH0QLqKCheZcbxeKcg7A1c%2FtwYGVoaCt9CotgmOcNcFBrCaepXNvRO3bG9WdIA5h%2BMliWOqXuI%2FNG4Yd6HzPnJ6c3zg77Qrfb%2BZ7o9a30%2BuykBxyvaWu7DyEEKqS%2BEJyZFKMCPyDgFhT0sqndrLGHInSa5%2B8pAbkru%2FR3nTi49sA4tCGgIbPd46pc1o8oaA57kdScagvnVVfetR3yp1XETudCTFuKvsrYdPyN5ugVDudpfw6aC0ALn9caVZT5KM7prmKJyPwLqMJCKOAdewUensmewzYkuZK6CVSbDCMULALwrtr4DD1g1dqkDvRzMTBuSFBc5IY%2BQOPgfIjuY13iscC7KCLm6IoUejpD5J%2F6Xn%2B0CnDIsMaxI3iNgIH9SZ9kqW%2BBTO3i8FcQ116x3KAwer%2Bx7BRt3gLNIhPtTk4PsaACtMYk6RjgvVXovlgwhvqGzQY6pgExeA92Qehr4619zfZvfXDGi5f1EH5WZkQwWk37rALqdNfRhOntUCwXpBQtYrW7vMrhi4rgi5HZkyjWKd0ya6z%2FmRb%2F0EGfdd7P22%2BQKeIjnEgfaCbqK8r4jS%2B7xT%2Bh68X7H1aWMmM2JxJMLnhXrWafRQpog%2BGT4uQllSBALD0YqsyXHu7ZMIaz%2BWPTPw0KRki2xOv1PtaM8UnYrFNIPbN2sKroSOY7&X-Amz-Signature=2a7b4c635aa305fd7ff0e4a94d16db43fe4243939df43d98a1b82e4537893c23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UIVMGBG%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIG3ccovN43PqYeF%2B2zGFynwf4FG3YeJu4rNTxF8Vxr9dAiAFrjI0fssHOW%2FLbBESN0IlEI4e7AYILQEzqY%2BRlet9kir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMyz06NjeP6xY5LXzUKtwD2RmtuHfmJcPJGSrmmYvnvnbmk9%2B64t1lDs9MxM2qGOkX2w5TpOzF5H629ZM%2BTyiSQbFy0pTLlioyi1HJpigPAw0xcpqRmKxLMvXR95z2Ia1R9E8ixeI%2BaNx2uI30xLEtY5q134RpAKGna73jj3tciCKHVM%2BMFfUiypA%2FmU7kqNJSPdLQ%2BO6iXtICGkduGmktgFVvc6oqjEy8HdehwBNwrExJylfkDIB%2F4XovEB%2BMDGjuDSfR3%2BKhDC83R4f%2FPW9SvcqBiJnuEqFu4s4kkew3q8fnvfVyyq2ndx7QM9qSOvnIRvYq2IDalWKbJhq9sW77fu4IoYjktjBKenDRWjaP2sIiUCtY6ZPwghfOULMSeKhgTTcFaWfKQDgvHJZfC6inILbdj9NsLSpK4Uzc7KGP3WbAv05Hh2llUycsr%2BcPbHem9HdZ9xc4if%2BFLDw%2Fe0hNoIjQu%2FB9B7FDCD9RzZJQYbONORlcac10%2FNxdEJ2AbRwVRPAIDyxCE8Ixt0Xuv74X1hTQ%2Bxe2O%2B6keNfZZBdyUsxG3PCjQ4dowoRN%2Bf9pUkdlnp%2Bh8jY8tuddxAg3yYF%2FsNcH4Oo%2FsYL9y9AoXQ9MTi2uCAhGYJ7xLbfmlBlfxi3U0nd2YBaHgfAVdM0wl%2FqGzQY6pgHN5eqxIZvxiD%2BjCYLaDByMme48r6zcLy9P03YrQxW9ZulhzlqwwqUlbp%2FkvO6kdXbfWQOoYOuCQnV1m%2FK7NcfYgjDEXGPYqanAhDCqNbR2URh6q4KQ8o3EVTkwaYlxaJxLcgi7fTyXiprvUENFmglzwGtiH065sjcSsyvKrbMvt3FpZiDmYHUn3zMxzceV0OqLGFZLKvCXs0DFVcOfBJqC3OLP9rW8&X-Amz-Signature=2a72a17f5f113f7c6c8a8a5df595268241667bfb72e1580fd8f50d72f9eefdae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C72H4Y4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIHioadU%2BuuMlVGoxqMgIL52IzrUx9yPPVnY%2FMpqDA%2FCoAiBMvwfCqxJV4JDfdxdavLkXPSw0WSp%2FB%2BzOOQRd769Rzir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMMe6n%2Fe5ksq5mKp7YKtwDg81fx0fuUNyRcLTDem47A6jlcBfDQq%2FlTz9xOMeJZc8J0RVL18enVORsupDtxT6JrhiZKVD6foscsBoh7z52aPSfLaGbayT6cLYTFANSYeMHdHtFm2QlZ42l3jyAm2gLH%2F4mYwTTTs0vOZfslFoS%2BAI34MCiShqb20v5gsXqWfpmUuNH56Dpfd%2BznXl4kHIOdzutMLwrOVYQZndOFzsoyOI5i17mHMmIXRbH8LOrzzySgW84gYr4V8MiTEvB%2FmX5oZwMtAAAyNZn7wTRi0YnlBgU5r%2FG%2BikzHsqZ5Y5z410KOyz3s6oAIi2LvmC3WGpy9m5e1tka33DAYMQGQuPQ5R5lTd4BKUBbKydq2Og8NrqHJ%2FDIp3ME%2FextvEpIvZr4uBmU2%2F8pb0gqGV3nolVFL0Lqx%2FNIYHpwaavGmy8kGKSkkwSa3hnfqmUH0U6ZRayv%2FN01MnWlR1XlVcZCOqZHBkn7bXUoBIKYfmybNyA7L7MXsKb%2Blb9Nj8mBtwoT005LRIPVaKyUblvRYeSqxT749zaq5xoQWHGQ3laOEw9cXiDuT%2FG1vgIS7kmgriz0e0R2eMKRsCgND5QwPv%2FtyAzZ72Syjdxbbaccs0NHJFDKq9Y3w8Ky9pNqPuklAo0w8fqGzQY6pgHAqnkuPwvjE1hUUoAZaR8y72q1rD5eThvMNpi3IIcLS1tz1jqv5rvu5v4Kh45NNdYG8ds9QQ%2BM4ZWEsR3aEKRcuOfdkyiXaVNwP9thbZ7aEfhlIV0cMX%2F4VmJxtz2cTImsIzn%2FJyxLZ%2FLBJNsnuFxOaRWe7U1ZK7O5qd72hT29OTrSpFjV7SHiN%2FxDTBAtUf1UcIgBALGRgAJMwgrLaHtKcDZUBZe5&X-Amz-Signature=7146e78115b04e6df332defc20701339b22e507531b8f6b4214d3bffd50f5e2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNHQYYVH%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCICGnno0u%2FG1BYq%2Fquo0FRhaPRh9rvEX22UjguaH%2F1LhPAiEA5B85tJMMNznMNKfsKq2KDqoCpllrUBup2X3nu1mW%2F%2FAq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDOcR1UigVQtFRvDZSSrcAwQRA0UmN0nJ6ZQ1otUtjqRDJGa5hvUw3I7WYm7wB1tc%2BfRshi3BysKDhMtLXTlsHyHiozlTE2XcDHAyMsBeuXOtfO8GV%2F0g6Y7mdSJlHw1CIOnNJzFxFlxCz%2BRTHsUf3D0YII80RGgCGbiUI%2F6PK5mN0djRk0WAFnS4e%2BmRuLeJeEqUCOWt4Vp3lJT%2BalQs0%2B3WeXJeDgs%2FVZDXd%2BYFsk1Tnz9B0DQRybghuyfq%2BnUpsAllMagCqbeUa%2BYcYZwmkgIJ%2BlADVdafMW9Mt5p%2B4LHl2G2ZOYT1BtGNaOdte2L9znCwx9JgLb8Kv8j2nOWwUIaA%2B5EXYsylFqEvNpDiXTJ6fokVxNrFnDpSKfCT4rfGO5RxUFaFwyib%2Ff4MwwtH%2FZWStGsvNb0x5obdnFBGEMgWUNmGI4GtUN%2F88Q1azUCNe%2FxKSEH1WzB4BEfSbdQksER%2Fe285RAov%2BWlFWw30Uc8osxnIwPT4mZr8ZQ%2BGxBZOM7NvgTbEwzqB98L%2FghumN%2F%2FfFjkSw7RVip0y%2Fme45LfK4OhXMk%2F%2Bhd0MCIN3n1%2Fe82834iJZe89kIs8LYhgZZUTnaa5QSRV5xXScLYPDXQxZmtvRaNn3%2BYvFR7Iw7ixznNK%2FdW%2FMgUW03YiDMPz5hs0GOqUBzfSTEzzWRalSY0eD2D5xDgJVBMg3tLPvadBUDQgNSUs6rougfzJ%2BtXjVXfySWrxlX4nydEmgsBIyBXtAE1SpndcawEvfprnExQUBAKVw8c727zpDPOw2kBLTv5cCi9B9NsyXsUGa6PjwhB4qxnyplb55v%2FLC4ZNUn2D6rs58%2FNTI265M5mft6kSOsH%2B1yKN0BB3r%2FcVJJONzt2jf8atiVnEGjKcy&X-Amz-Signature=3c0d191ee9b7e164f5e0e3fd41b11579a1f4b4674c5091df8f0b74915031ca9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNHQYYVH%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCICGnno0u%2FG1BYq%2Fquo0FRhaPRh9rvEX22UjguaH%2F1LhPAiEA5B85tJMMNznMNKfsKq2KDqoCpllrUBup2X3nu1mW%2F%2FAq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDOcR1UigVQtFRvDZSSrcAwQRA0UmN0nJ6ZQ1otUtjqRDJGa5hvUw3I7WYm7wB1tc%2BfRshi3BysKDhMtLXTlsHyHiozlTE2XcDHAyMsBeuXOtfO8GV%2F0g6Y7mdSJlHw1CIOnNJzFxFlxCz%2BRTHsUf3D0YII80RGgCGbiUI%2F6PK5mN0djRk0WAFnS4e%2BmRuLeJeEqUCOWt4Vp3lJT%2BalQs0%2B3WeXJeDgs%2FVZDXd%2BYFsk1Tnz9B0DQRybghuyfq%2BnUpsAllMagCqbeUa%2BYcYZwmkgIJ%2BlADVdafMW9Mt5p%2B4LHl2G2ZOYT1BtGNaOdte2L9znCwx9JgLb8Kv8j2nOWwUIaA%2B5EXYsylFqEvNpDiXTJ6fokVxNrFnDpSKfCT4rfGO5RxUFaFwyib%2Ff4MwwtH%2FZWStGsvNb0x5obdnFBGEMgWUNmGI4GtUN%2F88Q1azUCNe%2FxKSEH1WzB4BEfSbdQksER%2Fe285RAov%2BWlFWw30Uc8osxnIwPT4mZr8ZQ%2BGxBZOM7NvgTbEwzqB98L%2FghumN%2F%2FfFjkSw7RVip0y%2Fme45LfK4OhXMk%2F%2Bhd0MCIN3n1%2Fe82834iJZe89kIs8LYhgZZUTnaa5QSRV5xXScLYPDXQxZmtvRaNn3%2BYvFR7Iw7ixznNK%2FdW%2FMgUW03YiDMPz5hs0GOqUBzfSTEzzWRalSY0eD2D5xDgJVBMg3tLPvadBUDQgNSUs6rougfzJ%2BtXjVXfySWrxlX4nydEmgsBIyBXtAE1SpndcawEvfprnExQUBAKVw8c727zpDPOw2kBLTv5cCi9B9NsyXsUGa6PjwhB4qxnyplb55v%2FLC4ZNUn2D6rs58%2FNTI265M5mft6kSOsH%2B1yKN0BB3r%2FcVJJONzt2jf8atiVnEGjKcy&X-Amz-Signature=a82a95e272f353ab08abafb052130e75fb86eb047753b4bd5883977f951bd253&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMRYBVHZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCICsfJIvn0hiTZ5t3eUDMrvmvmhFCF7o%2Bx7QNnqrbJORpAiA1DpvFXS%2FoR1VarR73izy%2B4W2GBOF9qajMg6njshPQVSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMRwrl51YoTJz8quumKtwD498uKEaQeljXc6jn4vyk7RFD6OT2LdFcsLyciupvY%2BbwazfbMajX4k5waD0IUnvZjoD6nZRlayztz5ns1ZH4k5ACQY4oWJis3a%2BdXbmROLTeC4D0rfS3RtlMKwrsCHQJXrS88rn8UYcVbA6OaXTuBQnv80KEyRPaYYHAxjIcSU4A%2BivYZK8kot2L42TaBX4bOV%2BmKq1%2FcV4WUAaISBEVkjE0GPGvoJL1rWFgnZH%2FpSuyMXROrtialR4rrZ9D7GB2iF93V%2FQUevBxXZ%2FnLcePR57xoumlPLa9QESYKMyKjJ7p3OfqKkTln4vQLcsXiHqd%2Bu58QNnIxXtJ%2FOMr8sZcT110uzU%2BVBsxmPHqpdcSV7xd9TjbMHmfqZFhjQeaj3dh80Jk%2BwbUBUrUckHmL1BRFu2i0IG6F51EhWkQdNyfQkphOoA8phepxoXTrIiuvk068CazOzYZ8G9LY%2FwgVoCYtGNmFah%2FtWpwyg1PdrCE05cTr9puVmYMtJuNdlSgKfcpNk6gOs0nSkQYd%2Bhf8XlbzXEQwdWjdYJIkvSNZfHN7%2BLeygmwlfd2N2ih6usAN7R8yun5FSiVsQADueUVEi8fnM3xjT%2ByTxf9%2FyqQi%2B7MXQ5Nas0MCDwIQ3F0nfYw1fqGzQY6pgFdqabPoxeBPmSfDFNrG1%2FnpygZEP70tyerXBG0ZhQFG7xwr8gBxX3GoGnobkb0o0uv2bzSBjtsJZy%2BX79Oke92q3jcB52JSFZwTEP622ALwKxsAsS0jfF7Jb2WQ1zh6zFRb50vzKsm5Zi9QsTupo6pcWbYzoiuycX7iV8BDSilnIcOrD7VGcC9xWYnE%2FOM6PhXQjHQ4Xr1hxziOZMVbTBfOh9LbMWf&X-Amz-Signature=90d43ee4ad544632643bea3d5b9f5f05eff1d0050700e4aab5e923f665be7398&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666S54HHF6%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQC41kxZSq8DmxZIm9UyFPa%2F1vcYWdpcrl20U%2FxMdzn3bQIgX32Irlp1dJqNtbf%2Bi0WRIRlTE2ZmE5KFhZRZXTRDJKAq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDB0iSvcGMwIBhaXpeCrcA0lhtqT54Fygrt9wtwF1kBLwQBAlqRJqlMlyZjf9oBMhC4FmWWMIHtzcmC7Kl%2F1Ipdz%2Br7OYCSaqua7D0WrV3yHMYgBq0N%2Fgft0YGv6yBgx6eJ7TpPAso2rfr30MzpqYbHrw53fqKeAAGK1ir5Ud%2B1cXYOUQkTlpewVxwia27ypuEd%2BKzSWAmpxWes74Eo%2FjCTH19qNC3l9jwLqgiPaYJuZfk%2Bzw5pG2thUel2NoZTO%2BC3mg7fsS%2FaNleI3P3K%2FiOTRKea5H2PiYFhWe5gc9EXzmtzWsl6AYNTrcO7gI099%2F%2BtpIoYTrwiDcareoNZ7vK2xvoo05Ccc0FZuZgqmCEUQLF%2FsHIYUcYooovJtgDd0ehoSlxBuJAS8puOt%2FOzArVTLgZ4WjNpxgKk0H%2B8i7FYCaNMR0NPBfTvDr7HMxPN451i51fMAY4WEZLLaVIWQJ3L058zeNgfPnNU1miDaRl%2BKOdsVFGq6Jz9TPum1X9T%2B1aKHzpHcdiAsr8xIWHw7xVuVhtlkDY9tYnLelQONd0Ad2q43i0DZmCRXuz5JYA1rio7Xd47vGSSiPyRy8Fy7Dwpr9xzmSU9EJw3zoBJjZLVSCFMn45%2Bnu5NDTFojUUEzXxakhs6QyqmeVRbzKMNL5hs0GOqUBeC9GW8OjR17kUVSaOrHltEGqPweu5hbgwRtAQOkZbsjQjyy4uZ3tcOJk6Wm3Dyt51pmU8%2BbGwdJCI5D1w7lnShHno8WUZzHdtl%2BUWM3yG1HIhKPab5i03MJ12NKXvKc5Q7DL0KOEYVMNnPf07byJJNP5%2Foy%2FRE5%2BUePMlRfe805yvoQXQM5ngDzR%2BE2bp8jmBW0hG043mPrb2smZIvrYD3C0sWlz&X-Amz-Signature=6c4902e75c9cabc38db3e5c9f179fca7fb26f249e54c07d4026d0499ee3947f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666S54HHF6%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQC41kxZSq8DmxZIm9UyFPa%2F1vcYWdpcrl20U%2FxMdzn3bQIgX32Irlp1dJqNtbf%2Bi0WRIRlTE2ZmE5KFhZRZXTRDJKAq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDB0iSvcGMwIBhaXpeCrcA0lhtqT54Fygrt9wtwF1kBLwQBAlqRJqlMlyZjf9oBMhC4FmWWMIHtzcmC7Kl%2F1Ipdz%2Br7OYCSaqua7D0WrV3yHMYgBq0N%2Fgft0YGv6yBgx6eJ7TpPAso2rfr30MzpqYbHrw53fqKeAAGK1ir5Ud%2B1cXYOUQkTlpewVxwia27ypuEd%2BKzSWAmpxWes74Eo%2FjCTH19qNC3l9jwLqgiPaYJuZfk%2Bzw5pG2thUel2NoZTO%2BC3mg7fsS%2FaNleI3P3K%2FiOTRKea5H2PiYFhWe5gc9EXzmtzWsl6AYNTrcO7gI099%2F%2BtpIoYTrwiDcareoNZ7vK2xvoo05Ccc0FZuZgqmCEUQLF%2FsHIYUcYooovJtgDd0ehoSlxBuJAS8puOt%2FOzArVTLgZ4WjNpxgKk0H%2B8i7FYCaNMR0NPBfTvDr7HMxPN451i51fMAY4WEZLLaVIWQJ3L058zeNgfPnNU1miDaRl%2BKOdsVFGq6Jz9TPum1X9T%2B1aKHzpHcdiAsr8xIWHw7xVuVhtlkDY9tYnLelQONd0Ad2q43i0DZmCRXuz5JYA1rio7Xd47vGSSiPyRy8Fy7Dwpr9xzmSU9EJw3zoBJjZLVSCFMn45%2Bnu5NDTFojUUEzXxakhs6QyqmeVRbzKMNL5hs0GOqUBeC9GW8OjR17kUVSaOrHltEGqPweu5hbgwRtAQOkZbsjQjyy4uZ3tcOJk6Wm3Dyt51pmU8%2BbGwdJCI5D1w7lnShHno8WUZzHdtl%2BUWM3yG1HIhKPab5i03MJ12NKXvKc5Q7DL0KOEYVMNnPf07byJJNP5%2Foy%2FRE5%2BUePMlRfe805yvoQXQM5ngDzR%2BE2bp8jmBW0hG043mPrb2smZIvrYD3C0sWlz&X-Amz-Signature=6c4902e75c9cabc38db3e5c9f179fca7fb26f249e54c07d4026d0499ee3947f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PMBNCYD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T162431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIB8Uyv1iHErooOTqX%2FKpPPCxSfoqKJLoSyikEFxrR%2BsWAiEAzsA44SIt%2BHE%2FIKst9DybDGi94XqqkYrPyx1vInNxv40q%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDNj0k01gXxzbEAZfCCrcA1Fw8pkZalUfAXGARug3wUizYuLblLjxL0GEIhQkwFlUZnt6EHwAw7TNpE0ylP4fzAPNn0rqwnw0VgZTEMvKMUEUxpBWBoHeYhdxPDR13o%2BdPlj0kztbQbnsVu4yr7apgk9vkhNTo8FGLuOtoUR9NKOg8oIAkX4%2FdAhvlXMAblhx%2BPcNvAk%2BpWAaBeVau4Zh5cDI3HJ3s9OBowJ3cwkVOCaXCsVzst6Mr%2BXM9D9RLqr%2BsIp4sbwkCMyE6x30IlbMfZvMrLNVYA7C50rvVejyZpuzK2solmCgz16juRiY8tP%2BSMh9RcUgTElCAf3TG3%2BKoP6zlWCyFsuvQwiW682Cn1GjbXiW0kMDFd4TVjQPwBUNY89AJrN%2Bp0YJ4%2B7vpeSI5YFU1NkMkxZrtYXN83DN2o4GFG05cUhN2hhp6EoBkc74wwfRBnCiVQqKTuwZlBDjpc%2Bsw9f4TCADjMDEPqrANK09k%2BVUxxnAEH8sicajnU7FbGGPzP%2B0Aj2IqidniwOxjcUfTxp9G4VSA8Ang5x1zhrBi8wXOVLmAjRasvHaT3e5QxqXB06GYJ%2BEGkkWaL%2FptYYRQFzqpjpzc6AjW5UZgu0WoVfpHI2caislIHlWqR14aEgiSrWKJasjktabMIL7hs0GOqUBarzYFr6EgrvvaPn%2BibFwht%2FTj1un3NOxc%2FwKQVjCKcdsG94BWfuuAH5dBAjf6VpSSArltzab35u948jqcrjnlDk49Ku7yMzeoVR8LQKj99t2wBQBbQLXbEOBxfwZH0kv9Aky%2FZQSPojZWscz2xIHSEzyTiE%2FlJ7c0bUF8VQZh0kLYAVfYtRCgb%2BE1Z3nqmYNmPfZNercdvvQhatXLsABnTk4SXYw&X-Amz-Signature=e8e82fe499b0626ae4f622c6b7a145120aa0bf830850250c5627c0cc504a762f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

