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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVLTX6MX%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC1GFPWJ2WQi20lfuZtalCTC6iDSCzAs9SKlrGONYVPDQIgdFGp%2BIaeeHHV7%2BL%2BoWoV2eykuIkEposNVCX1AkXNX64qiAQIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEuCnOet3qzuaqdqayrcA6RXGWhB7NXSXgTi2jAsN1%2FXyg%2FH3Qyds3q9%2BjlIEIJA%2F%2BR1qQKvjmd9Vk5SSGeACYKuuhljv16ltZOH0FJnlL9IwZ4gBV3Z6x8Mx%2BFxVLY6SX0hCXy9%2FtUQer4SfZESbnQ%2FNpFBeM%2BE%2B1gDBCKdFIE77SughSf0lVzVnPx7o9QdBplPBTpZx0BbVo2TbUR1NoNAfm2ABkwnGO9Cu3ESD70DATMtAODwHqrTalFx8VSk3lonrmJnxJ8tp9TpCWBhLzQc%2BYuOQQogfeuImjr%2BmegeXReFezBAO69DxPq56vMnzOJuyAyeLGiyhK3%2FcE834f2V58iMjKCemILG30m%2BZnytPVRVyF5QLkrKdJ6gGwe8GZgVsnbNv%2BHMIbljhqcyh6VZEBV9pA1tSRuZ1PuBfcyQ%2BH8LmTjzaniBc6kKIOJU3SJvjyUASIuMN%2BNz45zIH6Qp%2F%2B%2BNZM33FR0ONnpCQfdxX0Qi5n0Q80jUgTk8uN%2F7PR93KAnscF75llO7PURbOyEbBmcw%2B0%2FoNKM9nOeYd87q7gfdlmiZPHpk16Wq1euNbfzOWlt1SBzrzc0p1apX1UpbEW35qe1H96%2FkBObGfHCYo7Oqddi%2Fk4RfJtvlBe%2Bjc15JjizbCgacvz9pMN3hk84GOqUBsF677O4c1WemdxBcfgmBDpJ7VKdhV3kp7O27YithrInNw3JhzTOmgNSXR6nsDw1Qh4pa2ADEf73%2BmWuO3aZAov3gJ2I7M9IRmEeO0wmf5caB7fXIpwfRB6bWnYz6Vo5fgwo%2F0Yb%2BaNocO%2FqQbnZb1ubRSlvW0jUm26TJT3%2BvRo8s5b0aio4XMsHt7nGhKEMeQsSJv1XrqPdpuyYqd03%2F31IlryZ3&X-Amz-Signature=c4d011e413bde382cfa2a1ce48e590ce14e10fc00020baf844dfacbee534b17d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVLTX6MX%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC1GFPWJ2WQi20lfuZtalCTC6iDSCzAs9SKlrGONYVPDQIgdFGp%2BIaeeHHV7%2BL%2BoWoV2eykuIkEposNVCX1AkXNX64qiAQIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEuCnOet3qzuaqdqayrcA6RXGWhB7NXSXgTi2jAsN1%2FXyg%2FH3Qyds3q9%2BjlIEIJA%2F%2BR1qQKvjmd9Vk5SSGeACYKuuhljv16ltZOH0FJnlL9IwZ4gBV3Z6x8Mx%2BFxVLY6SX0hCXy9%2FtUQer4SfZESbnQ%2FNpFBeM%2BE%2B1gDBCKdFIE77SughSf0lVzVnPx7o9QdBplPBTpZx0BbVo2TbUR1NoNAfm2ABkwnGO9Cu3ESD70DATMtAODwHqrTalFx8VSk3lonrmJnxJ8tp9TpCWBhLzQc%2BYuOQQogfeuImjr%2BmegeXReFezBAO69DxPq56vMnzOJuyAyeLGiyhK3%2FcE834f2V58iMjKCemILG30m%2BZnytPVRVyF5QLkrKdJ6gGwe8GZgVsnbNv%2BHMIbljhqcyh6VZEBV9pA1tSRuZ1PuBfcyQ%2BH8LmTjzaniBc6kKIOJU3SJvjyUASIuMN%2BNz45zIH6Qp%2F%2B%2BNZM33FR0ONnpCQfdxX0Qi5n0Q80jUgTk8uN%2F7PR93KAnscF75llO7PURbOyEbBmcw%2B0%2FoNKM9nOeYd87q7gfdlmiZPHpk16Wq1euNbfzOWlt1SBzrzc0p1apX1UpbEW35qe1H96%2FkBObGfHCYo7Oqddi%2Fk4RfJtvlBe%2Bjc15JjizbCgacvz9pMN3hk84GOqUBsF677O4c1WemdxBcfgmBDpJ7VKdhV3kp7O27YithrInNw3JhzTOmgNSXR6nsDw1Qh4pa2ADEf73%2BmWuO3aZAov3gJ2I7M9IRmEeO0wmf5caB7fXIpwfRB6bWnYz6Vo5fgwo%2F0Yb%2BaNocO%2FqQbnZb1ubRSlvW0jUm26TJT3%2BvRo8s5b0aio4XMsHt7nGhKEMeQsSJv1XrqPdpuyYqd03%2F31IlryZ3&X-Amz-Signature=c4d011e413bde382cfa2a1ce48e590ce14e10fc00020baf844dfacbee534b17d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFBPCLEJ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAPBNDDis0zZn1lbw6WsTxBSa%2BuTWtI8rnAqgVNHJeB4AiEA%2FJoZXBViH5fvCfsfIbkqMvFthRDLoZnE31VUxmg60F0qiAQIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDbQsPNBkT8iZjii4SrcA0IKC%2Bn7jF6WCYxWZP2u0NnniA9yABnCFLLZ%2F0KqGCtT61g7%2Bagkd5GqB3k9iW39eId%2FsNopx55P2qLnEz6JgQVFxZuO9FN9gMwfBl4IPx8JrzZu1mO%2B5lyqknWPRP%2F3GTmBOui9UOwKRhU0%2BE6NjHPILokObsJ5J4uJHRd0nJjxWSri%2FnscItTun9Xh2UivyHh00JB%2BdadBV%2B%2Bo%2B%2BXC8cZzitJ%2FhXtmLNjewFmb0jNVFroIEI79Emm8nazzVqfkQCpBRloiyFS%2Fa9BX9cD%2Bt1Uc09%2FisvHN2SSfHXFfmHbn0NqX%2BScMP924aKFV%2BgIo%2F9d0xSwQTieXFn5TN2OceN5JxqiMDZ3z7hhwNPDwmR7WTh9Zp39xLIcyoecbRjDhbaY1OeZ9d77uS07a%2B9L6fg4G55zH5BWXAU5SBH4IE5E9OyV5%2B%2FY1h2JkoTkt4K1jA7cAfuoLfgJRaBowfSIv9tUDO4tpEKgiezBxvBI8fKYDGX0wcUZwDV70yIBI7H79DAcoCY3ypRx%2Fx9n0zmVuhup2yJO3RRTjX3sh0Nny0u%2BURK%2FxJauYvXmdhjx55XgwQ6MU7cqc5%2FJ9XCGCB%2FdF9z6UwucUs%2B1RvEsxqaLFiYlCMnyTSt1%2BHBE6V4mFMI7ik84GOqUBzl8836TikapeWdc3veixBO1vqMIfWdE1jfVnVFRpNKUIFLA5JP9rCZm4UGbd7LmHaUv%2F1mIbIU2jv9lsSLHgLJ84eqrU%2BafFWm2KKF%2Bxt5sCf%2FpiAZPPHE2bsp8lm1SBNxV5Hlo1Bo8kvZvqTPY6TL03xth2S04cu24l%2FzjeTiYmAmHizzXjXbWbgsp5VKHjWfP4Ex91NbhDG36e7t9EUXJKR%2FR0&X-Amz-Signature=784ae6abd5df49b0a9573cfb3682593f015ef37f245d40d5d0b9a5b40722d215&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IJL5GH5%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBn9m0548dFhhLEr164DiKbE4KmR%2FyJp9xSDeHiRw9%2BdAiBQaLsjEqxhkq3IgTkFWlx0tTdu%2FvJv%2FkHOxm0ArZ1rXiqIBAjC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMh6ex57kq7pM5BbLkKtwDZzzkCqRz7t3j5XxzoVmbUQAo4Oe5FZusmA3xp5NhLAg7flx5lfe99eFMU43TE685yqTZwf8AI%2BcfxnyivA%2BTAbOKFrcnUcxMorT0sHOrHU52E5kGan%2B47wT70Jq2Avg0ceNAIDMLwYOayDjmg3BQIPn2Yl%2FSJSrovSPM5s4Jrv4bmpN%2BzWOTsxRwLQF8E4Z35JwV2Vxz2XvpyK4YhB15%2BJ6j9N8lCWAQNhYLu9ZTqEWoyxsNCitIzip7ZCh1t9TWLJ0oN4APuQKsRHAb07GsPfryURmZ5hms9sC7060MM8FmSOArCt%2F%2F2hqkC4jsmd3zhFluvQXgVFr7SgjanoAydRCe00RIopZGIU%2FcR1f5dMNi1Dbxv84Diwt1P93x%2F0H08tkolag%2FUKQpX6UTSGBHo7dvmgcBwSKpXXxNIrKAZx9xjGrCgWKWpZ%2BJ5rGQ7vfJ4A7yD7faZJInYzP2DPQXeuPqUu3iR7jPLh99yxZ0tgDzKRA6KR7kc9N6l9MVtsbdE9uZfhNchjNXNYR5qcjU1HrSuByoYQvCjdy7i%2BMnux384xDZAbG29I4M3n1MDVANb5NySH92IhFu4yUD0C%2FofzzM0c7mnJp1PUuaXAbu1Ij6U6BKe34JS%2BSN11cw0eKTzgY6pgEzc6%2FZABDX%2FUmtRUkeD3ILaoNkkab0JO%2BXMiZutlKNS%2FunGi6vzcnNavYEzcdKHosSGSfa5T62ngMbwJ6zyB1p79pRf7XyoaGQ0r87h8InC%2B8c1xxPQgfoZxUFxdaLzSdBDumz89k9VtgbZMg%2FS%2BuF8m9MC%2BPDVRIfAek2CoaC5ilcU5v08mk13QDFzwyqEy%2FngaF8yHnfFtFO2tQ5O943wg2WZqE3&X-Amz-Signature=3e940271b4b8938e8f735bc3f884ed86f52204e47239f184b4dc86d379984a06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IJL5GH5%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBn9m0548dFhhLEr164DiKbE4KmR%2FyJp9xSDeHiRw9%2BdAiBQaLsjEqxhkq3IgTkFWlx0tTdu%2FvJv%2FkHOxm0ArZ1rXiqIBAjC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMh6ex57kq7pM5BbLkKtwDZzzkCqRz7t3j5XxzoVmbUQAo4Oe5FZusmA3xp5NhLAg7flx5lfe99eFMU43TE685yqTZwf8AI%2BcfxnyivA%2BTAbOKFrcnUcxMorT0sHOrHU52E5kGan%2B47wT70Jq2Avg0ceNAIDMLwYOayDjmg3BQIPn2Yl%2FSJSrovSPM5s4Jrv4bmpN%2BzWOTsxRwLQF8E4Z35JwV2Vxz2XvpyK4YhB15%2BJ6j9N8lCWAQNhYLu9ZTqEWoyxsNCitIzip7ZCh1t9TWLJ0oN4APuQKsRHAb07GsPfryURmZ5hms9sC7060MM8FmSOArCt%2F%2F2hqkC4jsmd3zhFluvQXgVFr7SgjanoAydRCe00RIopZGIU%2FcR1f5dMNi1Dbxv84Diwt1P93x%2F0H08tkolag%2FUKQpX6UTSGBHo7dvmgcBwSKpXXxNIrKAZx9xjGrCgWKWpZ%2BJ5rGQ7vfJ4A7yD7faZJInYzP2DPQXeuPqUu3iR7jPLh99yxZ0tgDzKRA6KR7kc9N6l9MVtsbdE9uZfhNchjNXNYR5qcjU1HrSuByoYQvCjdy7i%2BMnux384xDZAbG29I4M3n1MDVANb5NySH92IhFu4yUD0C%2FofzzM0c7mnJp1PUuaXAbu1Ij6U6BKe34JS%2BSN11cw0eKTzgY6pgEzc6%2FZABDX%2FUmtRUkeD3ILaoNkkab0JO%2BXMiZutlKNS%2FunGi6vzcnNavYEzcdKHosSGSfa5T62ngMbwJ6zyB1p79pRf7XyoaGQ0r87h8InC%2B8c1xxPQgfoZxUFxdaLzSdBDumz89k9VtgbZMg%2FS%2BuF8m9MC%2BPDVRIfAek2CoaC5ilcU5v08mk13QDFzwyqEy%2FngaF8yHnfFtFO2tQ5O943wg2WZqE3&X-Amz-Signature=849f8c5134f7be985fd176ad5490c3eb6780946ebb8f7c37b93796ab5636e2a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LT6TCWA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCQapAqpzZyyz14VcjJ2xkT5dpyReMEBb7bUT1ge27RuwIgVrxx9jHruyTQ2yC3tyxWvz3%2FyVNI9cJ%2B7lRLKK4m11EqiAQIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLfGseMqxcAiy9GE3SrcA0qPX7PFnGbE8gkB8ntBToThEZoN2lqdhQAkKzFr4iKggmreHow5ePaRSguw1wxAtJE1Ch791Mr589ip%2BxuYsLsg1OmCN7urZB1HWBOCuq%2BEinCxdgeWQarLFqZI4Lfi8ak1ZjY3nZX%2B352dBr3Ul%2BK0hZzKD1BDXvdvQ7gADGEjFVyxmb3x4XRC8KR0ctsD%2BUPjhPTWXlXK1ksmwXWlbzRVnVOxJQoL2CH%2BTv3dK4H3XBgzi%2Fdm9r6%2B7%2FTdRiHKCoz4NLr3AtFATcDXBDEYNu9t%2FaWnwxj3T71JCfEMyItdA37JmkflEp4%2BPc5DG%2BKt8tUgLCs%2Bew8oaVYLmuio3XFL87YZCazSzcyiwHvuv%2FkQOR0L6UjlHMLWz27HooUZzh9dHUVpWCDjirIzNB8H4XAirK8n4%2FPYik1D9zi6zUWEizvUBwGku9%2B%2BAgm8xl%2BJcr7TnRfFZYXzdWfcYW16L36Q47V791GqPucQ%2B30XD5c0Hz%2BA9tDBq3rz0wPSmJ%2BCoOYL68TCakR0Z5ZXgd6KQ9fBJZrXsHjn1A9UBMZOqkYqP%2BCglVm8pJ5yxJwe1frnGph%2FoPCaUivM2dLWBpsIadDG6klfL0N0qQhNsNCZp3Wf9hhHHDTXcTn%2BAaN6MI%2Fhk84GOqUBpnRQxy0ksvu7SZLV1srosx7ktyw5bk6P2U4aP7MqAB2R4w51o%2Fdfu14dMCSho9KUe2u23Srgor9nfloOHmKJrP5ji%2BnYVRFcfRXC0MEzSdSJFqVpoyzZlRXx5fLmkKyjE9MTTKnppu83445MKs8l0UBFIMlG%2FQ6Z63UojBA%2BjsW7X0RngZVsSRkM8%2FnReLzREGgT8zQr8Y0Kef6P%2F01W8YiF3fMG&X-Amz-Signature=910a047c30d806bff2b0deeb8f78ea8d7f07de6154c4d2ff5912f106b430a3ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TY2BMYZ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDtk1qLyTOcWKb0fznVy1IWU%2BZD4q8ZSDoIv3q89KmjiAIgKL6VWVX%2F8M2XYk6bk1V0mQ1J3%2B0jkRB71SbiyvtYw00qiAQIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEQM9kPVwu9EtCqo1ircA5YDEcSWtzk%2BTgaYMPwmISUUEbHtyHVUDlEviDqwstnRwaXeUFO9MWObs2kxDbPyDDuoDLAWetnXSyUwOHv7tVVb7cCFhHHu3fIQ3yna0Ou9lIy62tj5IibNb3pgarfSlVV336phthyvy3rw%2BGRhfN9mzzEU2cbnBIcEjpsPjTyAlNraIkUBHiivtNR4h2aRg4AV6lrrMXyy0Dks6gk36kN8qvzdnzwhwuMsiRB0iP6EKtdozmC1oqwYCVVY2nRB33ZEU0EUXuA%2Fo40jVacLFG7tHSQsvTho72n%2B5GDfDQPUuY85%2FI%2FeVhjs%2FehcgAAfsT8tUPYlEZeKIjNDKaUm0QnywgBH4cAg9rHMobEerNTR2bccJ%2B%2BN1euN3W%2FiXDCwLnhDkcwlrmEEv0FITsWMYFXVSHDNRIalXeGcOAD5ZYfJ9aHcvQQBjI0FcyxgN9VM%2FWwcFba87HXtOx0tFU7AVkkhvW7AM4rOjHHjHiXsKHBeAhPr7cGSfzj7wYZDGxbpEA1m1EfNEOwBVWibEfYKsGGEpMwbgEo0%2Bc8bLJbouGk9gW7CfWnkuj%2BwtZwY13WkLQ3P%2Ffw3HlpcH%2BmMYsJ1F2aSYkX2qrdJKlNWX6OEzyw7jyQe1hZWM08W98wrMIPhk84GOqUBqmOzcwQ5KB2yWJOwYgAzo93iI4utLRlxpvDXBJaDATyTny4Fb%2FnaQYoU8J1kW%2FE8I%2F5CF%2BDJuIch8AJRUz4mac%2FIBFZQtPNyZ4UnOZfbmwJs9YvypG5NUEStiEHz8D%2FL16lC%2BO3PkKKO4QNP7eOIgJLVa9sPCNjRk7srewYZXdyiEEWffZpCeNOZkdIxpYLEA7T0JDNqw45J1Am3J5iSwLSbg6H3&X-Amz-Signature=6681257c466d186ffce3b0c32999d3607715ae0de7d587e36c22c4d3341be940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6E7U5NG%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDk11wpTvhDrK7i%2FeGCpH0tx3ut4Kg9cyaqZWgc1NAYbQIgX49Fb8wWO9tQot9yXGWFzIx9SZb8nTibWnomIKCCRS8qiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFISWeMyUnQT1uO7zSrcA5LD153q%2BEZAoKRkhS%2FtpoTIdChtfiHVFyY1uifhIeVeELdFHZlS%2Bje8eUkT672jl8lOmYgLomZzw88aLjRQZyE0tZvPSj52bAANUII3tQ92rUFCDnuRIPcPoZHfUeHj3BHicUUw23F%2Fm75zTm1%2B4qRDQNWj%2Ft%2BuhIIvJhA24TG6%2FOCmG3j8PARmJJuSqT8nBH38iZECRCgseW0iInpKYdaWAyL9Q42h52WzKM9pNH2p6rtSOtbYlApyWQpEKeW3Zju%2BmblZaemc4fCN5xGi7JVJRSOl7Rf9qk7UPfxPOwcYstOuBfVVkQJusek%2B%2FzoQiVX2ffDrfRPphjnkJMTQIbcW7ZYvIgGCWw6%2B5xQApat0JcEb4Vgug3TYnFZmstSuKDbJE0%2BREe6B6gcZZZZd0wCKAvlvOxPnj%2FWAJ%2FLGt71WuwLeYY8rwJmUwPJgESKosgU3RVWQPGUbjqRSfz2FsnoNN75cQII0%2B0%2FEUwHkX2x08NtwEUbMIn51Myu64om%2BBoY2a4Jbcu5%2Bw2GEqDqBISpuGAW9Zffxmj3RGWx8PinWsyvlM9duHc%2Fz5jrBx8uE2KidpntldNUvG1rEUj49lWvv5gQ7PAsc84tBolfjihJOwBWeVkjuENhunBlzMNn1k84GOqUBcwbHaQV5yo821wb6zk6QK7EwP64KpaBnH%2BysdC%2FaHKosRMSUNWTQAhP2Nt1qioJ7XfmFYE3NkLdVIvHxyOxY0leUWhwu6DL3uz8f8XMDITsoEMTUVH2a9ecbLpYmeeWpq0NPADlf%2F05wvbZsO%2B7gVXB3lk3AkhIrOB8QxWArFy75CFAqDUdHakELSqe0kdrpepgenSJUmFSpl6NAeIn4obXQUior&X-Amz-Signature=7764610f4c1ae08afd9cba0c38b578b5938c00d8c2d51df7547ce89677647161&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S46BGSDC%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAvmaXHuZni6JxrFjQA3n8LpuXWFj6oAJc2uRQ3XF8VyAiEAuGr977Cch7ytF1h6VnY8iL3KGgKXqFajOw2IdWHK4hcqiAQIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMFl2Ft2p6DuDcWQ8SrcA0UsHVoSto674Ov2zmo1tkwPXJbYL0IwclJvaPOnfuFrMEc9jAhz56b9nDYl3NqZvuWzqHsGqZcofzn6naNu8klBRnc%2BIQvKWV3VY9jMdQEiASrOiv7UtjdP0S7D4j5647lG9cpUDIY5115sx9YkGG%2FyLiUOde5hqq7DMQ1cZ8J3dC%2BkP%2Bflrp1ukMYyLQ4uFPj3Hg0KjBS9%2Buz9jXjIyKfXi30eOoWZfggZHrjXkN2JPICqVpQBsgKF5EqGN%2BdGyrHzH%2BYBKhRB%2B%2Bk8hx2aue4LRYdrePoGbHQdG8YZyESRcrq5AiFp22Y9KlO9XaN0ZpkVUvfh92doUMj%2F8%2FmIQBIl2at87ed7Mxr7%2BGMj%2F2IjZ3RzrTd5gorCGgjAUwkmaKxlNLMmEJ5oWYETq2WJV7FE1RqxEwZjJeoMvYawU8qy2e3oezIiLSlAN1GXqxwPqQ2IdMRf6Nk0gJcKM5tpB0plrDd6IxWdHghJSYiBLWqqHh6HRpNHEt9en7P7MowPlgwAAJttPP1xQEPdkVoBq7PJBUhr0BPoFMzBtK%2FFZr1ixxyKlh%2FkifwQHTCpWSLJf0tAE4oIvurIb1NUi5Kp%2BsXbsetvGqJ%2Bf5J7ccIv%2BoGnLvQw%2B0%2BO0RTrNj%2BAMIThk84GOqUBv%2BhIBn6CHKlnvEDRM2XPqzoJyni09k6PkyFa7BIS0yAYL3dw3od4OXZLpBVg2uFzsN1lh6ZmG7jaOKMdkGuJzk0PyT4PUaO7oLyTuEWe99y6idi3zI%2BhAFYydtvjaYhPEq6NYnWvKSBfqKehtW5p9pHYXtfStICWt3dfnD7x6pR8ua7iCyXXzg0P8p7LCq6M0Pa%2BaNQLWJCEcrdc1au7HIjFQSyZ&X-Amz-Signature=914874a371242bf56b4541aa1b6171b2b6876a0ed84cab192a91538bf6003850&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S46BGSDC%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAvmaXHuZni6JxrFjQA3n8LpuXWFj6oAJc2uRQ3XF8VyAiEAuGr977Cch7ytF1h6VnY8iL3KGgKXqFajOw2IdWHK4hcqiAQIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMFl2Ft2p6DuDcWQ8SrcA0UsHVoSto674Ov2zmo1tkwPXJbYL0IwclJvaPOnfuFrMEc9jAhz56b9nDYl3NqZvuWzqHsGqZcofzn6naNu8klBRnc%2BIQvKWV3VY9jMdQEiASrOiv7UtjdP0S7D4j5647lG9cpUDIY5115sx9YkGG%2FyLiUOde5hqq7DMQ1cZ8J3dC%2BkP%2Bflrp1ukMYyLQ4uFPj3Hg0KjBS9%2Buz9jXjIyKfXi30eOoWZfggZHrjXkN2JPICqVpQBsgKF5EqGN%2BdGyrHzH%2BYBKhRB%2B%2Bk8hx2aue4LRYdrePoGbHQdG8YZyESRcrq5AiFp22Y9KlO9XaN0ZpkVUvfh92doUMj%2F8%2FmIQBIl2at87ed7Mxr7%2BGMj%2F2IjZ3RzrTd5gorCGgjAUwkmaKxlNLMmEJ5oWYETq2WJV7FE1RqxEwZjJeoMvYawU8qy2e3oezIiLSlAN1GXqxwPqQ2IdMRf6Nk0gJcKM5tpB0plrDd6IxWdHghJSYiBLWqqHh6HRpNHEt9en7P7MowPlgwAAJttPP1xQEPdkVoBq7PJBUhr0BPoFMzBtK%2FFZr1ixxyKlh%2FkifwQHTCpWSLJf0tAE4oIvurIb1NUi5Kp%2BsXbsetvGqJ%2Bf5J7ccIv%2BoGnLvQw%2B0%2BO0RTrNj%2BAMIThk84GOqUBv%2BhIBn6CHKlnvEDRM2XPqzoJyni09k6PkyFa7BIS0yAYL3dw3od4OXZLpBVg2uFzsN1lh6ZmG7jaOKMdkGuJzk0PyT4PUaO7oLyTuEWe99y6idi3zI%2BhAFYydtvjaYhPEq6NYnWvKSBfqKehtW5p9pHYXtfStICWt3dfnD7x6pR8ua7iCyXXzg0P8p7LCq6M0Pa%2BaNQLWJCEcrdc1au7HIjFQSyZ&X-Amz-Signature=8208bb822253e983142cc3866b6a53a2deeb5795580c48d3d7bf054419ce2f1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SQ5KTBL%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH4UhnpyEJZUZu2ermjJb3zaOxRAmvFU3ASvaXPxGY1zAiAiteAI3YLeYvUm9mYhPfzG1VPyKO1uaIurDmFRuSB27yqIBAjC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMx%2F0mUc2fiR%2BDNIBOKtwDpOtWf5OHvEDTROLN%2BTkn5XKnHMX5pDABGll5ytTAguf1Co1e6bOgQYJJlBPHUCBQEpnHg%2B66temWr8u8E1cg1bAW943oaz8xxsG1I5C6jwS6x27KYILUuWj%2Fu7sIb3Vy6w2fgAl4DGuGoy4onAzK3gPYvka1TtRC0S8i2JGeZbslR7V1GG6FD4%2F0pCA8deVUc0fzcR%2BdajTBO%2BuQr1Jc8bpvEETQRcXt9v0LcmArqe1BkDiONguSQMhLhr0H%2Brhec0bEOCipVpP0aszPN7S9CT67c4JpAbXWyZg0MVkO4%2BByHuEjgDjtOOxR5cuU6mIixOAwzbEyNT958ssHK1KCZIsur%2BVJ096Ih3WBKksfT0wxigjCtggF5u8uyDLfXG1L5Mc%2BbaO2%2B%2FGBnRFOt0%2BrZ%2Bl%2BiOxQV4fmH57Jgo8nzEOxfDKcC%2BSJXXUfkYUiC3%2F7Q5%2FVXOIWWFXIdl%2BRC5EEI8cX%2FHr4IM3%2Fo%2By3NsB2dWJENi2%2FHEhNTXSghCIGnBjgbbPgDu%2F93WUYPSRu6ClPp%2Bup%2FUosz1E%2FgWz2FrfrCJzQTXtTfihGM3GewhugtZmKCcQnPrvnHcUyR6Y4ueJSvPBTFa%2B1Il7EI0aXYvt65mLFlk8rT%2Ff5GOatUjsw9OKTzgY6pgHO9VrVdtpM9dusifJnGwUwra7bClP9a7ywu9mEhg%2BioDsqQqDpKcylW1LW1s6U1wrwiI2BNwb%2FYZxG3smpv9yeAp7%2Fkcnii8VtV%2FhGwXxhGF%2FgBtNOAxZGMDLM2KJYs%2FTonvPp9T7nDtFYlOdwvLWhDfLK9GlXJ9WCCiZEQkEnryLWzHLhCpA%2BDzJepnfU8H4B%2FqG9mim7GOp1nZyZIDujzN8F2UVk&X-Amz-Signature=485ef2c1130b1dd3afbc0455539a1459ca29da81d4bf2d254a9539efb3186cb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKSRK6FT%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCyf9su1W8xVGKhDhrbAo%2FXd2Zpp3fx2BIcIqmUdXT6HAIgZip%2By9UhbskQUru1xmhMHl1Tdi0DoVsub6IjHVe2uq4qiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD8nq9K%2BOHhJ1aDw7yrcA0SYUGLWrTkpapi4WK42y3iscYtbBUi9NqkWm5o3aXgsYYcQ3xDHOIyVl4Zqs2eNTLUR4XhHGfO0R2zw5%2BYWixMhME7T%2BsPCa0eixapZXSqFleohtss8Clls7S3P4%2BgZI0gpFVIQpbJntvJiEGQCUPoKjHmDdXGpsFCX7JSo0MAROsdoR7HS8hsrYHE%2Fh5DgLkH2B4OkUmxwD%2F%2BHJ4kdmwqXbOhhVUi6LoorLsgXedM7%2B5yzC9m32EsbBq8yVHYCFW%2BjVvX96WHrRf5yhOcl7pAWxPe1CpyEJ5bPDTbhr%2BTNiPc4A8rUWe1AKKQwqHqXXaXdX5XeChheR7hA7ICKV6rbPCPFCWEI3N7cn3p4wd2fn%2F06NP5YsS%2FsQ%2Bm5Ue9oGmNr0jW2FBKwz%2FzT5xDCzhlmBqrBd6TJNihue37b7RS9GRp4mj9vkSQ7GguLb5QwauX%2FY1miqsFVQ8evTuvaI8YzInvABWVjY36jO4vBKkVDOpxN%2BbvZdCylZhRSybNISxmFdj2Qc7Bw40UIuIkvHX%2FAtLEtmh82JWW3IP%2BRGkK5DNkZBt7mymNG2KHbtIl20tIM6X81%2FFpDrePj%2ByZvmNLgrnmifOU4sR2fNRUZy1tD0kqAWxDemOg%2BYThFMOr5k84GOqUBuODmKZwdE18Le%2FsDAflOUs77n4%2F8JOdhNmYxeqwrSh5wi32%2FEkU441UFsuRWsybl0cXe1uDYz9ZYgYb22cpJwLptl4%2FJt6EH4LK%2B1bPPGjsx9z2Xaase%2BSQ%2FASiA36ps8Y2CglzB4iYR6EyO%2FUilOQHSIPHDufu6IbfVihQcRV93TLP2tHpzcXSUpP6AcpKIwyajMtO%2BCATbfbiNc1BJXyJo0NT7&X-Amz-Signature=c137dd8adf0602f463deeb80f8808499304af11e32c15fbb58fab43f761073bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKSRK6FT%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCyf9su1W8xVGKhDhrbAo%2FXd2Zpp3fx2BIcIqmUdXT6HAIgZip%2By9UhbskQUru1xmhMHl1Tdi0DoVsub6IjHVe2uq4qiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD8nq9K%2BOHhJ1aDw7yrcA0SYUGLWrTkpapi4WK42y3iscYtbBUi9NqkWm5o3aXgsYYcQ3xDHOIyVl4Zqs2eNTLUR4XhHGfO0R2zw5%2BYWixMhME7T%2BsPCa0eixapZXSqFleohtss8Clls7S3P4%2BgZI0gpFVIQpbJntvJiEGQCUPoKjHmDdXGpsFCX7JSo0MAROsdoR7HS8hsrYHE%2Fh5DgLkH2B4OkUmxwD%2F%2BHJ4kdmwqXbOhhVUi6LoorLsgXedM7%2B5yzC9m32EsbBq8yVHYCFW%2BjVvX96WHrRf5yhOcl7pAWxPe1CpyEJ5bPDTbhr%2BTNiPc4A8rUWe1AKKQwqHqXXaXdX5XeChheR7hA7ICKV6rbPCPFCWEI3N7cn3p4wd2fn%2F06NP5YsS%2FsQ%2Bm5Ue9oGmNr0jW2FBKwz%2FzT5xDCzhlmBqrBd6TJNihue37b7RS9GRp4mj9vkSQ7GguLb5QwauX%2FY1miqsFVQ8evTuvaI8YzInvABWVjY36jO4vBKkVDOpxN%2BbvZdCylZhRSybNISxmFdj2Qc7Bw40UIuIkvHX%2FAtLEtmh82JWW3IP%2BRGkK5DNkZBt7mymNG2KHbtIl20tIM6X81%2FFpDrePj%2ByZvmNLgrnmifOU4sR2fNRUZy1tD0kqAWxDemOg%2BYThFMOr5k84GOqUBuODmKZwdE18Le%2FsDAflOUs77n4%2F8JOdhNmYxeqwrSh5wi32%2FEkU441UFsuRWsybl0cXe1uDYz9ZYgYb22cpJwLptl4%2FJt6EH4LK%2B1bPPGjsx9z2Xaase%2BSQ%2FASiA36ps8Y2CglzB4iYR6EyO%2FUilOQHSIPHDufu6IbfVihQcRV93TLP2tHpzcXSUpP6AcpKIwyajMtO%2BCATbfbiNc1BJXyJo0NT7&X-Amz-Signature=c137dd8adf0602f463deeb80f8808499304af11e32c15fbb58fab43f761073bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T35Y6EHC%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T094727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG4w%2BA9ONnd8E2b%2FOb2CPIX6AmfTN8prhnsteHkZfa%2BfAiEA2F6oczgcdgB7xQMf600Uh%2FSXdwqxEOQ%2FqUs9yhF9ObwqiAQIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPBN2cueS92qBEkK3SrcA3Y3q3pP9s0E7eCdcl%2FezdcU9dqidXl8dJBTaR6Z8CrN4zsiEvVK4FM5ygBRtHVun50tTJzd26sutmAqIKIaBuVAuPQiMAiutmq8OK%2BdblivZqgKrOpnSoz5zluUvb%2F44x50lbxvfgvH%2B%2FZXZRL9yup1vHUwTHEmUkHdZoSMBGKEpTOt5Tg5FC6d0nV%2F%2B5GEvw%2BACKvf5jDJaX%2F787DV4nVva8Q%2BpINyIg4CSFDzjJ7L7eTmDuRaer2TKkb8wWMgeU7Cxk8WqDkZQTxrZQNAMlgi4A57KY9yJ5HUhibgEYJtGBOR3vcFnlGU7uidSH3qdiUopXFn%2B7bcn0bQWqlSjaHEkiWakMlbg1jRNGLAh0ok1uDwZZDIsH6m5GDcRE%2FY5nVEDXyAJE9wpr2Gxkd9YfgZnbof6YnCE2AO2AYxUvh6AYvvmA3HezeFBxdwUqwnP6h%2BX1f7sepFNSuPKKkYCTA%2Fj6gZkkuDVZ%2Bd8zK5pXCAe0xOEXkCX1AcZibrmBC2hIccP06TqOidrOFfygv5IlsDV5Ihvo%2BKI8a5kHNJyrMHaiG4tCxZ7b3KNDse5g9saLG%2F6wFwSE%2FJq2jl2CKoob5GjC31PEWb%2F1zT7ccRzTfAye1QrVGoLnPbexC7MOTik84GOqUBwZoUCcmiarr9sN3YFF1MUVb6as2ndHSL9vvagdeTYgmykpq3oUmYXTNmmeN8pD%2BIndl1mDbdhmnqGY3V7p2ODQYdXc1MfeID8cpA5Q7zvQMRdOTiGBX1%2Bh6%2BveYkZ5%2F9zxaSBbtkI8CnMHd%2B8LhHi1Nxt5nrLISSvhV3t3WyL7BnBZAAdwAtRKGqKT3SACFR4XhnUT%2FIxI0C3wf8qED2WHfjSIK8&X-Amz-Signature=471f50bbcdefbdd58762fe45fbe9b63c12d678a28fdb0af46181d2091961dcca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

