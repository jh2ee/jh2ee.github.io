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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AJZVYOL%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD6d6sqwUNYvEbT4U2POdohyYylT33rLymgtlby90BhNAIga5RwjnY8acccxjKXYpICPW4c9h93%2FReDBd0jHc%2FrYooq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDPSpGNtuY1WbU5cckCrcAxgrBHZVftK8MJmhipKz7fJtf1mlXSX7n9E45RGdvRJKZYrauFS8R1ugTgHgfr7I1QFVcS5Ldqtp6kEo%2BRlf%2BgFjWiKFjEMlwuD0dLgzmlBNo6G7g19Aorj4vsFZjLBu3Uxt5z8IZf2rPTenn%2FnIYYBfr2Ykr%2FT3XLM0qaHkGoZWNPVP8Lo%2Bme628ed1LiXjjij4LblHVJZrLGJReUNn87kSmXZDDrZU%2FrH79kg3OyhfQLOYObOTnE5Nf%2Bn4CT24JgNVULgLIkClENhS6BOlAqcIOC06nUGeZtqn4%2FGggTI5Cs3a4q2kCCNZz1KazNEgEj%2BUp4XYSPpeQ523PzooyxD2fF6VYBu8eg1rEuupL006H5IbdC7a5v0aCA9k6YezqtNXYHEKSz6HpO6%2FEUFgnSqTxs6erE7G1Xsztk6%2F%2FZNBDwRNaRFA%2BImI6mJH%2F7mOsJqcPdt1%2F8Nl9gODSCMwYikIXLouHGjSw9FSHwTfUjGkJmHEpwefYxAmxmzYAQmeS%2F6rhHhbEfjutSAIq5v7s8gRkscpYyKMaYcCgY3Ug%2BoawoqCc26Bsnz5nZgo4m%2F2iSJTfEOqbe7xdxXHW2ey3F5OfbBNPdfsTh0ltV3ZHTlqoN%2FOpHADj5OvAt0rMPPso84GOqUBoTyrzKXItS8h2Zrxu92pOPtT0ISrFMp%2BG%2Bw65dDrNdWR82OlQVoXLcwbWxBaZ5wF%2F45NmZOVZutWmEg%2BihQWaKOhdDA1s%2Fw7pCtL1mR3OP2ArsaVBiFbSiU1e7TfaEFNzgWIqZs2HMSsSQWN%2FReNG8NxsJF9KWmWGMeM4lLhbZoQ7q1avfoCmpuo3QpIOLrbyWaVkAWQOOG4LW18kEsFQB5vEYOl&X-Amz-Signature=d9ca302d0cf0001dcde52eef1547c9154088ea16afe1166f6b9b33ee125781e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AJZVYOL%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD6d6sqwUNYvEbT4U2POdohyYylT33rLymgtlby90BhNAIga5RwjnY8acccxjKXYpICPW4c9h93%2FReDBd0jHc%2FrYooq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDPSpGNtuY1WbU5cckCrcAxgrBHZVftK8MJmhipKz7fJtf1mlXSX7n9E45RGdvRJKZYrauFS8R1ugTgHgfr7I1QFVcS5Ldqtp6kEo%2BRlf%2BgFjWiKFjEMlwuD0dLgzmlBNo6G7g19Aorj4vsFZjLBu3Uxt5z8IZf2rPTenn%2FnIYYBfr2Ykr%2FT3XLM0qaHkGoZWNPVP8Lo%2Bme628ed1LiXjjij4LblHVJZrLGJReUNn87kSmXZDDrZU%2FrH79kg3OyhfQLOYObOTnE5Nf%2Bn4CT24JgNVULgLIkClENhS6BOlAqcIOC06nUGeZtqn4%2FGggTI5Cs3a4q2kCCNZz1KazNEgEj%2BUp4XYSPpeQ523PzooyxD2fF6VYBu8eg1rEuupL006H5IbdC7a5v0aCA9k6YezqtNXYHEKSz6HpO6%2FEUFgnSqTxs6erE7G1Xsztk6%2F%2FZNBDwRNaRFA%2BImI6mJH%2F7mOsJqcPdt1%2F8Nl9gODSCMwYikIXLouHGjSw9FSHwTfUjGkJmHEpwefYxAmxmzYAQmeS%2F6rhHhbEfjutSAIq5v7s8gRkscpYyKMaYcCgY3Ug%2BoawoqCc26Bsnz5nZgo4m%2F2iSJTfEOqbe7xdxXHW2ey3F5OfbBNPdfsTh0ltV3ZHTlqoN%2FOpHADj5OvAt0rMPPso84GOqUBoTyrzKXItS8h2Zrxu92pOPtT0ISrFMp%2BG%2Bw65dDrNdWR82OlQVoXLcwbWxBaZ5wF%2F45NmZOVZutWmEg%2BihQWaKOhdDA1s%2Fw7pCtL1mR3OP2ArsaVBiFbSiU1e7TfaEFNzgWIqZs2HMSsSQWN%2FReNG8NxsJF9KWmWGMeM4lLhbZoQ7q1avfoCmpuo3QpIOLrbyWaVkAWQOOG4LW18kEsFQB5vEYOl&X-Amz-Signature=d9ca302d0cf0001dcde52eef1547c9154088ea16afe1166f6b9b33ee125781e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7MIOQDG%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQChRkkMpalnxxfT3bm2e6aXZ3o5HbI%2FkQpPYjY7HVpGQwIgWi11yJwysFUCiGpPuhuLx829hKfMjXNHFeClkBByJi8q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDCOTz6GLvOpBM1NmWircA5ivlVYHysVsRibA955BF1NvFH1Ic1A188Hzv03nffHWCWnwXYOGjhcF1G0wSO1l%2FbiX0CYYtE4N%2B9xGUfopf0uWREvOYu9mB5YZq%2BQIWWPlVboEd4Vs04mc2VyyNexw92vx4jKgcjuk%2F2ZDhw3Ws3ffRcznC6ybHGvI8%2BGP%2FJC6puyU5Zkfh8jewZki9aWMtfWchKHDq9b4U%2FDeHzPoad%2FqoRgJ3xwlvqTfAQZlB%2BsYki9dyPWRTnu6hU8dqY00wCwIvt%2BGZU3aWjTPSZgGANgoUE8nbo5lvfAA%2FI7KqDMTPEMZ067EiLxrKqnoaOToM7BYCwesJr6%2B%2F4Z%2FmGkZ3jUj7Zzk0KedEI0fZxm%2BqhMaIbexOR1ifDFzo%2FNXX56oD9USf4bHcw0RVR1TA2zyDz%2Bdt2a5xV3sn9qjej1QtJq5bZWL1wOpI8xeUSa62LidzVJq1%2BVqaU6YhwwPYf2dhf3LNC05NMjvTf3Zs95OCB%2BIYiA%2BsECn3zzULSc7U7uIPw6bdocVDp3VkOpM5fHm1d8yc4KtoO46Sq94p%2Fe51DKrgrsJFAqSS36dXLVyP7tkla8WbaUmjP2sO5THd5W8eI2aShsD7s1hwEifAKIOt0syBnhAZWmaYOZmTpvoMPDro84GOqUBsLmAWK47ZS%2B4XOfB3udsErt94GKXxb0I5mFbPuJ86w9R9dczGnIZKfUsAY8qi%2FqfxfILRPETxW7O%2FeGYBfY%2B9erVL8SR6S2J4moAyxvt%2FCqbCRt1QjrJ%2FZ4mhd2JO7QPSYQ99gL5abawqWZBF%2BTNTgt04pedLnh8hJV9HIwUnZOTvBrxy2%2FO35lXhlKJxcM22IQgzUMskxqrf7mD25svzmYImJ6U&X-Amz-Signature=0acc2c1e8fb55a98e3b9c7e7a29f42c478c96aae93e3065bf191d2612f66f8e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTJZMHQT%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQD0DpESdvk20sCazfAPs1FG8NTRr%2B5MPK6BHvwAmazvrgIhAKTzHoujxhGFqcdU678e8qNhjVy1a2RTAxx6KfbE%2B6FJKv8DCA8QABoMNjM3NDIzMTgzODA1Igx4bVxHzskpNkczeOEq3AP5dNkke5NPJtxS7N0MvwFV89FHNN8DYDcxNBZJHgusUStcF5FKMAaqeJdOMGdqUmIKLSrjOO%2BJLF6o5ZaqTBDnTipB93ku6Vgnuo1fHjB2Vm%2F715zqP6C2pwDOmSGDOAfeOStBV1%2BRV0DVqPhKNIOAX6Z0iKaaIvWiFsF8OuwXGj%2FQI2GHTApi1O8jkta1NwtTQTiu%2BoJDJBiVHv3wYEbuVRV5FKaplkdsJSKXeWuJVYkU8i6tr5LegTY01cBG2lmhJKJ94vAWSOm7O1UPqD4yK4AyhWRYuIv3pdnUpUq9XUA5bmTJQAjgpp7ro84lsLdSdTXrKB0GgBJrXdza8PdWxJff4EI48fi%2BhHXW8o4GdkNMzAx1AYdOPXjm%2BI5wVMLHZ0%2FZb2%2B9ZC3aBl2h4yH27FBVQ%2FFdBwoMuo9AIJWwME%2Bze%2F16b3RZw6z3PbLvSH8MJkyKO6qv3o0O0Z89fshmCzuKwskmPvHNeb%2BghTLBcofmt1My6T4xQc71Vw3zpjFRHIDGiEYSKH78V7Y2b1anQDQbVHetRxLDFIEOzdpxp5o2YCLmf%2BOBiwfB%2B8xYJqQ7wmFXwuTe0hCRqD6MeiMilzjC5BD%2FzEanWsGjD0Xzzs4cc5VdJA1opuTMZzDg16TOBjqkAdExZq%2BiUcNsjfbmXmgqq%2F042mi3ykgG1%2BkBvtN80YQHAibM5NV1edT2pYQEBZoD4MNGRY5ziVqa2LamxBMKur1ArorhUZLQm0SKjm%2FPhVgYh%2FRi2WAfph7gj3OIHEOfT%2FltzdvlU6OCCQZOIsBUfFhfaleTywGFnGsUDMxtdHbKanK8XTQJpnqP%2FyNh6pG1I%2Fd6aIdf%2Bt%2FzJ42ckU4LyeF4BR5b&X-Amz-Signature=6f3fa6c2e301e575c203f563127f41b05e3ee2168d62a49fdde308cc751bbf44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTJZMHQT%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQD0DpESdvk20sCazfAPs1FG8NTRr%2B5MPK6BHvwAmazvrgIhAKTzHoujxhGFqcdU678e8qNhjVy1a2RTAxx6KfbE%2B6FJKv8DCA8QABoMNjM3NDIzMTgzODA1Igx4bVxHzskpNkczeOEq3AP5dNkke5NPJtxS7N0MvwFV89FHNN8DYDcxNBZJHgusUStcF5FKMAaqeJdOMGdqUmIKLSrjOO%2BJLF6o5ZaqTBDnTipB93ku6Vgnuo1fHjB2Vm%2F715zqP6C2pwDOmSGDOAfeOStBV1%2BRV0DVqPhKNIOAX6Z0iKaaIvWiFsF8OuwXGj%2FQI2GHTApi1O8jkta1NwtTQTiu%2BoJDJBiVHv3wYEbuVRV5FKaplkdsJSKXeWuJVYkU8i6tr5LegTY01cBG2lmhJKJ94vAWSOm7O1UPqD4yK4AyhWRYuIv3pdnUpUq9XUA5bmTJQAjgpp7ro84lsLdSdTXrKB0GgBJrXdza8PdWxJff4EI48fi%2BhHXW8o4GdkNMzAx1AYdOPXjm%2BI5wVMLHZ0%2FZb2%2B9ZC3aBl2h4yH27FBVQ%2FFdBwoMuo9AIJWwME%2Bze%2F16b3RZw6z3PbLvSH8MJkyKO6qv3o0O0Z89fshmCzuKwskmPvHNeb%2BghTLBcofmt1My6T4xQc71Vw3zpjFRHIDGiEYSKH78V7Y2b1anQDQbVHetRxLDFIEOzdpxp5o2YCLmf%2BOBiwfB%2B8xYJqQ7wmFXwuTe0hCRqD6MeiMilzjC5BD%2FzEanWsGjD0Xzzs4cc5VdJA1opuTMZzDg16TOBjqkAdExZq%2BiUcNsjfbmXmgqq%2F042mi3ykgG1%2BkBvtN80YQHAibM5NV1edT2pYQEBZoD4MNGRY5ziVqa2LamxBMKur1ArorhUZLQm0SKjm%2FPhVgYh%2FRi2WAfph7gj3OIHEOfT%2FltzdvlU6OCCQZOIsBUfFhfaleTywGFnGsUDMxtdHbKanK8XTQJpnqP%2FyNh6pG1I%2Fd6aIdf%2Bt%2FzJ42ckU4LyeF4BR5b&X-Amz-Signature=af0cb45ad69299a2a986e01cccdb3ae882a42c38e4e8a4629ea4e725617cb0e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZL7SEBS2%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIBXprOc0SEmLGxYhEL2S6QpsB1WPGBIHgiXw%2FYl%2BU8dcAiAV2Xt%2F4oMHoVcuPQJhdU%2BSFC5mvrZ7Y%2BxLmUqPUXmi9ir%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM31l9xw%2FxGVbXvad5KtwDRPP8%2FqrPsWwXNu83MQikomVC90aEzmYhmPh%2BQD24fVJn8c0Ts2Qiyp3BT18kYrHVQg2AlcMzjhCm3PfCFVvn5XgrulanNxFGOjUfcLJ8s1LuVOcQ58AeQr174POH7zoFEGlar%2BdSbV0o2X4%2FHfDRBIJIpMWFuLocuWFjxQDPGXylmNo5CVSslXJ4kQdnMqO2fdIwFe4KPX%2F0w%2FlCVQPyrMw5KlHmch8auEiKs9wSTfUDYh27pqEPVm8GReP7FMtPx0p2tCmFdoOjC7EwiRiquLRi8YPJag7UP32D8WKvG08Vhk36eaYjxORdaD%2Fxkuiz9XnooVreU117TLwtC38QqY6jDuwKJ%2BZQpOR49wiuY28ysOPup1q54fj1LSUlVdJfOjvmeN9nolhJhAzczRa4SLuX6PCF1YfxgVDgZ4YE%2FzM1LC3t%2FU7FJcmJn4QS9kcBkAwNY%2BwAZceLFxneRq8mxwru4es56RRQrxqzLscGiXycxjZZsS3SuLOs%2BRIQ2K%2FIVU0OMP%2FqKHB3s7v9B%2FKJg%2FuDC%2F0JirrvhutzaVnofUaEbsIiQKPrEgzGLYBC14X%2BBei2TEt6a88BoRepAAhKSI2mRjLvfTz%2FN55XHYg%2F0fJqiDGJAtsVltZBB%2FUw2uyjzgY6pgH50pqcYoYOiSIM9K5ivmojFQysfvHOMJJZfg%2BvE6fL0g%2Bk1EeF1R6%2BDlCmOkjynQ8YRdFC%2FWRB8YDs7BCjzPnWBNtJSt7HEw%2Bah50y8FXHJ%2F8Ry8GHblAKEzu0JllYNBy7KZCcHpCLQE3KgjqfDJTPp7NDaGc%2FBgYUD%2BY7%2BvnmZLFbMSD%2BtADyJj8JgDb7uyAGcAS2B%2Bufoc9LnVzYsWjyJHoI6%2F5F&X-Amz-Signature=c6726d3fef3fdfa6dda70d753ccacd4052562bc4317672d9d2744d18f972576d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z57MNJRT%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIG2EhHN55hwzHtiecVuW2lj6J9XE2kmuOC7%2F678CiHLyAiEAn4uxgFDOxr%2FSySUpI%2FUTx9h07fhvo9Z1Rlk%2F4vkOfgMq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDCfCLzrx5%2F%2FXQHhqsSrcA8IN7bK5QnGv6DF5KGpe2ir9ddV%2FscFbCPmjZgun%2Fnkkl1WtCMpEBO%2BsbIQWNGhPEATS8PVUggH7dd8XcGQbU9qaePd0J5vmIJgX7hVImCxSEnDKUj%2Fs%2FoocjJ2a3gCzAyYx2GlX7IQW9toM%2FIEmwkwDC1NQgriyTCkFVeX2l5XcrVTSv7CorPygQTMoRky4zqJAsLZRV1%2F6Fwo87TCbeM2USEi0s81Ipdh7MjFKWJDbHUBvtcEypyAAQOIFY6jLtUFubueT83U%2F8E8DvJKpubtS55BntHq1VAjNXRamwmDINLHetsaRd%2F0FsJmX7HoHCFmzZ1AtjEHmejoiYHrWKrxnypZLzboYePhIILv6wDFrYcnBYZ6MO%2FpqIo0g96wSP5OQaT3AGt4D7PG3V%2F5bElacjr7ve7RCA7E2D1tXU%2B43FnQ7Vz0zGJ4mCCkmPJXn7n3e24xpB%2BFljy4jXqJI2N6qhMVbKOtpGZ%2Bud2X3y1kmTWKKEDYXLyTjFeP3%2BJnJQi6H%2Fw03ZUYsummaXPeZgZUwtmjB1JsXtZfwboZpsUua3j8QivBocH1acfzEBU3P90y5Cd9XkZFV02t1i%2FgTzBI2sVGlW7VrgGJlXatLz3hyuF4PjXwHM%2BnTlxylMI7so84GOqUBl20nSeix393qEaw8meM%2Fd7byakrg6bWH4dtLD5ZCuRRO8htF7sjvQjFNaXLDKg5dZhEJOBFJjNlQLXAcNgsJ4e941zvnUwzeoF6cyY0V1Ig3H1c2Kg%2Fdh4a%2Fm%2FYEvKjC%2BgjN5DM%2FwzV4ZtMuKcJkg3IB%2FErmD%2BUwGbYhjb9Gqj%2FHvDUChyx%2B9S9hvqA6tEx9bCk20R0LyM0n53Kbwud4G1C7fR5a&X-Amz-Signature=029b08b6525314f2c968918e7b3cb8a1f0078a107852446f7d35ab2cab1b52b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GZFT72P%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIGqPx0ptIyLAAY0leTNeid0FeV%2FLFdWmC0xEQH6eNHWYAiEAxyC4AFIfWKgst46gUTWcgEALqJeT1C042IOndArydlsq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDIzGgbRICWKuaXtEXSrcA%2Bf2rwGWSY7ahnKqU6BqXYh8oVAyscVT%2BurahOZcs87GTqOqZacIQP5Ny4M8GnfAWo9rvvx1LabTtwyDbhvMZjyNbesPImmeQA4juttqbL07MUdkJuI9q4AKFUENyUqKKxkMS6kgg8vOuVY818TA5OoTdfU9vnRvd0yANu65tgSaKz5RUx5Yu9USveL04UZOH%2B01X%2BSL%2FJnvQZEED9jCM%2FjyzKep1Waj1bRsYLy3qrK2vGUwPqACH7TBRnkWcDrFtLgyOq3DssjsARby9DY%2B%2FaktCe4IRoIjdBJV2QgMzS7ieO7plCBr28C3YM%2BdOBbJTMcQPNfIOXW9TxK%2B0p8%2FLd2gnmp9%2Fuq1byu7EENQ2LItHaBDD4mwhoSpbDma96xEXMXFF6mOK2YLC41JUMNbwpl9ZcFEve%2BjMUKMY50gbzZdmNyfS2t6OQaE47PGAAEZRoJo6cCvGqI9V4gppVBuHkEh69pJBSjzzIOwuMokMSBZpYkHqkCQM9pSy3oUczPVEUtdRbSRJwk%2FnX%2FCoF3dYqCEcVVjuluCM80%2FzYkHXXbApRQYbxQpa4mbFhRLTxiEVrVb80uyKxJLEi7E7mgy20fZ%2Fc5wofwTBmGebTcqqjIWsWy4vhKgxndyA2jCMLrso84GOqUBInEsvrMoitMdXbHYWTl1jw5WDegC1hplxm90Iw5y%2BTFkjDqZBHtqcYcrCDEQcBPcu6dSLH09oiTc3mqWoaBEZJNB2DVq7VNNCB%2F8EgXngszq1mQPaV67QPWJDOBpPsev%2B8cGzsvO73N8mc%2BAGW6iCh5x6z5eWksXwpBn%2Fd55yfxWD1IgjJzhk%2FDC37tnP0c%2Bk7vVQ6jIva9S92JCx0WNH5yzNrdC&X-Amz-Signature=6cc750ce950f16e3d50131e674a75ca9a4b5b439be6e96dd6ffa0a1ea4a0a840&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UGP2IVJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIBa9Amq0uh6vWd4sTZQhoAaVTCID4zkz7bMOqv9awlUjAiEAxEgMZR7bZiAZBl0q%2Fad%2BUuV9wus9ma9%2FUbUhowfm%2FZQq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDJsiZQ17kA9csJPFwCrcA6rao%2Fi55qFtLA5jXiE3fnk%2B94fbaXzlNRUJNqcAfxL6gapU3e8IssaINHgnITt5bCG8xuZ%2BdLf4IF9ikEuxM3MrokHlWnTY00cFu3W3FpjNIjPU%2BcUe%2FAydL6df6W0G4i4jPUiRBewtvsSxZuYCaWZ65HUnuYbyFkIWGH%2FxXhr8%2FrQlu2%2Frs6CTFj1wN3s8ykTCvZ0UOJ%2Fi%2BXINn6I6cDqXwa36PQu4gwxs3VQRhs9dEnk9eninx4cE6m0vVowJZUPoZR6p5sp4iWgc3U71jS7jd2YEYP0fiMdeG6i%2FjHGed%2B80efuUhMTw6DGESrBoqdaCHfDv3SBsHezIZMr%2Ba6kQJ0QzUbaUEFWPQvHlyBdd4g68wN7gXyPparzK1YXp9lDoJ0zYvLpestwGyiBLTYI945%2BNLaJneo2XnaTIETXz%2BRA%2BPkqWBfVfV%2BJTRVMox5yGOVVQRmqyb8MYmkX%2BEzIIkZbSgeGJf2LzMd58J9fdnLlIJW9b0FWnxtCPl92uYzU8czq%2Fv2S2Jk5HnSwTHFAZ%2FOYiArDxQJZtKycidHAViCHpVo7%2F9sQp2Iewmcjb81us10Z9tbRwnc2A%2BRQMNIAig%2FiY5Cb9SENWYqUX%2FXpV%2Buq9rsAHlTckLf3tML7so84GOqUBscXm%2FTOXUSjbsd4zxqvcD9Kc%2BFOzxhgEqTt4GH9MQCstEu%2FDTenAHfm0ZCzIyVPpRyaUDQAjzWT80Hg7Qm5aQtO%2BClWbafrZMqZq2CpDth3tCfMGp15vnm3uvNC23kvSh7CfUDgP1eMzXE03dC5UdAv6yxc1WVfd84d6jTd1f0cFyq7wb0rv6UDlPzDRLl%2B6kVjY3KGeVMhDo%2F7QTF69cNxpx9fD&X-Amz-Signature=0d9462410636a356fdf8df07ad4a7bf65ff2aca2d2a4df6a074c25e986ed665d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UGP2IVJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIBa9Amq0uh6vWd4sTZQhoAaVTCID4zkz7bMOqv9awlUjAiEAxEgMZR7bZiAZBl0q%2Fad%2BUuV9wus9ma9%2FUbUhowfm%2FZQq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDJsiZQ17kA9csJPFwCrcA6rao%2Fi55qFtLA5jXiE3fnk%2B94fbaXzlNRUJNqcAfxL6gapU3e8IssaINHgnITt5bCG8xuZ%2BdLf4IF9ikEuxM3MrokHlWnTY00cFu3W3FpjNIjPU%2BcUe%2FAydL6df6W0G4i4jPUiRBewtvsSxZuYCaWZ65HUnuYbyFkIWGH%2FxXhr8%2FrQlu2%2Frs6CTFj1wN3s8ykTCvZ0UOJ%2Fi%2BXINn6I6cDqXwa36PQu4gwxs3VQRhs9dEnk9eninx4cE6m0vVowJZUPoZR6p5sp4iWgc3U71jS7jd2YEYP0fiMdeG6i%2FjHGed%2B80efuUhMTw6DGESrBoqdaCHfDv3SBsHezIZMr%2Ba6kQJ0QzUbaUEFWPQvHlyBdd4g68wN7gXyPparzK1YXp9lDoJ0zYvLpestwGyiBLTYI945%2BNLaJneo2XnaTIETXz%2BRA%2BPkqWBfVfV%2BJTRVMox5yGOVVQRmqyb8MYmkX%2BEzIIkZbSgeGJf2LzMd58J9fdnLlIJW9b0FWnxtCPl92uYzU8czq%2Fv2S2Jk5HnSwTHFAZ%2FOYiArDxQJZtKycidHAViCHpVo7%2F9sQp2Iewmcjb81us10Z9tbRwnc2A%2BRQMNIAig%2FiY5Cb9SENWYqUX%2FXpV%2Buq9rsAHlTckLf3tML7so84GOqUBscXm%2FTOXUSjbsd4zxqvcD9Kc%2BFOzxhgEqTt4GH9MQCstEu%2FDTenAHfm0ZCzIyVPpRyaUDQAjzWT80Hg7Qm5aQtO%2BClWbafrZMqZq2CpDth3tCfMGp15vnm3uvNC23kvSh7CfUDgP1eMzXE03dC5UdAv6yxc1WVfd84d6jTd1f0cFyq7wb0rv6UDlPzDRLl%2B6kVjY3KGeVMhDo%2F7QTF69cNxpx9fD&X-Amz-Signature=3726a88f4cd2c2287bf1864f17b0212e94bf54ed26cbc429e1d2f302efead366&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGERK7Y5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCqum5j3tqgj%2BIaYf3IiN9pzTEdPHnyOBl5%2Bx81KfV18wIhAI%2BlRK1w8KFZzXUOYf3gm4GOjtwHlwdPZp9MhwSAh1QdKv8DCAsQABoMNjM3NDIzMTgzODA1IgzWU7g%2FApowSZccEgQq3APjVVZRdejqhskqLsxQTnGoVJjP%2FO1OdyOt5z6dzNlROzAr2ix1clwwzNydsk1ZdSwxrTi5aHnV%2BPm2%2FDA70L%2F5prmKQqQ1StEuTulSzE2yg1WcdRvRj7BiSOQC8q1esVt%2BNpMeZ4IITnZ%2FFfGDe1qk5G2A9UogkJj19LaHn6pNheO06CbAsesFZ2Q45yEjvPllrjgiffPIjNGGpzwrTM9FKZ2vtOnUIQfExxU6qfFM42sDfNd48FXfx3aAkwHSi6EzcAxkVvIprPcd0d%2FtYFFDBgKxJEr2BtHAwjrE%2FWI2Eh6V04ZrjjuWHYWHIO%2FfgsW1NzIJOIiG0eML213gdA0%2Ffh35OHda9jJhttApy9EpqSZENI47yEN%2BMP2PNbGaJgJgLUIAjTdho3yuxCbXdlyhhIXUUW3UZI9s7F35oOjnvtvUG%2BJNoXODuJ7Cd%2Fx1gzOpzkfkVOS8U0yOXKpXkIEh%2BqtNC3Q4wg151J5YyA2flcT5y%2F%2FWKgsHILpK19WGA3XCWT7%2FyEwexhUxKpbmb4DPy2RedpS9HucJ2YuT3dbrLm3lH8XTFd0knoUxswzmlS5JZmxkJjtSz6S8aG0veb5OZ3e9bL0Ex%2Fn%2BZnw%2BOizXB0wfZ1RXOiw42uRLEjCM7KPOBjqkATHisrsOx2rTQ7YfXGbxQDk6qL3p9QtVoG8tth%2BVjgRpENpLM%2FHNy60L6XydU3DRmOUyUEmOMiYUp8sJfg4IxoXy9Ljo3R%2BKypgqrwb2QzEnQavPybpHaDKwovisxTtRiIsGGlhrh7itC2cD4Ev6S6%2BzWbuM1xwb3i80I20eb0V%2F%2B2czgF7JRHgmrgOdP%2B1%2FjCDW3mZMeavZ2eSfcpgUQzmH%2BDg4&X-Amz-Signature=b2dc73db580bd9c5d7cbbf2964567e72f9e2548b1afc0c7eaf25a46455155b82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SF5GP4QL%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIBXKoCGYrMrps57U%2FoVkA90x5ev5IuFjFV2Pti%2BDl8hbAiEAns5jUcdH4%2BwlwoQqvGXXTSB9zkeYBrfmrm4dtINYUrkq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDHkmeZj0hcuP5dbFOSrcAwEXzIhegwySlQ8CATSp4BWUQ2mODRS6NZgZbjhqCOHOiD%2BjZ9x4mAbwwahCjJif8rMBx51X8Wlr7%2Ff%2FUfHxGIGgdyYP7Bu%2FDj1uBeinZHGAS%2FvURtk7mW9KQODPmBMebJbaCUikb0xIZp7%2F1LzNKJYnlXno0TaJeUEEnYXdUxOc68oCLpKW%2BCyJ0F73yeRYdyhQvYBMCbuDG8VLksGR2a0OEM6f%2FskqDf0m0cjWOJTscUeVkMzk3Uqu%2BxA6DXsUHCvy64uV%2FnEHlanCEFPS0wube5Hr6g44q5thBwZF1fJEEKeNhQ8lUgA19vBFyXJuqTbvNMCDafnTSCz%2BNmJmpAtiWzNIoQb%2Fz7vgh3qrkLS2A1B%2Bsd%2FjIKEgn7xHjBPrePMKGh3NhvFRpcMGE10%2B9zm6t%2B6WYHF7C4YutrRZqBBR3Z4VlU5MbMCogMqaWq%2BvheM%2F4WGQ4RlrwqZ2lMB%2FbaM1YDtZ4goOW2MYFJvS5f41cIeEFDtcLuos833X9Tz7epNqkAh0Elu4ZL99CMxMJ%2FkgMicuVDpg6QtQyqBXguhcmVkVc58nJHSf7iAJvICDvYHoONFyFT0Nz7cCQuqHNU%2F87wJSkIcRXpDyIgihOyDF1rnuV7jIP7b0cm1bMJjso84GOqUBGYmZiEa%2FVJvNSlWRI8I0MjXhpWV96hX4Vzsvy1Yooq2iy5vPb61kD81Vu2al7iWbF76mJydcdrdqqgIoDrBtV0hDwa1Br%2F%2FApweVlDJYapi2Eyn47OH6zlRPNHdxKw53uks6ZxbwDjo6wMWg4VpkGQ6BATAYm%2BbItlDUEbRvhGXZKzXLxzFMzLLz3M2zQ5lnrbiTTb6Dj6KhxZcYH5EiqBKMGaa6&X-Amz-Signature=64c6aeda9e8a8f86d0ed838bc3c940b3622c76a48662dba5ed71447ad58e18ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SF5GP4QL%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIBXKoCGYrMrps57U%2FoVkA90x5ev5IuFjFV2Pti%2BDl8hbAiEAns5jUcdH4%2BwlwoQqvGXXTSB9zkeYBrfmrm4dtINYUrkq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDHkmeZj0hcuP5dbFOSrcAwEXzIhegwySlQ8CATSp4BWUQ2mODRS6NZgZbjhqCOHOiD%2BjZ9x4mAbwwahCjJif8rMBx51X8Wlr7%2Ff%2FUfHxGIGgdyYP7Bu%2FDj1uBeinZHGAS%2FvURtk7mW9KQODPmBMebJbaCUikb0xIZp7%2F1LzNKJYnlXno0TaJeUEEnYXdUxOc68oCLpKW%2BCyJ0F73yeRYdyhQvYBMCbuDG8VLksGR2a0OEM6f%2FskqDf0m0cjWOJTscUeVkMzk3Uqu%2BxA6DXsUHCvy64uV%2FnEHlanCEFPS0wube5Hr6g44q5thBwZF1fJEEKeNhQ8lUgA19vBFyXJuqTbvNMCDafnTSCz%2BNmJmpAtiWzNIoQb%2Fz7vgh3qrkLS2A1B%2Bsd%2FjIKEgn7xHjBPrePMKGh3NhvFRpcMGE10%2B9zm6t%2B6WYHF7C4YutrRZqBBR3Z4VlU5MbMCogMqaWq%2BvheM%2F4WGQ4RlrwqZ2lMB%2FbaM1YDtZ4goOW2MYFJvS5f41cIeEFDtcLuos833X9Tz7epNqkAh0Elu4ZL99CMxMJ%2FkgMicuVDpg6QtQyqBXguhcmVkVc58nJHSf7iAJvICDvYHoONFyFT0Nz7cCQuqHNU%2F87wJSkIcRXpDyIgihOyDF1rnuV7jIP7b0cm1bMJjso84GOqUBGYmZiEa%2FVJvNSlWRI8I0MjXhpWV96hX4Vzsvy1Yooq2iy5vPb61kD81Vu2al7iWbF76mJydcdrdqqgIoDrBtV0hDwa1Br%2F%2FApweVlDJYapi2Eyn47OH6zlRPNHdxKw53uks6ZxbwDjo6wMWg4VpkGQ6BATAYm%2BbItlDUEbRvhGXZKzXLxzFMzLLz3M2zQ5lnrbiTTb6Dj6KhxZcYH5EiqBKMGaa6&X-Amz-Signature=64c6aeda9e8a8f86d0ed838bc3c940b3622c76a48662dba5ed71447ad58e18ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXJTD436%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T142231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIE%2F0TulURx77Lz7pNtJ4yyohPr9CVtZoTa0yfFHpWYP%2BAiEA3fYcSaSfyUTkpbldJRP8ckg%2FLxBs6vI%2FvQIsvQXHoywq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDOoemO%2FvfBxi%2BIx0dircA0rkY8PQl1FQ3Cf8%2ByLZGnIGF0D3vKD%2FUD7mFHqR61aA4iqz618vqpbaZxFhuzkd7Q%2B%2F50PprwUB2FvF0OYe7XB5GyY2DIrE4D9o2%2BuTbziPlgktDNpk0a1SY4LqOaGiRT4WOVo0IvJFQCt5LI%2BeSUBXdzlSH1IL1xBc9L6LlhpJ3saHQeB%2F%2BOS2n6m8rSzmJlxohru5o07%2FrOB8%2FIBZhu%2B9NuIyauoDoVm%2BTZUNo9Z3Z03BAl7h6XTdekMfTbBCZdV9kp7isGAWm%2FKDoFT9LUv56dffEHNgFEqdpGH3tW%2BPpEo%2F4FJUnDoGmeccnZM5BA2lK22QwhjI6icLZrLxr0hi6gO6gxk3jeyvy%2FNvtvExCgorsizJB8Q%2B%2FQI3hVkcO8LWwx2jCkum7hNu9rfA828s2wuoV66Zdg9MHP0Y1QGrIClGgvwEC%2BJlNIOGbb5lxl3xuGqGqacPfNcbQfrE3g1caKvuxp5uCgjL6xRCC1UDJ7mn6DrukBZwPcx%2FwT4uK0fg5COiGqLGymzycYzZi4gvOBPTsn%2FB6E23I2WiBChmKPAtj8hP4qzk567re%2Fjfy0eQAOn0oGiuFmYdP3wEE1GuZCch%2BirTcBugCl%2B6Xt5oECjsDND%2B9wp5BV4fMMXso84GOqUBi0W%2FQn7UTgyYfs0fJDddj5MWKdQ%2B6ro2qut4NJDGRPBzZPG%2F4cIW9ECrpvP4ZQb7SWue%2BFVIUBjwSpNonphEQCZ7T4A8eoU%2BxVwmTqmmq%2BbKWZWya84E9UyH8FSqubNn3f8myf6R5fhkL1E6GH65HS6i%2FSXyyxZgDM6Ar%2Fq46d%2FGo6auKRroVB7iNojL5uwR1OiFylcivsTfXvcR6oeq3585DYEV&X-Amz-Signature=a485f420192da8a418478d05ebe603cca68bf6adf50a9ecdcd7ad41e1e9f55ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

