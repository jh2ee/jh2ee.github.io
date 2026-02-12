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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PB64UR4%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQDHNusoQDzjjN7I2tm9YGBtMt%2FZqTz4FlKaZi9xBqsOGgIhAPPL3PEwKhtzTSmRp0mmM2L6wT5gl5dDRxFQwiO2wjhvKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwFZ4D51TXE5%2F9m7YMq3ANzsu%2BTREOvQRBvNWnOqxt%2FLjP72Ach7uIZfoeT020LgMFOCOqW%2BVhRzr9hQ0qL%2FTz5b%2FB35IIQhgdd%2FZgHywW7UAxJ5Xa1mY9AgUi9wcGQApuFSVCTowJH6Rb4GExsKYHzx0Gwwt5CH520uMRh0uRbggW8SJptbqNrIIihd93YUKse2I5C4xrjqjsCnKj6re4lYQqx9e%2F78IYzDPc6U5sDN6znCtwWCnkw5V8baI%2FZlqQ36JmgDksKuq0oIYzK1Kjfy5kudhCOi1jp1gc0X91FP2syFDMDZ24fKFYH%2F5p%2FzWpfUjjd1MohmpMfwokqGz7Ex4daF9O%2B8hfx7W394idP9%2FyWOM7YmI9jVN0xI9owpvdYt70aQ7jRTTrIydKh8ALO6q5Zvd0li4%2FRAvAA5%2Bn0XcTVDl7Xyjs%2F56lc%2FbbhoCXAkdoyj4%2FB49cYVdy8jM7P3dQcn7ugzDYot6bX0reF7rHcY73YsOndVT1gRY3t8hcXHMrWeZCcJ%2BKngtsWS6NGT%2F%2BPMtMV8hsut9WGwvXRzritEG4z8JVevzi8wBaHUJeX22J0KFaqutR3UzWB78AUR8M%2BWGdIDtIQw%2F6KKodxKHQnjBaNEtb7e2JjCTP4YtBU1ybQzZ7JFx%2F9yjDIyrXMBjqkASd8CJR4tv5%2F0kPgw0gtBtjMpCVo6swUZPVP4cjfn8MYqf4fuoK%2FZ70I%2Fa5etZpCOie6Jguen0kqGLeQA6dmW6CKGM56XNfGecPZydt2BM4DWq0F6iIOzHMV%2B%2B3sAzULVBTpJFxxOrpmzMXx1G60ZnEFeK9zO79LuE%2FfBknsSOh4Gp7qot9pU9OY30NaT8i%2FRSKd155D7zSp5Mppe9k0SfYELaMX&X-Amz-Signature=181827e0332bc219e3853ff93050bbd5875f0d65687abad548a6e8d17b623dee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PB64UR4%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQDHNusoQDzjjN7I2tm9YGBtMt%2FZqTz4FlKaZi9xBqsOGgIhAPPL3PEwKhtzTSmRp0mmM2L6wT5gl5dDRxFQwiO2wjhvKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwFZ4D51TXE5%2F9m7YMq3ANzsu%2BTREOvQRBvNWnOqxt%2FLjP72Ach7uIZfoeT020LgMFOCOqW%2BVhRzr9hQ0qL%2FTz5b%2FB35IIQhgdd%2FZgHywW7UAxJ5Xa1mY9AgUi9wcGQApuFSVCTowJH6Rb4GExsKYHzx0Gwwt5CH520uMRh0uRbggW8SJptbqNrIIihd93YUKse2I5C4xrjqjsCnKj6re4lYQqx9e%2F78IYzDPc6U5sDN6znCtwWCnkw5V8baI%2FZlqQ36JmgDksKuq0oIYzK1Kjfy5kudhCOi1jp1gc0X91FP2syFDMDZ24fKFYH%2F5p%2FzWpfUjjd1MohmpMfwokqGz7Ex4daF9O%2B8hfx7W394idP9%2FyWOM7YmI9jVN0xI9owpvdYt70aQ7jRTTrIydKh8ALO6q5Zvd0li4%2FRAvAA5%2Bn0XcTVDl7Xyjs%2F56lc%2FbbhoCXAkdoyj4%2FB49cYVdy8jM7P3dQcn7ugzDYot6bX0reF7rHcY73YsOndVT1gRY3t8hcXHMrWeZCcJ%2BKngtsWS6NGT%2F%2BPMtMV8hsut9WGwvXRzritEG4z8JVevzi8wBaHUJeX22J0KFaqutR3UzWB78AUR8M%2BWGdIDtIQw%2F6KKodxKHQnjBaNEtb7e2JjCTP4YtBU1ybQzZ7JFx%2F9yjDIyrXMBjqkASd8CJR4tv5%2F0kPgw0gtBtjMpCVo6swUZPVP4cjfn8MYqf4fuoK%2FZ70I%2Fa5etZpCOie6Jguen0kqGLeQA6dmW6CKGM56XNfGecPZydt2BM4DWq0F6iIOzHMV%2B%2B3sAzULVBTpJFxxOrpmzMXx1G60ZnEFeK9zO79LuE%2FfBknsSOh4Gp7qot9pU9OY30NaT8i%2FRSKd155D7zSp5Mppe9k0SfYELaMX&X-Amz-Signature=181827e0332bc219e3853ff93050bbd5875f0d65687abad548a6e8d17b623dee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUMSWCNQ%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQCCAgNCtM%2BbmwoUjrNVm6sTjbHAsi%2FxfxG6sq12hRxHagIhANGqADCImlZomcyLC4zBVSYakbupuqZlMvmdjb2PRAyAKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwSh25iHDv%2BuJeF6swq3AOQF%2B%2BpuVyaZHhvUFQ1kgc35fW0Pzt8U1OGImhuLEuSlOWRW0YzP%2FQ11rgmWMD1otxXW4iWqPuKjY1mSe5aNcdXgorKygnivgTQ%2FE%2F6AfNK%2FKQwkt%2FIulmBP54mrAjKzrKYNVdfz59UbORqCBi0sz7Cdp9PXG%2BnPmMtIteaOqirmZk%2BgfHLwTUVgOI%2FVrfyTX3%2Bn4CMQ%2BR5kJhhzmIvQYC8w9jnQaG1txGtIxwZ0HI0CCZP3A8icBoYWLQp8vXa%2BdwoTO7N6pbZ2mHN8WHYjKSli8vlAFIENTQ4t1dx0TKkS3V8Li%2BbP550Gj7b4XA17Mjg0EitZfHQIDkSbza5gljKJjmBf5D1jDRHn6A0C%2Bz8ZyG%2BE9ZoHsvmhvTdAerbQXkGgbJSxZ2UM9oZsgw3HHvClWo3jV4%2BmJOd59i5bVeRaD8G5croOVgSvJaUoy7W9ktU2pfHfHcn9897VRU4dZ0%2FynSZl7DFbJymWHdMKBkFT1NRpI8BamCQ3gtUVjmFehJL%2FQjeZMHgZXwVn1pu%2FAGr42kQpdMpKEwEhi9D8ygEVAlDnxqWNzQJ9rEoI9nP6FDIIgZgjytEOA9LRzjdlBUqxm6iHI21i3943YEwR7voWFm1dVqdg%2BbsLXnjuDDuyrXMBjqkAQQ4U8lT5M9q0HwMjSyhDJ5id43ISiToNCzJGlQcuSrVv3rcmd1C93xSXL8XqmO7klSBM9m5%2FXLSP3C7Jf%2BHgj4LTf8bkU9zvpatIPYDE8m7%2FvDyDsO5WrCzsBn7xb0vBIK1b6%2BDxHpuw55oR39KmGFvrzSDwCPlaCXmt3oUM51mA9kGXF6mgAwItI%2BcjWvDm1ADcD%2FBOE9Tu58TC3lVxBWMdGpf&X-Amz-Signature=13940cd824130daf164eaf19c73435a7b0e5508c015cde5938ed91618806d7ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWSHLLCU%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIEqeB8xN%2FuxElRCLRore4vlc7vP3YSki16l3NecWlQ06AiEAySWezIEk3PF1UHi2hp2NkhcyVruC1ASVpxQjJkf13l4qiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJVKbcGi0Qgmu2V0%2FCrcA11fIKeFgjkn0ELtREKM0FYb%2B7V17BFggHWVJxke97%2FimuFaCdMizmq1oBiZaiRCybxOUFqxWiNP%2B4fR7v80xRj9G0DSDEH3D9FpQ4Weypm8H9ixS%2BCx38Pt8MsZ8OUru7rivB8omJjDuOkT%2FHoAfIXhYeYO5fwjibH0KHsbOi3rM0Q7xx5a%2BjOdkIMVJF1gl5qB1HmNBKl%2BRNC6sWFlEAmXkxarI2HJ92kwhMz9qYQU1SKEYg1BF%2B8ywxEN6ChEqEJBtjLDjUj27tLMeneZyx34O6L75HfXii5DcJ8%2F%2B8U0vAIYG3fCyfPnboVotBcBBvrpBLwe0jkB9BAT3z%2FAtqiLnfE3LL7zTdb8YE0xj8fjeXlJrCrsTM7Jes6SBE8TLoZmsv8zy52lS0foDSb4ZMwrzHv%2BAZXxiNTGe%2FhAfnk80JHfICI1XnHowaVzOiSEKTiiIMzlQGz1f%2FJSF1NYk4rr1cUZCcRfPGMe99r0131PNFjWcBCZup57zqPvu7YR2daJh2MKvOxxGs17uqp42GJaS%2FSCE%2F8%2BdA1nSNShyukTD0vA%2FxLf92kgVchE6J8gkdnMMZoGCfIxFoe7BJbeeh2ONfVnx5GIIC6VziFrLBkdbWeojzEuG6c8el0LMI%2FKtcwGOqUBlH7LBlFOV%2BMOB%2FwhPY1CeapcTgalcvWwm1qQ7nWtfU7h%2FnepGt3YOqWqzlkInAUozk6KWe3R1VtmTg4ysI2tVdmwh0CS%2FO26sqeVsP1nul388IhaPrziVkIosU5tTAdDrYuQYHKjnLv7P7JqQX6DEQB96AMcuEeqy91DSsuhGygmBgaO8gPPeKkind9oj1%2B0vUmuGnyDYF%2FXShiipvdIMnC4bL42&X-Amz-Signature=6f616e1ed7d981b06437401167db3777eb5ccd2256ebfc44370218880c8c8215&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWSHLLCU%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIEqeB8xN%2FuxElRCLRore4vlc7vP3YSki16l3NecWlQ06AiEAySWezIEk3PF1UHi2hp2NkhcyVruC1ASVpxQjJkf13l4qiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJVKbcGi0Qgmu2V0%2FCrcA11fIKeFgjkn0ELtREKM0FYb%2B7V17BFggHWVJxke97%2FimuFaCdMizmq1oBiZaiRCybxOUFqxWiNP%2B4fR7v80xRj9G0DSDEH3D9FpQ4Weypm8H9ixS%2BCx38Pt8MsZ8OUru7rivB8omJjDuOkT%2FHoAfIXhYeYO5fwjibH0KHsbOi3rM0Q7xx5a%2BjOdkIMVJF1gl5qB1HmNBKl%2BRNC6sWFlEAmXkxarI2HJ92kwhMz9qYQU1SKEYg1BF%2B8ywxEN6ChEqEJBtjLDjUj27tLMeneZyx34O6L75HfXii5DcJ8%2F%2B8U0vAIYG3fCyfPnboVotBcBBvrpBLwe0jkB9BAT3z%2FAtqiLnfE3LL7zTdb8YE0xj8fjeXlJrCrsTM7Jes6SBE8TLoZmsv8zy52lS0foDSb4ZMwrzHv%2BAZXxiNTGe%2FhAfnk80JHfICI1XnHowaVzOiSEKTiiIMzlQGz1f%2FJSF1NYk4rr1cUZCcRfPGMe99r0131PNFjWcBCZup57zqPvu7YR2daJh2MKvOxxGs17uqp42GJaS%2FSCE%2F8%2BdA1nSNShyukTD0vA%2FxLf92kgVchE6J8gkdnMMZoGCfIxFoe7BJbeeh2ONfVnx5GIIC6VziFrLBkdbWeojzEuG6c8el0LMI%2FKtcwGOqUBlH7LBlFOV%2BMOB%2FwhPY1CeapcTgalcvWwm1qQ7nWtfU7h%2FnepGt3YOqWqzlkInAUozk6KWe3R1VtmTg4ysI2tVdmwh0CS%2FO26sqeVsP1nul388IhaPrziVkIosU5tTAdDrYuQYHKjnLv7P7JqQX6DEQB96AMcuEeqy91DSsuhGygmBgaO8gPPeKkind9oj1%2B0vUmuGnyDYF%2FXShiipvdIMnC4bL42&X-Amz-Signature=83fd5d66cf4604458a1f1e6afa5678ec2382895cdb3538df2e60de92a3d7cc32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUXXCTIS%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQCx4VCEX3R0I8vRJvWvh8FNtq8scthWR%2FJ6czhvnGNjzgIhANw%2FiD7RpmcYxMQE2XaDSh1KFvfoJ7cFG9vfLwqnPHIAKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2B6eh8o4%2B7nx92K4oq3ANQ667hcZCX0j%2BVcevZZKrjEQ5FIQ80QC9EcMUv2QtdFIKs9HLnyaD1f%2Fj80kgjLN%2FtLCzXxLxDLapErYY5mpArSqCbj99m1bChGczJkFlyGRNq2%2BbJypDCG%2Bc5lZqWMviBjzqq3bI1%2Fkp3NrSKlX9llMyVurhBVaJcxE58eUgT7o88V0CNljXtPE3dQ37zdRbXcqWk9Fiewj0uTDCwQsmaP%2F8p%2FKbNua3JoUGY8WpGdjVlDoVQpq9S%2B2CdETvpzS59hl%2B14Of3WBY0f5%2FtqtNcGM31wCmmBDSMTj7hvkWrclGjZdZTKvB06al3qlzdn%2FFfZ6LfNdij12tvziL02AkJXIhU1pgg4HFH4n0M0L7zqHp3JPQdLT8PqbDbuQ%2BLN1CEpc5inBSfERYpMODE67VZMhsFJ7ls9IP9jxXWr2Sr%2FyD5PVix4AsvOekUfYEvIzHoGYHNzsh9PI%2FR%2FuUB2jLJJ0esoUd7tVXRwRMw0oeZqrKFor26FLq3j77ff0mL70yI5hHgETNYMf6sRZam72t%2F%2FHZOZ%2BJm0ZN7iIj14tT3luAsqNlGpuXKFnxZTp4Jo%2BKy0Jv3VUf95Mk08H4om%2FeCn7JWSEXAP0DIJMh5XhOyLT3GqDwrVopNB2e9FTCfyrXMBjqkAcVEHu%2FoeiLM0TM%2FtMX1LVsEiRL01eUdcFOmOrJiqY1%2FioCSiC5z7ExgWiafLYo0EICdxtBAuZxpw7O8fU9DiYRlEsOBF%2BcsOGVtVPZ%2BbOigQUjQBUlSB0iV%2FGnXCq5wS7Ssb1TcWSXMAUO0%2B2xddv8l%2F%2FpGDrLbUcqwEpoXwOebcUYfTvjlZhU0pVBqtwv%2BfaRFTQh9BenQJYDskRmplecjK70P&X-Amz-Signature=fcfb947d5da6467f9b8c6536f24492cd905cbfa95234afdc1f7320723f56bc19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666W3BCUDG%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQCf%2FhaIpx6zmq0sazWvIuo0k%2F2V0vx779KMurZznbUybgIhAJ%2BmXSIhnmEevqJptpHHPb2ZZFI1LS2FlelKt9zg3EWyKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw22XhLfhb7AX%2BgH5oq3AM88Ac2uoYdMMotXudBjlD78CQ6iQKrBtmpgAttAGulzRakeq6p8lLx5884B8%2BwPm%2F03lhJ0VHc9x9XzmawS75JiUN8RKYd23de8nlZ3JSud69%2BS1lyzYbSeC9vE%2FTQb2HpHjYMp8S7rSbRNW1thmzfKFF1WTKmTzBGTS8tQkXoCNngNCrFYdbsSOOaPvonXK7%2F0HowHYrc%2Buoq5EBdgcO%2BVp6%2B02gUGn%2FLxHbwazpY7T6WeEgzvBiYJ1jyr%2FJB1QejmTmpqjREN8rmHFCaxkFy%2FzSBSoWR7RRy8RHBtnEf6y%2FR7sl%2BKmLNpWit28NJtp8FroUwjeSHJw928wge9T4s9N05JL%2FvEHia%2FEXQn6lJt%2FLtkaXINkDdGCoxNF9vjNjwVu6A%2B3wyB1tqpMHbFdQzWTeuiOm4I9s60d%2FODUHPZVowg4l34oKuSb5%2F34UVnAOvKwGQUx8uIXf8FJvA2kG1pvm63kC5bdFke0xBO0k8lAOD441cJkLHLSzPvxisLrHUsx1Ldx7HtjWOPQjfvSzgCez8Fdl7Kat%2BMDoDUD187vZ1FX1WNtNdDXnwT8rD3dkZgaSSeG0lJBAFg9uyYlorq4F2byeaUhjV4eqyfi0IAoEqSmR4aLX5OQ1%2BrzDlyrXMBjqkAXgyk4H%2F9bslxSymxdIJwldqSDj%2FbgtSx4lDa2qJvACmpki1V9woqf36LY3K5YY7qKwAoATXt40Q6sHQFQdMPj%2BAJ9%2BsUDzVFrhXGInKoXhffz3w0T%2Fa6vHzdfZh%2BMk5q2ZSX1VVNbqIimJXP4gyqcbuiYJxSWulrC2ebZkNwK22Hy%2Fv%2B2C8fEcnBLlt0PfMr0GCEbOAwhajgwIwZ7HfNmmQYK77&X-Amz-Signature=7024ad804a6d0ed7bdb93f5b67c7a3c36b0fd0391203ae0f86ade207ab3f6812&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667MH3FV5%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIBb3aqiYphINzO1tWZs3CrAO0nXipttwr%2FlegEdvwbBtAiEA9LcEGdqfwDReferSutUtcpvsrMD7t7uV6FRBu7QWb7UqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM5QQgSZKmWeka8YiircA6tGqGFyJrFIILXikrsPC1GpwTLT%2Bhr1btoa%2BKy4avtPdcq7g9aGlvWp%2Fpk2wqv%2BRVFt4pfKLNd9wrkuvwT7rMO3wF5NCkcLO5adpb8a4YLtFMkDLNUYC58JnhFE3o8swqJuWdXnEUL2Z2RFlDwyNm7rz8zLynVbVKNASSICyk4etSts4i6CxQYI%2FHtBuzoXtGrI3f3nZBRM%2FzBWTqH97tBmFBjRmhiYRY0uXgMXoTSfOYb9uwlATTz03eOz99khM%2BGC4KEDUNifm21%2BijaxyyOBbSXGpy5Evbe23nc2AjzR0oJUBcGxVG6U724jAf9k17NQehjsKNCphCZUdjnLa4Z%2B62NL%2F%2FidjvuudooedrsPt4feN75J9brEytDAP4wUHsut6t5KIoTkv5zjot6pClGEnLMehuVtaa7iViRE1V7LljbnlWA9%2FzTPTilfoyiBV7RIVtruR7odDDMjEebkIgxzTJA91mj6ukm6O1rPPKN0vysSK7AV%2F9EnwThb8lHBTFPxR96v5WATPOna8XXuYakDobJ45CcQpg2w81jm2VdWyvpuwlNRV8uCAh16ZTZ2NZrJQrecxa7WQCYV6kcHGcQH%2BDyb5K%2BjERtupF846M6TA7x%2Be1no7SPK2hi5MInLtcwGOqUBMaqQZME81CdlGLpS8Lzx4RpVLMedVBdEAy3H8tZfJGJ7dqkeheZlPua0sYVyKLDdZYmokK0ck%2FjK8GjdxZWpw8AaondBgRkwC34rbdHn8P9XX%2F4h51xIuBJDvtl6Ast03q6VPzl%2FGPspeC%2FYu0vv6knwzmt2WOq4vdoV0pAaDmsTDbpNhcaARIypEsFz6IWg3YjWsEY72nW4xfeNfljBccUOk%2FnV&X-Amz-Signature=40616fd1df1fb8c9bdb1d352061842114e98922b23ce0cde280962522390a0d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZOHIWHK%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQC%2FcU3ZDBnfXr32wwATTTT8wz8yvoeQ60QjEePyzNyTqAIhAIHUlJiUen%2B766AFkfLpsu2SF30S8Fk2uqK1IEshvzc4KogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyRjHmrszfsW1db8bgq3AMKwhjNsNK4FFTHZZz3xTYabsknQHsO8kUMs7QVrRyLq0LhDHsBApy%2BU4Es7JUV6qMjDB4II2LYjXI0y8V8bHYdGIpGQidf%2FOuLi71PZr1bGQXaVyoyEMd2Iu69Wx0RPoinQ7gSl4Un4kHHRy1ezyFiIjX4fLghcyRXu8lEBHs5PuaoaPZ7pAMD5XtJ4%2BwhKRI41K1jo7pITo6mRuNXBBdGFyPapPuC%2FawAmkO%2FmxBkVWAvP%2FqNdLLTSJl6sEIUw0oo%2BnQDAa%2BAks4TKjbcVCgdLFU8fuYaear%2Feip99sxmGa9tfXCDeE2%2FzdOvtYCId620MluL5MTDIl3x666yOIK%2Bu%2FgvbeAlnkuRn%2FrGNiWrclsD2I1KQmTNpt7t01VruLQ4MO2uTGGUaqdO%2FVz9NUtFyHRnUsG5PowQ7%2FCvUdNm3HPFF3HNxs%2BAOEXvX2nw%2BcOpH0i2WdEkraIwqpOPks6Fw3Eauw1A3rIgTaQaxOfML3sV9uHkJkdHwqY%2F3c4NwW5jC%2F%2BfGKCOJFVOkRhkoCNrFl7AeyBQb92bxdLN6g3ACLjxPIvAL1w7l2rp2qBcPs55xTKN5f3%2Bo45X19cybvrOd6ShZcfri%2BcRLcden%2Bf2KXVXOLHND9DEQc9K1TCvy7XMBjqkAXb%2BqsPR%2B2ObXOolKajYKDdC1a3Oju3YcE4r95GcMtlk0sha7ra99%2F6dDUR6dk7wDE5sNDjIreGaKpsrIQW8kpUTa4L5LYZWtm7bEDggM6ur7GQOsTcsl6vzZoE5%2BHBqM7oo8dVuoWW8WwQcvs5q%2FK9rVqN%2FHXuymKsWWnug7YWRRMvPpVAwf9mqbfxgyNLGy6Q0nF6QfuhcxvWEOUHD2EFJySNm&X-Amz-Signature=f924d1f0bd6ed7f792ea6d0d72ac92c78b0649587491b7195b165f3529517c1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZOHIWHK%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQC%2FcU3ZDBnfXr32wwATTTT8wz8yvoeQ60QjEePyzNyTqAIhAIHUlJiUen%2B766AFkfLpsu2SF30S8Fk2uqK1IEshvzc4KogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyRjHmrszfsW1db8bgq3AMKwhjNsNK4FFTHZZz3xTYabsknQHsO8kUMs7QVrRyLq0LhDHsBApy%2BU4Es7JUV6qMjDB4II2LYjXI0y8V8bHYdGIpGQidf%2FOuLi71PZr1bGQXaVyoyEMd2Iu69Wx0RPoinQ7gSl4Un4kHHRy1ezyFiIjX4fLghcyRXu8lEBHs5PuaoaPZ7pAMD5XtJ4%2BwhKRI41K1jo7pITo6mRuNXBBdGFyPapPuC%2FawAmkO%2FmxBkVWAvP%2FqNdLLTSJl6sEIUw0oo%2BnQDAa%2BAks4TKjbcVCgdLFU8fuYaear%2Feip99sxmGa9tfXCDeE2%2FzdOvtYCId620MluL5MTDIl3x666yOIK%2Bu%2FgvbeAlnkuRn%2FrGNiWrclsD2I1KQmTNpt7t01VruLQ4MO2uTGGUaqdO%2FVz9NUtFyHRnUsG5PowQ7%2FCvUdNm3HPFF3HNxs%2BAOEXvX2nw%2BcOpH0i2WdEkraIwqpOPks6Fw3Eauw1A3rIgTaQaxOfML3sV9uHkJkdHwqY%2F3c4NwW5jC%2F%2BfGKCOJFVOkRhkoCNrFl7AeyBQb92bxdLN6g3ACLjxPIvAL1w7l2rp2qBcPs55xTKN5f3%2Bo45X19cybvrOd6ShZcfri%2BcRLcden%2Bf2KXVXOLHND9DEQc9K1TCvy7XMBjqkAXb%2BqsPR%2B2ObXOolKajYKDdC1a3Oju3YcE4r95GcMtlk0sha7ra99%2F6dDUR6dk7wDE5sNDjIreGaKpsrIQW8kpUTa4L5LYZWtm7bEDggM6ur7GQOsTcsl6vzZoE5%2BHBqM7oo8dVuoWW8WwQcvs5q%2FK9rVqN%2FHXuymKsWWnug7YWRRMvPpVAwf9mqbfxgyNLGy6Q0nF6QfuhcxvWEOUHD2EFJySNm&X-Amz-Signature=301769d4d3b06cc25927f9a90ce090df897274170164238b7ab5b10d3f55d2a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672INDRT3%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQDIjYyv5nV1dNiUqeK%2FuEw3mmVFoANSBIZ1AERW9WvgUgIhAIkRIcOKAkmD4p0R6iT8joBQp89%2BzYHXF1U1BEyQjZG5KogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxfiJckSSFJb70AtQkq3AO1rRr%2BoM3Ei5DnJcqufeYARfWijjHyNCU8%2FR01H825KKNJce%2F44kbfx8jwqhU1ClrVeUl9B15Wi0a9A1B%2BL%2FOrqOuvJQWZP3bP6nKFaXA%2BI8HyLFTTejMfnjC%2BxcLYQKvctBCLSjXJbTs3Vutfl84DPyiNEUf46hP7RERftnMuWxeKFscTUD48mAY%2FVuJmShnyjOlzjlpL2xdfK6y5ieZl%2Fi4au96NU624TnMttnBUCvPPWaWGH%2FxI3YNXiQgXZtLkpO3YE8vQRJvCDe938Xutsw04RPWTwKkIh0sBrSwAk27A6PbaPdfy7Ly7OwR387LXADlzwUzn6C4%2BV%2F7UHDKl3iyqe%2BQTHncvuv6myfhDe%2BXsaz2gGtvOht%2FOjI51pB3IUojLOoT2n9aVpAhq%2FIcR3tkJj6DEh8bxnhlTob26UnEJAzE2XhjIn%2BidFyY2zNaTlRev8lZ2AUb55EXU0Z7FICA%2FHmkljJCbceZhQvym12pj671%2B9Ud46n%2Fl7qFiB%2Fl0j2PPceX87ohx8yfohE3o83N4q%2FAWWevnvf3lppi69AGcQ2tRa4Z107Cl4fVoL%2Bwk0KJMMy2uodxikunszBf6JBWyiG6O9663a5CD3KfgdHDq%2F19%2F1jlXhXaeAjCsyrXMBjqkAWIultMas5U8PuKq3wMEILJ24OHOK3Vy2OJKF0rgyb7%2B1HLrSsjndv5HtpBXfgqaX7c%2B0EYwxXejbn5JZHYFapaK3QO2QxvpyYGjtIzmDBgdzfaRlzERls4OfYCjS9Rt3MCp7HYROy8XYyg%2B198I89VWqVVbR3K5xX2fakiQbggVhYJ9uUYJczBeB%2BdpYovHKg%2FRIWeXg9J0q7qX2iPE2gm3RH9h&X-Amz-Signature=7be77e3077529ad2f1c6e29d81d1476e3d88d5c34558aa1841a985c3407288c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUHPGN36%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQC17Ny8rXrHoruHcazJxne9OGwtJyjQJY0mHFqCpy7bmAIhAJqUi6Btc%2FUXtc78Iwg1gnGecypDWh6l%2BXpZjiBl2IX%2FKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxF3gikmFdmrYtpi2Iq3APetFo335wGu45X8Rt43OhI1%2BsPpt63Ok%2FG11rmwuIuw3xGI8tH1q8o6PB0J6NJb9l54GwWcV5lTpd4uOl3GHLR1MJtRKvT1mi8lYvMnb%2F6vfe%2BIL2Dtfwybylpos%2FP3LNLvrabQm%2FpbadVO4eUUzdaivt3i8g7d8Eq0FrFqP%2B1tbuqkgV0EB9qaO4S%2FPRqfomhPR8GOQLzUSFjYTwJ6bnlEoG0bClMbAz5gDF6ruqede6sxFrsuUjnlYm9hywpSnP8AC22DwV9oPgDJm34taK03aPC3HTRPeBDE9Xuix7hY0mVKKD3xt3wlVInM88Gj7NOUrf8FshhqglsE9jqWOBDKCtSbM%2Foa1OkxqTzvuF6%2BJpEMWqhqpnTANlvrYVSD5K%2Bqjp3o7UzW7Fft9epDu21wqC5xABLZvBHo1ctKdIKdQB8lnCZQvnZjfZ2oukruH7NyuyKmi%2BXxZwqi6ep24P%2Bpc%2FOHFV%2Fhg5L%2F5Geo1K1kodwbnqZNSs9trEcLF6QMn8oGqqU6CRdVdK7w71r%2FRBVU2G6r7MFan1o5EPdpCcSY8eNIKrphvq3A95wb%2BxYNVAu8le4z2exSIq0orAGSHbcnKsY9UtL6AtIfcC%2F%2FSQgdA4M6Fud9mSyajS%2FYzC%2By7XMBjqkAbmMCLDPfIuFb2MGNmw2S0kH4YwLOqvtuQOvl%2FMpZb5mBZ8m6TZixpuyvFl5dC9XxxzhYC8e8kyTz%2BgnIPLLWWWZsCcyEZ%2FOTfhEln9R7GF%2F9reDNKbCdZGXagNnPSQR0LKbgJbiYWVqJS3Sz8YyvxgfAXsHi676P%2F8O4IofufK%2B5VaAjPHY6JxyUOKz1MTSOr5rnIoAxiTS%2BI%2FXinLBmZsjAwFV&X-Amz-Signature=aab62ad6a8dadbe31b9106e57eddc43c6fd0aa55f170559f75777b1c5f4f8bd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUHPGN36%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQC17Ny8rXrHoruHcazJxne9OGwtJyjQJY0mHFqCpy7bmAIhAJqUi6Btc%2FUXtc78Iwg1gnGecypDWh6l%2BXpZjiBl2IX%2FKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxF3gikmFdmrYtpi2Iq3APetFo335wGu45X8Rt43OhI1%2BsPpt63Ok%2FG11rmwuIuw3xGI8tH1q8o6PB0J6NJb9l54GwWcV5lTpd4uOl3GHLR1MJtRKvT1mi8lYvMnb%2F6vfe%2BIL2Dtfwybylpos%2FP3LNLvrabQm%2FpbadVO4eUUzdaivt3i8g7d8Eq0FrFqP%2B1tbuqkgV0EB9qaO4S%2FPRqfomhPR8GOQLzUSFjYTwJ6bnlEoG0bClMbAz5gDF6ruqede6sxFrsuUjnlYm9hywpSnP8AC22DwV9oPgDJm34taK03aPC3HTRPeBDE9Xuix7hY0mVKKD3xt3wlVInM88Gj7NOUrf8FshhqglsE9jqWOBDKCtSbM%2Foa1OkxqTzvuF6%2BJpEMWqhqpnTANlvrYVSD5K%2Bqjp3o7UzW7Fft9epDu21wqC5xABLZvBHo1ctKdIKdQB8lnCZQvnZjfZ2oukruH7NyuyKmi%2BXxZwqi6ep24P%2Bpc%2FOHFV%2Fhg5L%2F5Geo1K1kodwbnqZNSs9trEcLF6QMn8oGqqU6CRdVdK7w71r%2FRBVU2G6r7MFan1o5EPdpCcSY8eNIKrphvq3A95wb%2BxYNVAu8le4z2exSIq0orAGSHbcnKsY9UtL6AtIfcC%2F%2FSQgdA4M6Fud9mSyajS%2FYzC%2By7XMBjqkAbmMCLDPfIuFb2MGNmw2S0kH4YwLOqvtuQOvl%2FMpZb5mBZ8m6TZixpuyvFl5dC9XxxzhYC8e8kyTz%2BgnIPLLWWWZsCcyEZ%2FOTfhEln9R7GF%2F9reDNKbCdZGXagNnPSQR0LKbgJbiYWVqJS3Sz8YyvxgfAXsHi676P%2F8O4IofufK%2B5VaAjPHY6JxyUOKz1MTSOr5rnIoAxiTS%2BI%2FXinLBmZsjAwFV&X-Amz-Signature=aab62ad6a8dadbe31b9106e57eddc43c6fd0aa55f170559f75777b1c5f4f8bd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOAE72FF%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T064458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQDxtv48xIF%2Fd%2FPX6Zpw87b%2Fq4BJIi%2BLOh8RBwZP4c7H7wIgK99u5bR3thnNJ5gs%2F4Og7FyDgs2163fUY4GxQt%2FJWPIqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD6a1F81MItX%2BBZf4CrcA495qHNbyRB29tej%2BEuwuIE3V%2FvZZ4Km5zpakZJ04d4ReoKKMfg7YrZlQSyBu7y%2BJ3oBpXCfxPXy6zMdnkMogOE4%2FaLPh4zwZAqV33aomaYKXaeYB%2Bc6JE5%2FAuLTaQXLe5HRk38aH9fUikpTkvElOlrEiHugehd4irCahytGvCHSnOPx6P1tK9jvUW3ywnJi%2F3zuAd7PXj0VF6jj5PVi3I1IKT%2Ft%2Bbfgny65alljoUO4cIqVYiJASIoU9PTtL6bdmOsxu%2FmYc9bLBshQPneKUw1Y3JhqVKKcHdSm1mIl6rPzyiNNtNxLxRNIYMB%2BviyIXYecRmnjo8BEk3KO2hLDlaXTekJ8RYr%2FRiIC15otB6qr6XtnbGAOZ1kej%2BA5LoBUVBSpVeQ09%2FnfGOwWqmzjwxgFYV%2BSUIyUhKoj3UJLyDK3x29kDc4UfZ3je6yeMl4%2BiDQEOZ4fWd9WDTgiOutCs1dln4FT6eix5QeR0JNji4WJ94FHPjajHEaMZqc1oAMYUjt%2BI9XV5Rio2mEPPVWn%2BkgOh0cbHFQcoxjb1q0YSKrob8aZbeRywLRhKXYPcWv1btX0qFQ9EzMiAxEmimXjwsmGvWYUAxIQTm4GXjsV%2FyyOQzC3WR0UxP6%2FONB5MLnKtcwGOqUBy5ruq9q15o9SIHI7ccsG8uREg%2BtqGu4d0xZFzdaeOfbNAtD%2BmQBPBdNl0k7ig%2B1S5L%2F0nEFl5Tpp5UUzYzY9NcqAIbXARJJ7V03Sj9ULIJdLTucBHE4rz3F34%2FmvI%2BZYr3HCObbB350chXuLFMKAWfKhUAv0jsQJMczhYcuQflMex8%2B4yf%2F0wSWdnXhn28UZY6lXKKfDjDzH43eEwEhmapN%2BK%2BI0&X-Amz-Signature=f32519bd7248929365f24189bbcb0b680e5ef266849da31aed2e0a8ab8daefad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

