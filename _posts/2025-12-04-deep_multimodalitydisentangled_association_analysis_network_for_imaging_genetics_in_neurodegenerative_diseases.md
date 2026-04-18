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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOYIBJHS%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCj9FPY0U4x0lHWKv%2FYfElOOszl0p%2BeJfEM8z6k1zSwFgIhAN9dcDpkK58%2B9WNOv%2F8THj6EFTHljHGaUuKMoJzD52ZXKogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxQtgQT3xKiBlvEH6Yq3AMq%2FvadQ5w61CGLs7x1zyIGTHxCpRvwxRs9KM8x%2BMIIBzBpeXfzN%2BCxrwQWZcSPCzgr3kmxVz5YS6GBRikZzrSqmhoZc7dw5of%2BYNUOZxspN2C7K3FzuuOuBbpvASNhp89Z2aw68fp94ylqyw%2FoeCYjZjuE31hTg9GZo9kZTp8Q6RqDb1yGuNIsBXJXU4E9AA6rC7u8iddpflohHJcgAdZ89%2FygVKjue3xeWdqkgGvSmunEsiT4jn5L%2FDJqUioZn2WcQzWZJC%2BjKF%2BWFs%2B7pOj%2Bw1mL3faW0dIhxY2ySFjhN2UgJXAqaluLcCJovoRvZR5OznT9BxKe%2F57DOQNZXn%2BVQRMRwqx%2FE0pjR0owoO2cHwhKICkHDkoSIIrwCxwGhee4KZKtdJ4RoTPWqC1yDuLoOXn3RVswAwBjMeYysKO2f%2FYXwBgZ2C%2BLzvxweKrGjJWhQzw6Y10oX5PVjmHKz5fc1QKphU0uTsQK5tlrE6KL1lYqVAglsdZTTWVI0wYusBTtBtk7omfQuI0zTOPRPYWj6Xbw6LdKvrcLjO4cTHtg6HKVwUQHvJ0CPFF3rf2TZUs2Jshd3Ph7emJkwzc3knqST620upnuCcMHmiLiVCT0OEHpTJMC2adFmjZD6jDf4ozPBjqkAaLHEBBD1vZ5YftoxIPE%2BRsYA3uc%2BWwdindDEKgiRde3ekOxVvB5iHW6zYDXoKiIyPbfovRIhZZd2b4PA2%2BGOtj1av8%2Bv6u%2B7gfuoWlK%2Fh%2BnvFDh5OMY5be%2FsUt3P%2BkCHAYpjzYbIjFfZcsx9MvJSJOEFyEtRNWizBu6CrFgdZ5xrKvlT%2BF4OMDE3x8SS66jMHXxAmH7a59w3szZRlRBjctm5144&X-Amz-Signature=ab3f172952d27dbeff134117e51a9a27d47c5bbf52b2001bcd732ff11231bd40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOYIBJHS%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCj9FPY0U4x0lHWKv%2FYfElOOszl0p%2BeJfEM8z6k1zSwFgIhAN9dcDpkK58%2B9WNOv%2F8THj6EFTHljHGaUuKMoJzD52ZXKogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxQtgQT3xKiBlvEH6Yq3AMq%2FvadQ5w61CGLs7x1zyIGTHxCpRvwxRs9KM8x%2BMIIBzBpeXfzN%2BCxrwQWZcSPCzgr3kmxVz5YS6GBRikZzrSqmhoZc7dw5of%2BYNUOZxspN2C7K3FzuuOuBbpvASNhp89Z2aw68fp94ylqyw%2FoeCYjZjuE31hTg9GZo9kZTp8Q6RqDb1yGuNIsBXJXU4E9AA6rC7u8iddpflohHJcgAdZ89%2FygVKjue3xeWdqkgGvSmunEsiT4jn5L%2FDJqUioZn2WcQzWZJC%2BjKF%2BWFs%2B7pOj%2Bw1mL3faW0dIhxY2ySFjhN2UgJXAqaluLcCJovoRvZR5OznT9BxKe%2F57DOQNZXn%2BVQRMRwqx%2FE0pjR0owoO2cHwhKICkHDkoSIIrwCxwGhee4KZKtdJ4RoTPWqC1yDuLoOXn3RVswAwBjMeYysKO2f%2FYXwBgZ2C%2BLzvxweKrGjJWhQzw6Y10oX5PVjmHKz5fc1QKphU0uTsQK5tlrE6KL1lYqVAglsdZTTWVI0wYusBTtBtk7omfQuI0zTOPRPYWj6Xbw6LdKvrcLjO4cTHtg6HKVwUQHvJ0CPFF3rf2TZUs2Jshd3Ph7emJkwzc3knqST620upnuCcMHmiLiVCT0OEHpTJMC2adFmjZD6jDf4ozPBjqkAaLHEBBD1vZ5YftoxIPE%2BRsYA3uc%2BWwdindDEKgiRde3ekOxVvB5iHW6zYDXoKiIyPbfovRIhZZd2b4PA2%2BGOtj1av8%2Bv6u%2B7gfuoWlK%2Fh%2BnvFDh5OMY5be%2FsUt3P%2BkCHAYpjzYbIjFfZcsx9MvJSJOEFyEtRNWizBu6CrFgdZ5xrKvlT%2BF4OMDE3x8SS66jMHXxAmH7a59w3szZRlRBjctm5144&X-Amz-Signature=ab3f172952d27dbeff134117e51a9a27d47c5bbf52b2001bcd732ff11231bd40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGF4FQCN%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIBfQwgLqdP5HTMaqPxrVBe5rODa0YicLRPYXHX7tI7l1AiEAyTqQSiPjbsLQhhk1frndE0rA%2FsTrwrBS9VurTSY38zgqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEhBQXlOg8kOqpfe5ircAz5CXSfVmTLwdCygAbKLBcotHEHW%2Baf7hQCP35I2N2M5M5jlWus7JdCWrJmeFX8zmpOBqsLuwT96HptUia%2BYIhSdgmm74WWew4eHhfTXhdk9C3J55eLs1W9YaFurOgEkWq7eVxpaEzzONCtHoLyFKSULGS%2Fbw1FyIa52JAlZvh7r8phwl6rQOHnjE2HTzHOYgoBx8k%2BIVe1n7r0RUfxNCLuz1M5jWm3q1ZtmZSn%2FHhDWa47dU3ExJmOyBjgCnmFoUvB7UehoFLwNY7CHwLU0pdYqjsRGFXiPUDAA4dOSrwdfzXIZ2FB7GMh%2BPOEvWrKYynLeqCEIJ6%2BmA1r9cjVquRDfzgradXd%2F8ctzBzfdKo%2BxfZuPQx1bhKC5TK8ljU2JSN6ciwgaXTad1JcZsry%2BqCPc7hgCU31HnPpeeBZFQW2tsEFHOB%2Bv%2FZ7k5IJUH5DobVnjakhDbWfNmqrFjI2qpIB1woItmGXHbmSadk%2FVstXaPUxjuZW9eoa10MfI8qURpjvRe%2F9sOph3RMxMEF7tFOBWIgWAWAtH7hQfudTRClSlDnVwzMTuhT8QYUU5%2FhMPGaWS9XlRc8aMepJxV3ketF2XMzy%2B99hA8csxu1Rs7REZU5qFFpl0HrgTZpHvMPbijM8GOqUBd6QVXCLUCfrT5hIk65FreVwW8Ywp2%2BaC9hCSb3GNOYWtmqeJUdekRM5fExsVYhu8Wt9Ny26fSf%2Fi7%2FStwRtUbLoJXN70RO3KDmn3%2BIdt%2Bmp0AmKbHYrbHLonGw2hhgqDLEGUSGXH0NVzChjxcu4QND7Qi2k0n4q%2B%2FHjXxeqgVtsodurbeP2ylfYpY%2Fz3cU%2ByZgKl6cuaLdgHLUaxrZLkPWWStrVr&X-Amz-Signature=c1e48135ac6a9ce5b2a1433d919a29ecb5e28f1d59ece07ac9948db6d5ebad87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US2L2MLR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIC30uINNIPcXzjrWlWHW%2FWzCTWOI6f9raDOKmxBcnheOAiBxYP2QtKRptSUuHJdkjpw4WdImRb1BdMmNG5TAAFfN2yqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4AKqpDoEfw6A6gWMKtwDXjDfk1biLoSSVgk53XTxBmdkoEBf%2FnkSG7E9l5nCSu2MK04pH6DXyB0LXLNpLtSmsnMJSuHcbV37LMVbSBys7cTPsjUuokTP24BmioUGSUIX9pI3djr2%2F2UWbhO1H2kFaZma8WgLmCIz6yYR0YLFOsYHx%2BTACJ3BW9L8xy13q%2Bt5hP3vSz2AQOohUtXel8t5ABwXsQnqGakZd1JHw%2BxqQzRoJzt07D31UtMMcxfTXR9mP04YFISEOm51e06F9%2FllTkkLCKUn1s7XdQI7VU5J%2FskabEjVHmEwfgvo8ZZqukrN35qzWt3J%2B19Osj2ReJSP8CM1Lip2Z3NiIk2lHjy4e6ka%2BIpwlM6hyfSC%2Bdm3CCHNKd0oPVT5MIm6sLCrzXFNY8L%2F1%2BeycQt%2BSeKVQkPrJ%2FeLOQOrEYtLPTtZqi%2FlET51imRBno05pFfEntFhb4zkL9ZYrlJklzImLEDGBuPM6IH989bhtLIUuh6UtWKgjgcCNEjWdO%2FHkyVTmuVY3OeHfJOi09MUZhROtsR4rcvim0DatvqprEUwyjI5NSdZg9nIfwstUdcyzNnEL2alQERclZrEkfpZGCHUqGSs3Zp4YfmrN43mQvSY5KxOkRDK3oq9wjQO2TB0bwUN9g4w3OKMzwY6pgEOjpjvWbggjGH59%2Bkxp6XL0II252ZcPjJ06Gv%2FzYVSUmzwEtEtkdf9VgkKypbUp385pVWt%2FyzCMIl5G9elo%2BnHo%2FNU86W23q89zLYxOi6jaPyHN%2Flj92yyGFCtwpDu5y%2FU8YFMA9QWTz%2FHZ3lG%2BM%2BJwv6VaSOS5MAepMj7Q5xXfwiT1dw7BJGESTRkPHXz6ZB3nMoyYxnafMgCyVLzfHUmw5g%2FLTz3&X-Amz-Signature=de0bb1234671658aafdc743ed4fd3f24ece445a67caf4d1933211af726e7760d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US2L2MLR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIC30uINNIPcXzjrWlWHW%2FWzCTWOI6f9raDOKmxBcnheOAiBxYP2QtKRptSUuHJdkjpw4WdImRb1BdMmNG5TAAFfN2yqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4AKqpDoEfw6A6gWMKtwDXjDfk1biLoSSVgk53XTxBmdkoEBf%2FnkSG7E9l5nCSu2MK04pH6DXyB0LXLNpLtSmsnMJSuHcbV37LMVbSBys7cTPsjUuokTP24BmioUGSUIX9pI3djr2%2F2UWbhO1H2kFaZma8WgLmCIz6yYR0YLFOsYHx%2BTACJ3BW9L8xy13q%2Bt5hP3vSz2AQOohUtXel8t5ABwXsQnqGakZd1JHw%2BxqQzRoJzt07D31UtMMcxfTXR9mP04YFISEOm51e06F9%2FllTkkLCKUn1s7XdQI7VU5J%2FskabEjVHmEwfgvo8ZZqukrN35qzWt3J%2B19Osj2ReJSP8CM1Lip2Z3NiIk2lHjy4e6ka%2BIpwlM6hyfSC%2Bdm3CCHNKd0oPVT5MIm6sLCrzXFNY8L%2F1%2BeycQt%2BSeKVQkPrJ%2FeLOQOrEYtLPTtZqi%2FlET51imRBno05pFfEntFhb4zkL9ZYrlJklzImLEDGBuPM6IH989bhtLIUuh6UtWKgjgcCNEjWdO%2FHkyVTmuVY3OeHfJOi09MUZhROtsR4rcvim0DatvqprEUwyjI5NSdZg9nIfwstUdcyzNnEL2alQERclZrEkfpZGCHUqGSs3Zp4YfmrN43mQvSY5KxOkRDK3oq9wjQO2TB0bwUN9g4w3OKMzwY6pgEOjpjvWbggjGH59%2Bkxp6XL0II252ZcPjJ06Gv%2FzYVSUmzwEtEtkdf9VgkKypbUp385pVWt%2FyzCMIl5G9elo%2BnHo%2FNU86W23q89zLYxOi6jaPyHN%2Flj92yyGFCtwpDu5y%2FU8YFMA9QWTz%2FHZ3lG%2BM%2BJwv6VaSOS5MAepMj7Q5xXfwiT1dw7BJGESTRkPHXz6ZB3nMoyYxnafMgCyVLzfHUmw5g%2FLTz3&X-Amz-Signature=1cc556d1d8fdd749094bce39fcf98058cedb7637eb6a7fa309973da96a63b726&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEJJF3X6%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIGRuWpg6UaJoVR4g%2FeWrvcJ0dOSBDjr4ftgzNZfuLL5bAiEA9MG8gMjMV4tzFO%2F0KYPA5MJVRaxolNZXQBgwz%2B1kGwwqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNZ2hCGr1KyiC7RCHCrcAxDx1zJh%2Bf%2FQqV%2B9GjChw0NbXun%2BG2Ymb7EUa6I54uPoEATpPAmuS5qYe22SDiic5LeGXY2Zw0imrM9cR8SnSPGYKP3rPORqglqbrVUvUiwuXpz90L302gBhSneCWQ78QQu6GLnIXcJP%2FtCF%2Fb%2FwL%2BJgwmlde0Kpnlr9cc8Sceh7kg99Mzamg0Eb2OONBbep7IactY0tHe4Tk%2F85CHQ5cwhpXgc%2FeQfSBLmN8G%2FzlQpjiL%2BOKm2LQQK7JKAXu9xfRA7T2gAriu6ATYke8nWF0JPM%2FHCDEKYOIaXD%2Fi6ulCKtKtbDWiMuERz%2B3YJtLlN%2BarO%2BLh6pQmQcxMEsqp7d%2FtINoupRAcj%2BrWkvEvpFG93TTsHi3gxf%2BRWYKBwgHGB%2Fm2akOphuDCoeyjEq0UU0MiUhHFBQCaC7ZdHYUwHgX43maxaU7SbqNoftSWlSmJLZumNHfAxLFPi4VkcEevwWpj6R%2FusoK9lm9BoLbVFo83YXKgcgjDmx1nHFmXSqz82ARNumYODT7sMzmz1Rg8irXy0kV5ZFJa%2FobFda%2BowwJ9CZ4zi6f9GlNhlfFSVfNxhq%2Bo8Rc%2BKqzyBwX5Q6GPPqTSElZ3XGZmAKiT%2BYDhm3aR7Jc4wc19sIo%2BSJ9s3gMLLhjM8GOqUBJUNF1mYbN7Gb6W%2BOklgHil7sBYnYRXzuXZjvfrXwHwy5cdqr90h9z0DFAn4TPXefRkRgLZgfTxP83zGbtDPlNfcDuYd2phjFSmgfR%2FDtv2j19efeG5crMQZdUPL%2BTS0rbioAvnM0GrP3pllMDSp7pK8Y1Fhg8JoQ7gi3rhykOEz1t4WneU7iktvIILtYMvnYq6sjOIEipsU5fA3%2FhoZWbQvnWSbc&X-Amz-Signature=bf021c9a4828b8cf54d61507af0f1b4dbe195f17d0aedacea341ea9a3cf5bfc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RISIRFCY%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQCwxOF%2BnBX%2BUS%2B%2FhoZZXUCYGDz6DsDffan8cFqKuqsAegIgehzhW%2FipuQDaIlQCBoQik3aHzdN4CDdcQ0meSozNjykqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDNzJ0oPvUBcyzURpSrcA%2BeDzsnaaSaCtNr09E9%2Fz8NHPEEpPutdKmXH97yWym%2FlGNPwLz2Xa51KlFtN4Wi%2FPQv1n194YOiLxt9WkFumAzuRdDgH1aNzbu84VoSeirhTjWLxoJYfJWrMIIzVJDMG6qeoVEaZfg%2FxZ51ybJcdCBxFhl9Fq%2FiAUHs6%2BmOtp%2BjzHUBnEhK3JjHknQEPEqtJcNqMQMyfjSbpsghwxI90n7hEfBIUiG%2BnnuGbcu2eB5AZLKvgXPlGtCXkaiI6xrA9N3doT6yx9nF%2FcZ2v7qUniS%2B5cE8AgDbacpsxe6SNi%2B3p%2F2dNQL%2Fu1AcrWsgzmmHeeTYWS70dqfTgXKNSn7PphEyqsk7E4n8ZxlXbjDVvrccV%2B5R9EPYTjw7n5FO7oKpBjP062Sy6VyPUMls0tHHFPoJ2B46TWC0olzS3n%2FiwOSIkPe4QwpTdCP005rswwHgiQpmu68kPMDUNPVKpnW%2B4hFPrfWDw63FTdT%2FGHFrOJgBqskEot%2B7dhjrI9lCDswOJFPae1A0R1xlbZ8sLaUScGgAuOtzxYUYikEOuHS5E9AwJGG3Zm4Srmt3OdiWu%2FDxCrps1SIZOzursUGLVOz0mRA8U%2Fv1UoWwtoFeFbV8CCKWu3ItoHt%2FyFSww97tTMNzijM8GOqUBno75Jrk6jOmvtxrE%2BwRsVKwdB8iw5TMouLALCCFnkjZcTrRxlH1KyzJHyCnhTaR76958gqSgvN8Cu1m7znBvlX80k%2Fh1y5CyA%2Be7ODL1q0WwIIA04ZUPn2poqAgjDhwc8dJ0unhgPt1ILxP5ad5zGR07LExeWdYrllVEC3F7EHp%2BPbc1YcfYRaWQsfw1wOKUCynSgUMlyP2pBBPhV4I9vX6wZzuW&X-Amz-Signature=3e49fc55a320c35f937a6743957664ff81916826beed900f26ec063849b3ec1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNLR46EF%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCkRbO8RkL6EE6CI%2FISpvhCO1HqQRV9dHGLoA%2Fo1FVcpgIhALLonZXhfiy64yA0PsPVnadeIjzZLw0Dog8OeslZgO0NKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwxueS4Ov1sxj7RFvsq3AOqx8x2ZL0FmWtS5iFOqOepFlxVL9857fTOg%2F5mWJU4RDl0OqPpl%2B8SnaUkMEelG7PCk0WX7tLaqA8sQW4cXoYGy%2BONKLHoQlsvLaip8fuF7%2BZFyragcdvu44IoMDx2GR9IpnxM1uE4DFvCYfEy4wIFu7PzSpsxZAPXe2hD5UUycVZhkHVBy1%2BkpUAQyfez75w1%2F6pFIWAWl7x2AhlxigJnVVTzwB85FY4EOT6LBv311LuJXzVpFstGLQmohhj6Q39UwrSJWU%2FD9Y9agzJPb8H0yaxk6QQO8mbC3Pda76KNXj%2BXhyf7%2Bhy63vipDGhjFlrXd10LBeV0tIavfwVu7EHYWS%2BnbDnPYoGkig%2BNM9qsCaZUOBUfEIAmXH01raI0oHLCrK5AxBfmySxDEpSNheWR4Bl7eEj0RvmT2129%2FSIKEtyTOb%2F7w5bNW%2Ba%2F4sCWDnUbxwgKnOTI7c%2BkHwe6hCNtGKS9Md9dQVBhx0d1SH8mvYpMmfXG%2FdXu5phikGEG7455KuYBV7IGKWXINNmSrS%2FMk7KrYJt1E7NKqKTHNUMJrIfW7tu6qmP7vNcFDfGUjPxbpjsJ1iCtKATBOrJyoZQgHdwW%2Fo0E1xekZr5Uz0SqKox4beoY41SFy9oTjTDP4IzPBjqkAYzAcJF0NrfM3lJ45NGfcv%2BCuNjZsWuoazkWW4M7FWNv0qhkwkscyBCQ%2F1TT%2FXWX6gMvR9tynbE2MtC19fx1WSuplO6skLJdmE0%2BvhQh8VHgjvfaS6doa9KVKYTHcc5u1bXwwu2cK%2FroNmzRwWloQEOeFfOTazCsZg7MPcxM9sTQdweWoTx%2FeqmMC4Epynqvq2VArUUkljyASJw3iAc6mAQ8meTZ&X-Amz-Signature=ecb4757f98cbac45b581b1d7116896dba5f7a04eb617de2b9de174c0008696bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632TFYN56%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDVvXcG7mN4YuHzt4g3UJp%2Bdx6ZeOYMf77a31RjyS3FAAIgdHuDgSOxIE3eZX4TH2xgZwwYvn8ztzQ7oedX2YNSuQEqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC3L7h4YdqHa8DmVeSrcA7UsrROQjXE6Av1qm5kIunAxVQTEzLDM4AF%2BhrJyyL41KFLKyhoLakfXASPM49BIGze7OLDRht6VRKEClCd%2Bl8tT9B%2BhEOMKCYqNfGrHm6%2F2sFVWYOT1VBCzloxUMyBcl%2F%2FOXwpVpjQn8bZ1P247zf%2BcT0AlYUdtoQLEhNAecHqKxYOiT71LNonv3V6KxyP5OC1D18xGE4q5nLf7CW6ebYB%2FnMEYK2%2Bz8i3qo5ZyKReU2NIW5AdzSNrnkIplaf1bNzoMxt5NC%2Fcpm9cFNNHuEaQQhFMTfvfQOXtcRhhnzkSD%2B3f0aPjZ4thrNqoIgDTn5RkpvlkI2gm6OAKoUCMfYI4mUM3AS6n9A9sQ9v2iZqyssZ5qwAQkKy3qEQTTZN%2FmTGGAjt2pPJgYt6LJwv9ReQuWnyeoVw3NDUs2wrXeXftv4FIHX9NIPT2Wi0maKfo9PBHa3T0rtguLOLt%2FZYVmeKqfgcLmf4sr3D4DvxCa3PBNXUstQPuI%2BeVgL0DC%2B22Ggc1yD2o70WTioPTRcQ5OTdlEhZ9lRbomwuUHJ5KDUTAeiu5xzgiynMTS8abLn%2B1FLG8fVUB%2F1Q5mCBGW29W47m3TU38Fci3shE8lBS3oVbIpEC5W2Gb9zWiTL5gyMMPjjM8GOqUBFVBiliiQYC99Ooz%2F0sNeRW67s0fIXmJQxGTyOLSOar1taX4p%2B987%2FfKRee14e7HuWlvwBAw2jWl2F5LeV9bjQ3A951vOMq1Odx%2BGXXEEkPw%2FnrUqkZ%2Bs%2Bh8%2BL2p774XtP4o4BZ2t%2F5%2BcB4QodTyHx8yzcGlGnCfhrZ34H%2B4dpOlIqhqfuqbmMmQINAXJ2xtRNcFVHG4qA1R44N9te6Js7eIgdqvr&X-Amz-Signature=a4bfb1570e8ff73ffb58fc458005ab43a66795c2cde4f657cd867f87cada3e25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632TFYN56%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDVvXcG7mN4YuHzt4g3UJp%2Bdx6ZeOYMf77a31RjyS3FAAIgdHuDgSOxIE3eZX4TH2xgZwwYvn8ztzQ7oedX2YNSuQEqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC3L7h4YdqHa8DmVeSrcA7UsrROQjXE6Av1qm5kIunAxVQTEzLDM4AF%2BhrJyyL41KFLKyhoLakfXASPM49BIGze7OLDRht6VRKEClCd%2Bl8tT9B%2BhEOMKCYqNfGrHm6%2F2sFVWYOT1VBCzloxUMyBcl%2F%2FOXwpVpjQn8bZ1P247zf%2BcT0AlYUdtoQLEhNAecHqKxYOiT71LNonv3V6KxyP5OC1D18xGE4q5nLf7CW6ebYB%2FnMEYK2%2Bz8i3qo5ZyKReU2NIW5AdzSNrnkIplaf1bNzoMxt5NC%2Fcpm9cFNNHuEaQQhFMTfvfQOXtcRhhnzkSD%2B3f0aPjZ4thrNqoIgDTn5RkpvlkI2gm6OAKoUCMfYI4mUM3AS6n9A9sQ9v2iZqyssZ5qwAQkKy3qEQTTZN%2FmTGGAjt2pPJgYt6LJwv9ReQuWnyeoVw3NDUs2wrXeXftv4FIHX9NIPT2Wi0maKfo9PBHa3T0rtguLOLt%2FZYVmeKqfgcLmf4sr3D4DvxCa3PBNXUstQPuI%2BeVgL0DC%2B22Ggc1yD2o70WTioPTRcQ5OTdlEhZ9lRbomwuUHJ5KDUTAeiu5xzgiynMTS8abLn%2B1FLG8fVUB%2F1Q5mCBGW29W47m3TU38Fci3shE8lBS3oVbIpEC5W2Gb9zWiTL5gyMMPjjM8GOqUBFVBiliiQYC99Ooz%2F0sNeRW67s0fIXmJQxGTyOLSOar1taX4p%2B987%2FfKRee14e7HuWlvwBAw2jWl2F5LeV9bjQ3A951vOMq1Odx%2BGXXEEkPw%2FnrUqkZ%2Bs%2Bh8%2BL2p774XtP4o4BZ2t%2F5%2BcB4QodTyHx8yzcGlGnCfhrZ34H%2B4dpOlIqhqfuqbmMmQINAXJ2xtRNcFVHG4qA1R44N9te6Js7eIgdqvr&X-Amz-Signature=a6c3b39e985e3fd1112ccc3924c499ebeeed1cfc90df023c87973a3e23b7ad6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJUAFDLK%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQDVGd1vyAB1B9uIqbnuhco7cVONygSsWXkoKn5t9UFedQIhAKKANx1ruYuugVXrwdWwzyNxIZzD%2FrGeNc0GevDdQhIrKogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxA52tkgHcG4DhnStcq3AM9t%2BjfLNUHmZdxy38Aj7g4VOeJaNOadbOtuDZvNzKYRsgC7sCBmezub%2FL9xewqFCZJ%2Bz6IPqlndzS1iefmfS%2FCdLyZB9f299oXFgn2pnfF20QKroc1iEXLEGMrXW4m6BhN153p%2FNrqx6k503JSvLYcQd7MjKd9cYUDU22BMWuLd6fxBqOeik2ezVpsodHPmEAJDCB4C6oMAwawFqvskWfwHo01%2FjsgDMBCR5e49axz3TVkrmWvzkr2TWDZpToHCmMB0pGxrQwmDMLXJ6ZAGch9qopGJE%2Bx881l%2FJaWYQNLnfuLExAR7f4HrMYVEcTag3UHwUM5GGl1VMGh99xf5f9jGdajTR6tDk3vtBVJaOL8Xl8VrLitpa0JHOMS38g8vPN0hv%2BM1fM3eCwMY1PAMPQ8FSUXkYd1KYVYetpue17BZu3naCO9yVXxkxTQJIBja97mf8UCklPuLifNdJiTi%2Bu0WLGqatDLVhNfgDMz0WPWbzMPC%2BMONjSfrDSAZWPxbn2cZ1sx53jI7EovFqp5CiZM3mUMkPBdfBbOM3CiCga0Nc54g2hURvWBPP0dn2SWRQ4ORVJizdG%2BUqTGZtfci8NYue%2FYf6KD1fg0pSIpLQHQWjox610MGp2jiCk6EzCf44zPBjqkAZqjqHTOIF3TlQAEHIk1ZHxF3LHB09hIEIL5IXHx0f3X7vC5ltyjC8nib%2BHr0opQmeGV5N5muiWrgx6Bcf0gi2Les%2BBHwKccJKY8Qsfia7%2F00JY%2BoipHpSRGzJ4Mw0PWsZNpJpbSCvOgXOnKz4FD2e0NkSyHSm71Hu3B5aZHhAvd7MFTdLJD4qKVRS7Zi4VI1oLCFkP1%2BNP%2FprpKhd3tlpH8NCPJ&X-Amz-Signature=72cea8b0be2163e23b5441af1968c807ac49332d31c932a9ffd31935f2390702&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QETFFAKE%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDougvhxcHnSgcRfxLQoUXn%2FLK9A7IYtU4JJsIoCU0YzgIgEU6ch65lnnKXhSZgZLB4R4rqfKUP0L6qoG%2BoIAsXUjsqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDImkuDHTHWRofZVQKSrcAwi0jTxLlp5Ag4WqyM5g9UQUCHormwGtDWE9Zf0wxuxaRqNi4PKVRVR8ijCV2tH7Y0a8g0q5jodkWdoxmn7mN3kIPSmZ4hHF8gd7urAARxCwozHJAGtCY7Of5zYil%2BWQgZDvD7LnsXId2pXzGShkOQ3J30HVHhjXJ7hRWeevNIQqRgPkSE69ET5%2FXW%2BDEyLVqktn7ERbhOPH4P2ePrj7CUEOq5YqwBUVPzDHuRixCRFEsYHrdxHg5nkY9TlApEm4giTPISyhgYY61NJ5dH6qciYPzslJpnl3GQhXA7zL0MXtCOfe%2BAE3GDiG8m5vnz5mVBQgOTsAndmtvp4otTEI%2BPdZmCaH%2BlMH4sW6vqZlwXoUbfQt3oSCuClwppClZgLIIp5mWOuLmgmDEB8HKKegNEhnBi%2Fj3aPMMthv3cx3PK9dIfez6j4H%2FgaPtJ%2F%2BMb3ci5xzT9UWWDztPH%2FIafn9nrlx5MmbPuA0JOGfMbDEmKPIO7fvc6DMBWCWUL4zWDmdRapDKlN%2Bv%2BpWO1j2hZpgxuD7wO%2FASSGlAwLs5%2B18I8mWmKGshEPlbnOjHPXidBMusdrcIq5xJqmRz%2Bvo5pkUPkUVGsg0xlMGCXcojuF1FBvGz8GOm6rXnyTswS5bML7gjM8GOqUBLxbMbf4iIPNiB4uo2zm3Ju7Eyw3EB6KiPjEAtYIk29rFyatqEYWWjFqryV2JixvcLAMERhCaJoRo6bcpF8gspJ7DxiwrCP8h38z98gd64XWUSEgs3Sp%2BRtEU22oMs6UlYDghldU4kXj6qZVtZke4%2FM077ktu12HukEbu5FrRK6xQY4QOTQtOOfaOHXpixc51O%2F9yEHEjkmmybsFp7X5aI%2BVBJ6dG&X-Amz-Signature=dbe6313a944ec4c98db312241a421796e6233eb5e4162fa4ac1339f819f24c57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QETFFAKE%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDougvhxcHnSgcRfxLQoUXn%2FLK9A7IYtU4JJsIoCU0YzgIgEU6ch65lnnKXhSZgZLB4R4rqfKUP0L6qoG%2BoIAsXUjsqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDImkuDHTHWRofZVQKSrcAwi0jTxLlp5Ag4WqyM5g9UQUCHormwGtDWE9Zf0wxuxaRqNi4PKVRVR8ijCV2tH7Y0a8g0q5jodkWdoxmn7mN3kIPSmZ4hHF8gd7urAARxCwozHJAGtCY7Of5zYil%2BWQgZDvD7LnsXId2pXzGShkOQ3J30HVHhjXJ7hRWeevNIQqRgPkSE69ET5%2FXW%2BDEyLVqktn7ERbhOPH4P2ePrj7CUEOq5YqwBUVPzDHuRixCRFEsYHrdxHg5nkY9TlApEm4giTPISyhgYY61NJ5dH6qciYPzslJpnl3GQhXA7zL0MXtCOfe%2BAE3GDiG8m5vnz5mVBQgOTsAndmtvp4otTEI%2BPdZmCaH%2BlMH4sW6vqZlwXoUbfQt3oSCuClwppClZgLIIp5mWOuLmgmDEB8HKKegNEhnBi%2Fj3aPMMthv3cx3PK9dIfez6j4H%2FgaPtJ%2F%2BMb3ci5xzT9UWWDztPH%2FIafn9nrlx5MmbPuA0JOGfMbDEmKPIO7fvc6DMBWCWUL4zWDmdRapDKlN%2Bv%2BpWO1j2hZpgxuD7wO%2FASSGlAwLs5%2B18I8mWmKGshEPlbnOjHPXidBMusdrcIq5xJqmRz%2Bvo5pkUPkUVGsg0xlMGCXcojuF1FBvGz8GOm6rXnyTswS5bML7gjM8GOqUBLxbMbf4iIPNiB4uo2zm3Ju7Eyw3EB6KiPjEAtYIk29rFyatqEYWWjFqryV2JixvcLAMERhCaJoRo6bcpF8gspJ7DxiwrCP8h38z98gd64XWUSEgs3Sp%2BRtEU22oMs6UlYDghldU4kXj6qZVtZke4%2FM077ktu12HukEbu5FrRK6xQY4QOTQtOOfaOHXpixc51O%2F9yEHEjkmmybsFp7X5aI%2BVBJ6dG&X-Amz-Signature=dbe6313a944ec4c98db312241a421796e6233eb5e4162fa4ac1339f819f24c57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SB334FFI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T093527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDsJ3aJ5aGHnnOsfHbwRwVnIfzhy6VhZt26iwSxCekCugIgfEmgEY1akkAOGdqWSUzr6H7655vTlUsWJHeUhes2s2gqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOL7dJFAZnTe2tLl%2BCrcA5TRwedyOXWG1nVpft%2FReHw3eNIZp57SRK3GRdZlGUbqJJADkRfsaxBw4aZlPqiIKaeRyzvIfhkP9teLWA1RHaNYalVyR99XbVUrOeEx%2FmIG2Wa9oJhLg2T9g85m6WcMJdziYnbuJwoTdMN6gfWYzE1isgGM90KIzkaHtVRVnPLezDyfTISizXdAOclsiUCDiP3WnM3NO5dzmRcpEgPUFI3hUVSphrk4ZA9pCCiSBWdHWabJ1Tf6K4bSPNubpkwxwJyCzSEiuDCZxkH81NZEKBxPmwdlIAhdKo9D2spJHYCCIpZvm33l4uepXbtUPqvdmMgrrSYT9nsloLrQ6Ub%2FyD73NmPgdaQeeNPWMctVx%2FeB3XiFT1dyPUtLJ68F7shW5RofHP%2BAYb014u8htpxLSMvpe6UGaxiy6fjSQNbU1lEBACr21OvDXUQdubMBJApvU0PixvT1pb2NAvnvpb%2BYgqvq9axx81zgL89L8PB2nK65YHi%2FGP7ttU9d05aA8VjTrCmjtJl9FWcUQj98cMMwfeumk4jqRD%2BzaNEvYOGLW7eixpw7TPqaQ4mY9%2FO%2BB3pIs%2FSORjbo2UoH7j12WzObhK%2Fpw5rMF3Z%2BP32ORwmTukDKuCmzbGbcP7SmR1pvMMjhjM8GOqUBs0YGHa00JhD%2FCf5pZkxMzsRtxPnZdWh5xELq%2F93v6S%2FQQ%2Bt9FR4L78vQ1MOAqImlu6jzK12G5XgktYjr%2F2kxp%2FDvsvSMJ7r8ufROOVSy4TWJob83hjlbzsw3I7gRX6vIkn%2FadoFBkzY%2BPaYNlJmGspaalQBarIONHceKXe9Br3GTNgjwDHLLUbAZJJ%2FwfgKZP%2FIq6TZuxcTv2L0MuXHt2tZwejzt&X-Amz-Signature=a7514ba320525af9a9f2171d6dd0e3aa2ebfe0129b64a9b5babfe76183f8156d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

