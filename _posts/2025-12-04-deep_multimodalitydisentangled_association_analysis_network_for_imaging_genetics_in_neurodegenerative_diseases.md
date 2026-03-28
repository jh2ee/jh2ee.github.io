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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2GK2ZQ7%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDRYZuxM8ZkzwykcuRB2ITMCYT7h9pJK9F3USe%2Fr%2FvjWQIhAPR0H7WtaY%2FcMV2akBKX%2FNnzzkEsRs1ZI4gUd%2BWmkuzlKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyJPLFBHL2SdLU0puUq3AO7uHN66cGHTSQmfzzBgc%2BIN56qJuNcqXWfTpXp7El6uqK5hJ2YHFF0ZGCWL8AT8I755CAeeBbqsENYxD2%2BosRiI4OtRzoyriQb2uepoOcHxOxsHp1ScIyTfpg0UA9cFo80nVvdann0%2FIcYteUL579ptyFQL91fHVMdwAMFtBHvkloa8PDQoZ6487gm7Vy0qS2xRuZPxdtlEm9kHKnq3sgbQd2Mw%2BPrtRyuICi29W7ZldCwPgmPUgikAi2imTrT0zUO00P%2FmTmyVI%2BGtSeH1TOJFiTzWmQqEARsezNORBsMVBZHwPUnqTLhjZso1qVDtScC9NxQ6%2FSWdbeBpx9qWiNCE7KNpixbxnT9qy8vIrcVz2toI9ShWfQl7kODLjcJHX32AQsFHSvCmBWjxOahSHvPdav9071t%2B7RfMpVP0PSW6HGMOS4DkXH4Vm4jZqrTDt170aGaaVtarQ%2BK%2BcxiqczB9RqHqwIcqqy7WSoKO6GtFfbWEo8U3Q7%2BPCCC7ij8S%2F9OI5%2B5lN%2Fg5QKtqrG87kpc4hCWXZP0aRMqgVCwHpm3qEr6eL%2BrQE%2BEXJjEuIOSX4pxcvBf0lU2XUA86x%2BxsQAE6rIlKKvH4bAEV6E9OFfyxCwP8uJEJFcl00P2czCMvKDOBjqkAbyrEmLIHmDQ3x51tlqr3gd2z77fWdc1%2FsEb58Dc5HBev4tttmfYm0oLnWCgf1aU7gLskSa5wp%2FLeNUsPehVuecq1yROEzc79O0XZm7Ik%2FGb8U5x3DoCupKpGyig0qN2PJUOgFbxfcOWOw0LPCvgYGAjqmxn07YVLIjI0JqGL4NX3mTIqO%2FteeiVfLetlCOw9wRjstYOeHleWZpfEt4tD%2BEWZSZa&X-Amz-Signature=e08171b6bd7234d3fe8228c59fcc08f9cf1a035a44683bca4f6acbb7fa08a6c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2GK2ZQ7%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDRYZuxM8ZkzwykcuRB2ITMCYT7h9pJK9F3USe%2Fr%2FvjWQIhAPR0H7WtaY%2FcMV2akBKX%2FNnzzkEsRs1ZI4gUd%2BWmkuzlKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyJPLFBHL2SdLU0puUq3AO7uHN66cGHTSQmfzzBgc%2BIN56qJuNcqXWfTpXp7El6uqK5hJ2YHFF0ZGCWL8AT8I755CAeeBbqsENYxD2%2BosRiI4OtRzoyriQb2uepoOcHxOxsHp1ScIyTfpg0UA9cFo80nVvdann0%2FIcYteUL579ptyFQL91fHVMdwAMFtBHvkloa8PDQoZ6487gm7Vy0qS2xRuZPxdtlEm9kHKnq3sgbQd2Mw%2BPrtRyuICi29W7ZldCwPgmPUgikAi2imTrT0zUO00P%2FmTmyVI%2BGtSeH1TOJFiTzWmQqEARsezNORBsMVBZHwPUnqTLhjZso1qVDtScC9NxQ6%2FSWdbeBpx9qWiNCE7KNpixbxnT9qy8vIrcVz2toI9ShWfQl7kODLjcJHX32AQsFHSvCmBWjxOahSHvPdav9071t%2B7RfMpVP0PSW6HGMOS4DkXH4Vm4jZqrTDt170aGaaVtarQ%2BK%2BcxiqczB9RqHqwIcqqy7WSoKO6GtFfbWEo8U3Q7%2BPCCC7ij8S%2F9OI5%2B5lN%2Fg5QKtqrG87kpc4hCWXZP0aRMqgVCwHpm3qEr6eL%2BrQE%2BEXJjEuIOSX4pxcvBf0lU2XUA86x%2BxsQAE6rIlKKvH4bAEV6E9OFfyxCwP8uJEJFcl00P2czCMvKDOBjqkAbyrEmLIHmDQ3x51tlqr3gd2z77fWdc1%2FsEb58Dc5HBev4tttmfYm0oLnWCgf1aU7gLskSa5wp%2FLeNUsPehVuecq1yROEzc79O0XZm7Ik%2FGb8U5x3DoCupKpGyig0qN2PJUOgFbxfcOWOw0LPCvgYGAjqmxn07YVLIjI0JqGL4NX3mTIqO%2FteeiVfLetlCOw9wRjstYOeHleWZpfEt4tD%2BEWZSZa&X-Amz-Signature=e08171b6bd7234d3fe8228c59fcc08f9cf1a035a44683bca4f6acbb7fa08a6c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NP3T77C%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQDvG9szwL9E%2BSdPV1gOXJHAd5txbL9lgApvwfCmCMOr2QIga59loUM8DIQhcgoRPERWBjspCTKMEOb7WTfKBJOiO0IqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBZYpYjdqSPZ8HrL6yrcAwaDARnORgPuia2RYur5w9LojGas05DmjIUQbIBe%2FlE6qf47nqXNAuv2mKB8Vk2M3M9PjTpj8765Q7Zmyl3syFPotLMkDUr5dVk0WKKr2pyTsXwNWENQRfZTX2k3KMwA7UeQlkc0uOe%2Bl0gNlgCk33byMfcN4VoospUUS%2FOtbzZoOR%2BJouwCF1pMP%2FZ4QedRTeQpdehPtd23U956mgFk7VrkRhKm5yqOB093ja5fnRpLtoUaYXFjVQJLXEwZpinS8jZOBqfp8GJo4oZkuZTOOT4sB84zUfp6YMSEx%2FY2eAHfxvYw8HAQ2IWjnHynFZ3iV5TWz177vjs5av6w9fFvKCqp3yqCpEtURg7I7zxv%2BaKB9iKf55sP4ZghVxp47FmtEnfYPSvY9jmO9JDVMjvEUTqayy6XQPWBAMw7A2x6hyQS6DZ27H8gmLXVEa95hv5pgYAZEOlzAzsyuYNaklF4dJD3aidDQX12ykC3Y5SDrYsG6A%2FBnJFagRTCwoluVs8kw48aWzLSDmstHUbFfqtWhMYkWzfa4zvqy6nTtULgviBcfczJ7eAqdcI545EB5qepfoOodu9xtM%2Fo17XXu%2FvciXw1GT3apQ%2FHWugvbnCZCLkVNyF%2FMP%2FcY%2Ffi%2FNaSMOW8oM4GOqUByfxPJK8tPb775LZfiJsJDBVYVDgU65ZTg4iP9o3YSC6veK%2FYhtB%2BaUbNMuppbB9g9brSYZXnZPuaipPa0SiioRruO14WRSGA7Lxwajt%2FuerIrDLwKzUKiMH40FhMZWkm7PC%2FHi1aNOTLOM0gCYJOLEH6u49VlfV5F9AjIi49Ii1j7qklSJWCXPRfbvpIFsvnDbCae2WWJSmI%2F4FC0X%2BvsOIIT4rz&X-Amz-Signature=5b79932ac582a260d29a1bf968b15be58b60f03e5652979a43e5635b751ac55b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7MGX4YS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCICdj5UWei4MVH6X0j38GqkjGDxldmEfFw2QZ5BeZ%2BG86AiAjDKwKxEtPFrxJg2Kf5rqED2MVt3tXBKhr%2BnaTbgOTliqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrtyyJzbb8DswhvhSKtwD4KzKy5D8wiClKsTidId4RnCjZAHk68cWEeKIkC18grItODRqCAXqX7emXBom%2Bsmn5wr47p79fVSNSc2UZdRSubywwCZ2XTYKn0oLogpUkBqmNq%2FV2cxTl4ZFGcdoEw1757IEjx%2BNgKdL3AostCW1xFNh7VK%2FlWbyRKizkHJ%2FvSE06tBDa3al2AeBxwdY3xqsSDwzTl4yWUXY8adkFKW54DjsAmH7poS6XWOafr0xCihXZXwhcYIR6VWu1ZAPhUBA60ug9Uhg3JIOYRlldwOBHdqkwqM%2FD%2FVnEAlNQmiT5k%2FAiTEh2F5VtY%2F80hAei3PM%2BI07tUbcSFJv%2BL1wX00eX5PMiBZNIVzJruxtQcjWIhB5%2FM5s9pRcNWNLAvLi87Yg8Qt%2FnfnspXhcDFHXvnEm9ut3Aco4IO0QdcWG3Nd5JtCvDU8qTVmac%2FGHmny1PowNXc6WreovrUWcvdFmOrlUeuD%2FndsLAUPLUiLYXAZVkP%2Fr3fYzuALv3kzlCwGST0UKpXLqP0cpISqxFDfdJoZKqDhrQ8RiJYtAefirtV0QU0ndeD3Rxp4%2BehBdFtUe843GVvZGARKDWh80jxTW8Gnp3dJZ5CzsVJj9jW1ECasIm7%2BZBMBcgsTjZcGH4AEwkb2gzgY6pgEdCHVRfXuel46B4ugQ2XbB4DAwws5VSDztLVYTfKOgDfC49jDjLD7cNFrEVhv6dfwKq4QK3zfK2ggtO%2BIkvZbkDiUlcyydU35fYrUtk%2Brzo6sGwgmBqkt%2B3xtaTpZmRb6Ip2nIlIu6UXPP4WEJpOSQSB2eYOTMsHFVI6b2pAE7XqdkMhxHgBPxDvxrMCpU1i%2F2Fxu9DCY595vVUctybpduS06zS5T%2B&X-Amz-Signature=5924d9350ffbf4fcbbeb9ec85715187d9b0b1a88ff97b432fcb50fb2965b592b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7MGX4YS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCICdj5UWei4MVH6X0j38GqkjGDxldmEfFw2QZ5BeZ%2BG86AiAjDKwKxEtPFrxJg2Kf5rqED2MVt3tXBKhr%2BnaTbgOTliqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrtyyJzbb8DswhvhSKtwD4KzKy5D8wiClKsTidId4RnCjZAHk68cWEeKIkC18grItODRqCAXqX7emXBom%2Bsmn5wr47p79fVSNSc2UZdRSubywwCZ2XTYKn0oLogpUkBqmNq%2FV2cxTl4ZFGcdoEw1757IEjx%2BNgKdL3AostCW1xFNh7VK%2FlWbyRKizkHJ%2FvSE06tBDa3al2AeBxwdY3xqsSDwzTl4yWUXY8adkFKW54DjsAmH7poS6XWOafr0xCihXZXwhcYIR6VWu1ZAPhUBA60ug9Uhg3JIOYRlldwOBHdqkwqM%2FD%2FVnEAlNQmiT5k%2FAiTEh2F5VtY%2F80hAei3PM%2BI07tUbcSFJv%2BL1wX00eX5PMiBZNIVzJruxtQcjWIhB5%2FM5s9pRcNWNLAvLi87Yg8Qt%2FnfnspXhcDFHXvnEm9ut3Aco4IO0QdcWG3Nd5JtCvDU8qTVmac%2FGHmny1PowNXc6WreovrUWcvdFmOrlUeuD%2FndsLAUPLUiLYXAZVkP%2Fr3fYzuALv3kzlCwGST0UKpXLqP0cpISqxFDfdJoZKqDhrQ8RiJYtAefirtV0QU0ndeD3Rxp4%2BehBdFtUe843GVvZGARKDWh80jxTW8Gnp3dJZ5CzsVJj9jW1ECasIm7%2BZBMBcgsTjZcGH4AEwkb2gzgY6pgEdCHVRfXuel46B4ugQ2XbB4DAwws5VSDztLVYTfKOgDfC49jDjLD7cNFrEVhv6dfwKq4QK3zfK2ggtO%2BIkvZbkDiUlcyydU35fYrUtk%2Brzo6sGwgmBqkt%2B3xtaTpZmRb6Ip2nIlIu6UXPP4WEJpOSQSB2eYOTMsHFVI6b2pAE7XqdkMhxHgBPxDvxrMCpU1i%2F2Fxu9DCY595vVUctybpduS06zS5T%2B&X-Amz-Signature=e45cf2658930094433caf45c41697ef44b59365b63b32d4fe498c3a4782713b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXONJ5DA%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQDu9q2Jq84Vu%2FwEvcjxusDSsW4wee2qKzimhWhr5CRL5AIgMztTRzRrDL2L1BqZR0eEhak0IzkLMCq3BOx%2F%2BB7wUW4qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDmD0YvvbrO2LQiuHSrcAwJOFeBLeOS9GmxE0wNFn9twi8XDNZzfMq1sxVopmb9l%2BRvgzcpObfvfrCGxDlMhtI27u1FUWeATOzxO6rmbLSg6Rof6rRKBPs5dhtL6%2B0wq7ZRJfNq%2FPsRuHWVnl1UUu7aLmkKoCUQg9bTONCSIRvY8i%2F61wp5zWC9NxLW1XpEWDJde0Fh3KB%2Fs3gPkfabSdSB5JpVKOIGGooTBL%2F23ziwMmvyLjkRqhZDH7znEYXAfvpnIzGORQRnokuHehYDnRCPtVGkiDp1Eh5ltU5Yiem%2BjZ%2B7LK6bgvdD4A3TgoXjHL%2FGjT7dhAeaZ36AJtztjE4u45yTl7wGNFfnWv52kr6DVTlOo5qLXzretE83kKx%2FBxgSw%2FjuBKPxmi%2Fq0SNd6TZMmPwwOe2zEgf0me3b09t0aKt7PbAyl%2B8bmB0pWczqYx5ADs2Ug0kgmhiPaJmMtZ%2F40LknTUYRqk1hrQD9jULxxE8NFWX6oJnNwt2sAPa2ksRydvbpFuY09y%2BdHRVr8OVIxNF8%2FsB4w2d2Rujb9B2HdkSD0dgxep8kNUbj6AaXSguHssIz8lJsDsQM4Rb%2BYjzcoYY8lgRobrLEC6Uu4CzhKdDGfDwVebz%2BGP55wAp6BA1quVa1YJ0sVqVsrMLy9oM4GOqUB5I7CT7nOMpilunG2iRZuERUb2%2FCFAMRsoC3gpKs5w07SrL9EY2Ivju8RaQ0q079%2FBsqLcJUdydop5QVXNQ9vYQsqppGBQwdLvOs2bzmK%2FS6OOl586Y9LokDuI1Pv9s9OmEaxQc9OOWt%2FPwgzBzc30gUXIxcd8iRTXFv0bs%2B1%2BAG68nYsUJfVvhscOieieg%2FU2FVY%2BY7HSmBg5%2BueB3OSORXVpOn5&X-Amz-Signature=735098b282c56e5cfbbc31f705960fe293cc532df2351bcbed901c537bbc006e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXCRGEFD%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCICCetlLK3v5ael%2B5wos%2FRy40PKe%2B1ZV7CYNHmtVB3lsSAiEAzb1VgJL7uD8IjbKFI0pxqWnwmT20zxQTT5%2B%2BwFS29H0qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIc9AwK4sgfiTLQRcSrcA%2B%2BWfavdzWl0MsLorSKaSItz4V2914xnGZfyCjMosDA6IhAL9VH3p7AjEjLEHts0zs9BZ7TQsI8eoAGTelVLIykl4t0yCvm3pjprsNQUfkh4mWQBlNmHvu8XHpP7HFMob0RhvAAzFdt9qppVqdTy8GMh6IPXVwxRgHpMK1KUCjkNtVYwk4bSlxBL1iBEaz30PyoaojsuKL8Yx24hffb%2BzAp4MEYKUtufSl168BupRGJtNWWqsvQXT%2Fp7iS2%2B3ebvqJDhx2NnYTGZIWIOWQZgaUC7lczK9l4e8D61jhnkzU4UNUORiHm7r0OGBBqCF1BiIZ60IgaAYw%2FLSacVuScDz%2BXsmbY45%2BHnTE8zVvesI0HHbnAEWu8Wy%2BmouleWqly2IRv%2F4AMYHBnoLMARnACU5yk8MHezAUvPZnYI3ulTJbPY5FKANqCmGy9ecT96xMucmwljYnt%2BNeYXhflNDtsDkDfc%2BuxRAcZrvWaoDMGX4TGYTXUMA%2BT7Lot9tJwk39y3Pv7r4tmZSg%2BzB2PdjeF3izpirqstYnTev44uRo3giX%2FQ%2Fevvn%2BZijKvbm%2BNe1DmEhzOxH2XIaBSNhVnTTNrOzOUdMGhL%2FD8HHnKoEly4AE2RCVwpZtldDpZLtXKfMIW8oM4GOqUB8JzXoaZDMe65nMz7LTwkWBhhZ7Dudg8%2FXoVCXsqnu6d1nHUl2mUxeKOoqqTQof6Px10CtHufPcI8BYjlReJii1lKhgLsLLtPPf5Xm0%2FIZ%2FRKzkwEGCRApTcbYy054%2FImUVDOJ4ttQO5RZLzvVGSPfgCz2RkzAlIwwctXItuIMwBOAJN1dGlWFNP6kKsF5uF2f1yDKy8Xpv9WXD9EUUz0VJQ9rqQi&X-Amz-Signature=b87238523179f95ef8e2b51fd5bffcfbed67a8591541a52140f7bb846b88c3de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMDYEBGC%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDRI3mvkzxv3AI4Fsdh5kxz%2FVrz3hJZLlpyDL5Rx2pGrgIhAIMRaoIS416pwqVe4vBDNtZoCwIbZNzWgobe4ut1i7xoKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx8jmAGe1FY3g%2FmgLsq3ANmqtb3dwj12g1aF1pExGMek9BaJecAW4axHLHAZ76bo%2FGguKkh9N0kYSmSgHDue%2BxIaY5%2BmwxduuShHmPRgV6WKW%2FJYhibYtWCMZAKRZ2gZlTagflIFVWsHeEbwb8idvsK1dzUP6yKs6RMr2aq7U9sEBZN3%2BblV%2B0xpR3qAlnLLazYflPbfoJ5NCnlLv9pY5A1msrZGz088Hy%2BIoUCiSMkB43YFBG0N2MRIJOwVntr2OGgk%2BpzA7M%2FJe3UkZLM1ETabSn83a7zoxWGxaqhz2zozuGkLk7jaNfpIpKe4jtxijgrwVW8spyI3nvZiV3nTfIw%2FXeMh8XbSamOq7RY%2FfD6ywI0nPYdKfYODVZU6qpwBNiXDqo2%2Fp6KCp41xmdnUtYWT%2BtQ%2B4Jz0htsqh5QAqlGjs1YtAIFvIXoxlOXfM3TpcbXOvFGN0LZX%2BFlUeQmSDqJLm0ws8Iau7yy10904I6QFBoEpz20iFqtrkWFDO8pmy9Kg1ZBogcoRlxwpejKQBUY1JEfLYAKHWz4QDG4oxu%2BAjuBsi08Spaq1lo2NieVinTV3f%2BkDMbYbHXvLbirb2AKdxRC%2B8csLcaI4g7lv%2B%2BQDrigBWYvthNi7pN8pLGogNfQrxtwGQTvm5YhdTCuvKDOBjqkASAnP98%2FmBncjHZ%2Bayw%2FX5IzSilVSQuncydbQRJKdldKRFnubCBZNcM6eUIVYEBkZJcjqxwwm9iIF0iivaNGOdrQZepIQhYdTZC%2FaseKbHUX6wLRidKP%2FdJ5YqJz1GnETySjV6I%2FAwzErv810q08oEu0AUi0EvvpYVbIeQwXYYxEhDzc6Xrlq0%2FpI7CEe8FBc%2BDA6m74fokZdZipBmBYcdFIzUJm&X-Amz-Signature=ae84e9353273037e2f702cb85a21f1340db5c5ec6759b042defb5540e2c67291&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZSAH23J%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQDtlyJu%2FriRr0zwQGrIRHrJkn50Sdw6Qcd%2FYEdfjq1NzAIgZUe301wSWsY4fDKBOCqName%2Bt3rb8OEsB7b78mzJD2EqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBguLToXixX7jHXh3yrcAxuyLwHllBl8FpCpycQhA1o5JgCMw3AonPE7tQyBkNxYz%2F%2BukvfrNBq2QGwsevGMR7F541GOwBcYB7LT6t%2Bp7raMJFr4TeDHKNtyXxSooTjPmG%2FZtCpFKHRSjSax2yk7Djm3Uw8%2F8QMBUj0d54yWHsvKlJ8utdUvYH1DZDnV1Fi1iI3xf3aGAZcphmdBd09A9jnZ5icylapV%2FwRN9Oq911Qn8v7YKJ04uTfvFIbBn0OOAoE0vGiUCrVmUAstazZN86To6csWcethVMtwmgvVg8R%2BK81spoaHqOA1sdTnar1W47ICSO6bJMnIhqw5xXj%2Fl0QLr2Hew9r148PT1LL96QT4BBmCK5g5E%2BPzGbXFrYJiFfN6484VugzS1mYUQNVwJ%2F9TzsQHIedIzZQNVNzX0iqFv%2F4X4sb4tuJ5mIcTFEgs%2BKCRJ8mbNizkak%2B%2FTCLjp8JBckQn00L%2Fbt0mylY6TYTPghL1DCCjcJPs5SJ2SH3zU0yIRogFIw94cL6Uhv5qQhUBVYADlJg3BwNxgvM5YSyLrVzoGLlkqP7yGccR1MrvLtlKmtINjdOFBPsWx6PQYSDfLd%2F%2B6sWxMKjfnaPgcmYP3KAIu2G%2BgIdgQG4%2Fwg9Uru6ZgAAwc0%2Bnie7VMLC8oM4GOqUBbHbbEZTb%2BvsGNhMm1XVMx2LvpcCska0GtXa5G53ufpSpvtCXzTLE1DRjLWRJSHlWsk54EwM7HoMp9Ht9I0%2FGMQTBc1npTdLWUCP2Bj60UVYkSa5BEYnCLc6P9TEH5SwYXM5D5j3buhQU6INeyvwGQSnzFyT06VAnqQr1xZAl31f8Ef%2BKcIo2OIwHXoBRb94rMsZFJyPHVRwsmPtIMsr7%2FHftKDPS&X-Amz-Signature=164d15faf480bb30ae719da0b6be1fac488d20d9c7d5f74e236d7fd9f247fc16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZSAH23J%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQDtlyJu%2FriRr0zwQGrIRHrJkn50Sdw6Qcd%2FYEdfjq1NzAIgZUe301wSWsY4fDKBOCqName%2Bt3rb8OEsB7b78mzJD2EqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBguLToXixX7jHXh3yrcAxuyLwHllBl8FpCpycQhA1o5JgCMw3AonPE7tQyBkNxYz%2F%2BukvfrNBq2QGwsevGMR7F541GOwBcYB7LT6t%2Bp7raMJFr4TeDHKNtyXxSooTjPmG%2FZtCpFKHRSjSax2yk7Djm3Uw8%2F8QMBUj0d54yWHsvKlJ8utdUvYH1DZDnV1Fi1iI3xf3aGAZcphmdBd09A9jnZ5icylapV%2FwRN9Oq911Qn8v7YKJ04uTfvFIbBn0OOAoE0vGiUCrVmUAstazZN86To6csWcethVMtwmgvVg8R%2BK81spoaHqOA1sdTnar1W47ICSO6bJMnIhqw5xXj%2Fl0QLr2Hew9r148PT1LL96QT4BBmCK5g5E%2BPzGbXFrYJiFfN6484VugzS1mYUQNVwJ%2F9TzsQHIedIzZQNVNzX0iqFv%2F4X4sb4tuJ5mIcTFEgs%2BKCRJ8mbNizkak%2B%2FTCLjp8JBckQn00L%2Fbt0mylY6TYTPghL1DCCjcJPs5SJ2SH3zU0yIRogFIw94cL6Uhv5qQhUBVYADlJg3BwNxgvM5YSyLrVzoGLlkqP7yGccR1MrvLtlKmtINjdOFBPsWx6PQYSDfLd%2F%2B6sWxMKjfnaPgcmYP3KAIu2G%2BgIdgQG4%2Fwg9Uru6ZgAAwc0%2Bnie7VMLC8oM4GOqUBbHbbEZTb%2BvsGNhMm1XVMx2LvpcCska0GtXa5G53ufpSpvtCXzTLE1DRjLWRJSHlWsk54EwM7HoMp9Ht9I0%2FGMQTBc1npTdLWUCP2Bj60UVYkSa5BEYnCLc6P9TEH5SwYXM5D5j3buhQU6INeyvwGQSnzFyT06VAnqQr1xZAl31f8Ef%2BKcIo2OIwHXoBRb94rMsZFJyPHVRwsmPtIMsr7%2FHftKDPS&X-Amz-Signature=d7be122d15de42f920adc64aeaa6421b8eeb3084a68f7d68e2715e3632b959c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFLQKXPE%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCIBkwrSO2Mzqy4YiUqXOxm5FvDeq%2FW95swV7nDB3YVBJpAiBpMmKlknd92Gj4gJINhvb0lqcE8Y9w3%2FkAQRa5hLPaQiqIBAj7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbGqW1nJX7X%2B79z3RKtwDohIQmtuMYrHqbxi%2FeUVV96BUq2cV0kFge2wEUkCTKnJ3k1Lum0W0MbTSzQTqBQHwKp6Ww59db5qRx%2FPng1UydxVXGReNiM9y9GBJBO2Lev7UihQ31Z4JTcArX3CJlDiggh%2Fuh52mWFPk%2FJqIq0eLgswD4XdLTgxNPwK1c7VSsc9hdeU02G1RfvXQgH%2BpIRX%2FnurZwdovXhbIPpMFI7oxK7E4MIk3BeHY9KHLgb%2Fksa2BJ5hD78RKXr5uzuKvB9HH6HUcNk9t5O2F8DrURYpS7h5TrES%2F0rTquNSZLaRVGkbrzP3SFHHZTFUDJJwk20sZMFJ7kYL7xC5Y9VjXCTkUdPr6Vd8Hc3p%2BAEBfOdOzJUpDfAYdi%2BEXQwXmaZBQxJqygp0UtO8H9BBjA1%2F1gYLcHCkfYB87CcAaHo6f4t4E0d1ty3NpGTPHi0BRlhhA2rKeT5vNOXt7LW06EsGUfmtf%2FOXoX5NHdJ2ms1wgoMIy%2FExbE4HTOpjAJ19qxB2oiVCmg0ZjZyOijlSimhwIUAF0t2km%2FbQDJwNUb%2BRLesDVWfsOutRq%2BM3f%2Fg4gnSNg2qfsFJMut0inGkvWTE4D5SUHR7mY1e8EDYIRl2hzps0WcvRbebTRycl9qcroGiww37ugzgY6pgFsp2u2AJ6pqK8Qcq1CyPb82UZp6EBgSMiTPC03u%2BpPhg20eXgn2bCfOrNZC4Ys2X8rF7aB%2Fn%2FlMU4RwcKjZAv1fpe2M91OL3CYZUpAObyIB8A3shKCNdKeH%2FfNx0B39AlO6e4%2BSXRw%2Fykmz3%2B4Aupa%2FlYc53ATrkZiStJydH%2BcboRE2mOqvTsYB%2B9izpsQnKaif0%2BcrUNttKf%2Frl0qHar%2Fj%2BQPZsBC&X-Amz-Signature=4dbb5a864e9f8119f1a653895131fc0f9d9aa8935dd3c8af25c86dffab6c1e1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3OGBOCR%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIH5dg1iHkeIJsbrFGgJieyrH84D2ZxPf5h%2BeRVyc9D%2B7AiEAnXfOpxq3oLSMaUrn3FtDHgU%2BDbt%2BQmSUdMshwykf2Q4qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMUjGVKeBjde2HBw4ircAxMBtxM5J3fT9DCN6a%2FeaF4sZ6q9ojEpA1WaoATVLF9S0iIkRfRg2FTZRrsJfPo29aX159Zn8oXuR3Rs%2B3gmOgVYlpB8wiMhHbR2kNOpCscBtzkHR3NQ2WsJ4GApU8L87jQON1ampV53z7qb4Pj5lV6JyrBBsP3GGHibWROr2Jj4cS3v6RbW5ZkjpgBWXeKBI5qFOnl9rQ%2B5Y%2F%2FWdxb27MkP1WgAfBn%2BX5D2SZ9BYYcwh9X1zamegG5NhM34yFsrPDaSUCR1q%2Bbeagofcf406Ge7j3mJeDyHQB8sprbTm8LBH0ksMy2fia48M6r439E7ybpj%2FofJh1YuSeRn%2F3rUHnywIaQUs3tSZDO87vJwBzSD3%2FtkurCqdXYXjNQJp0hys37WAYO0c8NzqZPkJ03opC4LwrswLHzWNRC6ZGa%2BTMThO9URz2CwpWQVgiq9HB2IyU823kNrFoNC%2BhR8ULDeREhlJe4w1KqBgISJPRPp64wh7drOYfSKYQAr1R7O41ySCb96aFRzb8rQDl4%2Be2u5F%2BZABuWGMgZ8M8jftbZnWXv75Ebh9Xsg1iDwY3f1D3fSEIEanFcyRsjsldYExLGNbFlOe3kDNJ9KnavnLyMw2H3FaBtTS5uHgyNEgMNQML69oM4GOqUBiaDbF2vvgVeIDAUX%2BwCGzpTFnyVRrjGARj%2F3VpQfYSdEDdtbhuo8rDjbEy%2BdoXBudK39iPnF9V%2BvJOlDIsZMzgWFBJB%2FGwIRmeTokBD9gDjsVND5rryXOt6WdluKGJD258DFR02yJAebLFJbt3OVbq8sEVW9q8P7UfiTx8U0NM9PK0DzZXNaxaKgPhjUU9HSADUSOEeIA3R2%2BbQMqBmNkQfg4ALm&X-Amz-Signature=2f7ea7c927a6bee8c45bdc604a24d927a199ed767c2892c6cc4e4aebfee614ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3OGBOCR%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIH5dg1iHkeIJsbrFGgJieyrH84D2ZxPf5h%2BeRVyc9D%2B7AiEAnXfOpxq3oLSMaUrn3FtDHgU%2BDbt%2BQmSUdMshwykf2Q4qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMUjGVKeBjde2HBw4ircAxMBtxM5J3fT9DCN6a%2FeaF4sZ6q9ojEpA1WaoATVLF9S0iIkRfRg2FTZRrsJfPo29aX159Zn8oXuR3Rs%2B3gmOgVYlpB8wiMhHbR2kNOpCscBtzkHR3NQ2WsJ4GApU8L87jQON1ampV53z7qb4Pj5lV6JyrBBsP3GGHibWROr2Jj4cS3v6RbW5ZkjpgBWXeKBI5qFOnl9rQ%2B5Y%2F%2FWdxb27MkP1WgAfBn%2BX5D2SZ9BYYcwh9X1zamegG5NhM34yFsrPDaSUCR1q%2Bbeagofcf406Ge7j3mJeDyHQB8sprbTm8LBH0ksMy2fia48M6r439E7ybpj%2FofJh1YuSeRn%2F3rUHnywIaQUs3tSZDO87vJwBzSD3%2FtkurCqdXYXjNQJp0hys37WAYO0c8NzqZPkJ03opC4LwrswLHzWNRC6ZGa%2BTMThO9URz2CwpWQVgiq9HB2IyU823kNrFoNC%2BhR8ULDeREhlJe4w1KqBgISJPRPp64wh7drOYfSKYQAr1R7O41ySCb96aFRzb8rQDl4%2Be2u5F%2BZABuWGMgZ8M8jftbZnWXv75Ebh9Xsg1iDwY3f1D3fSEIEanFcyRsjsldYExLGNbFlOe3kDNJ9KnavnLyMw2H3FaBtTS5uHgyNEgMNQML69oM4GOqUBiaDbF2vvgVeIDAUX%2BwCGzpTFnyVRrjGARj%2F3VpQfYSdEDdtbhuo8rDjbEy%2BdoXBudK39iPnF9V%2BvJOlDIsZMzgWFBJB%2FGwIRmeTokBD9gDjsVND5rryXOt6WdluKGJD258DFR02yJAebLFJbt3OVbq8sEVW9q8P7UfiTx8U0NM9PK0DzZXNaxaKgPhjUU9HSADUSOEeIA3R2%2BbQMqBmNkQfg4ALm&X-Amz-Signature=2f7ea7c927a6bee8c45bdc604a24d927a199ed767c2892c6cc4e4aebfee614ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTEZUDKW%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T192055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQDMr4qmC2UaUEHVO%2FPnjz9NMQfmOjuKaCokRapOAYdWUQIgFbBff5I1%2FGoPHL5W8uH2GDv53Cafe7AHHRl4c8%2F9JwYqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP0YX91S8HqNo5UlAyrcA4oIMQj6MjJ1tGT1cmHvDaJ5AJBcQSFOkOz898nMdsP8oK%2B1wZKF65vQOpgTbRGpG64gsKcztRCEm8IZAWSpxsVJGusCEVg7g%2BhOdLrnRiDMFBkyQqT2qoV%2FT41YmtYYxidzfMKE0V5naStMIzWNLLqvHwa%2BrHKVHUNyHkwBYhYVbvXIX6m4qH9kkE0rj0PSo1RQUY86JnyJSrQ%2BzdZN2bsJp172YuUwfhGGdfXs0ji9g7oFw0lI5O1DpcMLlprivqtDQb6hAVjqcgS%2FYSZLSj86VVtLr%2ByJv8IQtfz9Uk8CqpF8n%2BJytuoOyzHqqN%2BOKWihBqKuCGJK0Y9rf2ZWUjrw416xHG1gNHn4xRZTEPKXpyJOKQQnyfBfw6i2ZcWt9G8XIJe4j4Tbrv%2F%2BzCBrGB%2FgT4QwuDZjsA68tPCNDh1j54J%2BfGxT%2BjaqQSc2H8G68ZzPVDX4PnxvGzHtEoKdJrtVxNbJyqmwI%2BDhcMHSxgVmKi8lA6oRnm%2BlBwqo%2FTO3XK%2B5CGf8O6n8ebGdZhg9gIPCN50wObaJ%2Bn%2BQKB6Um54LhHDWuP3uI4mlwZ54TwmISoPFXewR5tQe48ezI%2FM1lU0Hlx8NptXyTHuaOe1eHU6e%2BDkvQuyKllX2hSsfMJC9oM4GOqUB5XVEiPaTHPoU0S7tciMvhTG9BPdxrJsFQ2neLAUU57Dg2SmTg%2FRhwuQBhRgzjpiIpjXJ05W5hC2KihVUEvu3DoN4VbekTPITEnbzqXndGAAehflvat%2BCHOqijE%2BdgNaOvXnPqngG6UEBWP6fn31wzOvO94S1nsxiY0luAWV99fsQR8NfpbfAyxR69uULht%2F736YiyB4v%2FfaX2CqrWzYzq3y%2Bx9iK&X-Amz-Signature=13d1bfd523665e43e4cd9791c2d09436e9c491c37b445b34ac98b0504fd01940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

