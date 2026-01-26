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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TU3B7V2%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCm1dmUg0FdIvTKq%2Fj98hIcmsFQDhshX1qJTTV9pSJ2LgIhAO2t%2ByXXVsRoZZsFtE9nycqv7RE275gIvwnizIsN%2BjN8Kv8DCDsQABoMNjM3NDIzMTgzODA1IgyjAWdmI8vrhhL1nUYq3AMXAEHptX2X5PCxQJ1Rg4cdDnHw3l2cbq2iKrITKbzMjvxsnIDQ9Bynfwftms4aPGCB1R0BHvfrPv1OHi8xZq06YAlHfur0ISVt3iLury38O91LNdVeXiYAgxBG6NwNCv3%2B3d7ylI9%2BcSgrb08Md78EVib6UFoCUt%2FASExZRZMSsEfsfNzW7dyXpIEx9D79xhA9%2BPjpYubGuPwreWYwjWrFVAMmAb3lRHhS5s%2F5bn0RvqUe1oXhMGaV%2FT5vO7KXVDTSrQJcOU%2BbJ9BDZ6hYX2AwLzgN9L0O6u16teW9SOS%2FlOBBGZcAb8ib9wSGYD5cN2C%2BKAuSFl99bb4ayCQLprVHeXnjR2gaRgEsnl%2FpGUap3ecX5dxD3b0lTcKAZgve38Lw%2FuTacSz%2BlWD07VADgpqyOxg3ZrTmFtZ02BFLD1fhEEqJAcCg7KfW3As6HrW69r7taVssc3weXLzQeW27bN1F3YA1Y1xyP5EQFDM0n8%2FpJ04OhfsviRm3iSfnifByfzaowwFD6PP03hrJSVKy6cKZwvd%2Fv%2BKDb2h7Ha9ryh%2F8fQdOH%2FUNmy8624EWj8zxPtS4SxF8wDn9PAxIvqM9005d7fLe4H6g%2FJKOz7GmrF8YDlHmKK1Phf3qg8KULTC1g93LBjqkAfu8HBhHeLk0mXp7SPOILsfy7v496y2Z4eZ7B2pIhce7dolJrJsRGD%2FBOEuAvla6LPUZidagCAcy7P63pkD43paPe3ExzBYf%2FefqQ5oijB6xGih0G3mqMP%2FFCL2kRoGG1C1rhgWqkaBzzZKkmEs0bE4AvQYm7lyqycNKzKvWKHAkcsQUQAKMkUpUD3Z0kq%2BwUOEWp6XXv7M5xcpcFpzHddcAuwAB&X-Amz-Signature=a7db46e9e770e6bee12fd7e841100c76b3eece38ee663beff1969e8729b6aa93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TU3B7V2%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCm1dmUg0FdIvTKq%2Fj98hIcmsFQDhshX1qJTTV9pSJ2LgIhAO2t%2ByXXVsRoZZsFtE9nycqv7RE275gIvwnizIsN%2BjN8Kv8DCDsQABoMNjM3NDIzMTgzODA1IgyjAWdmI8vrhhL1nUYq3AMXAEHptX2X5PCxQJ1Rg4cdDnHw3l2cbq2iKrITKbzMjvxsnIDQ9Bynfwftms4aPGCB1R0BHvfrPv1OHi8xZq06YAlHfur0ISVt3iLury38O91LNdVeXiYAgxBG6NwNCv3%2B3d7ylI9%2BcSgrb08Md78EVib6UFoCUt%2FASExZRZMSsEfsfNzW7dyXpIEx9D79xhA9%2BPjpYubGuPwreWYwjWrFVAMmAb3lRHhS5s%2F5bn0RvqUe1oXhMGaV%2FT5vO7KXVDTSrQJcOU%2BbJ9BDZ6hYX2AwLzgN9L0O6u16teW9SOS%2FlOBBGZcAb8ib9wSGYD5cN2C%2BKAuSFl99bb4ayCQLprVHeXnjR2gaRgEsnl%2FpGUap3ecX5dxD3b0lTcKAZgve38Lw%2FuTacSz%2BlWD07VADgpqyOxg3ZrTmFtZ02BFLD1fhEEqJAcCg7KfW3As6HrW69r7taVssc3weXLzQeW27bN1F3YA1Y1xyP5EQFDM0n8%2FpJ04OhfsviRm3iSfnifByfzaowwFD6PP03hrJSVKy6cKZwvd%2Fv%2BKDb2h7Ha9ryh%2F8fQdOH%2FUNmy8624EWj8zxPtS4SxF8wDn9PAxIvqM9005d7fLe4H6g%2FJKOz7GmrF8YDlHmKK1Phf3qg8KULTC1g93LBjqkAfu8HBhHeLk0mXp7SPOILsfy7v496y2Z4eZ7B2pIhce7dolJrJsRGD%2FBOEuAvla6LPUZidagCAcy7P63pkD43paPe3ExzBYf%2FefqQ5oijB6xGih0G3mqMP%2FFCL2kRoGG1C1rhgWqkaBzzZKkmEs0bE4AvQYm7lyqycNKzKvWKHAkcsQUQAKMkUpUD3Z0kq%2BwUOEWp6XXv7M5xcpcFpzHddcAuwAB&X-Amz-Signature=a7db46e9e770e6bee12fd7e841100c76b3eece38ee663beff1969e8729b6aa93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SY25CX7I%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQC6LyqjYDocaB6TLaF5B9dSeCV2DxcFoCTsn85l9mi84gIhAPptmjao2iBTfNa2Ng1oFhoE6HC4HaXztxrfsJEJkl%2FOKv8DCDwQABoMNjM3NDIzMTgzODA1IgzMzEsMDYmb2Xhve1Qq3AN7igvvX5US9xUBvG79H67Vaf6qYP66hI2KOyp19DR4oPt4fIaGGBsDefSYdxd8Oti52WyuxruCq5%2FR3rcXBdRMkQQh5Bve4nAsm4HwE3rPtIgOqH0%2BMFlBWXo67VSkHDbW1tFKgFUB9JhxBaOmM6j6fYWcuW72ctWuuaPfENJ2CIcnDz7IC1eN9LdFiW2xBRtBkkJ%2BgQps5aK91Rx3tznrg1Vvyi46OZ79Eft%2FBsfqHEn%2BIZq2aiVIVXVNNpVYYCAxotdxwSw8aPGlTMhGiJyJbHeoWIMh2LaeLu0XEqJStXsz1ZkMfjTbfi5eGhRARTkT%2BtoZ8fJcTi1VVwQzOgOBUP6lfE9Owkw0EyHX5XzmjvraJPTkDRgFTT7PssCKAr9QW6QA6INzByJHOI1o%2Bh7zmCNEkoHRgrGuYnxTrZGIaCJdNLKnjJ8XvkzQ%2FGFvTpzC8xbaDD1vPBblOqzC4dIbjey0Iw9z4s7FuIjN%2BfDoH%2BaNESlG1SgEZafoMtXgpxVZZzSNfk%2BS8SRHsfNz66Gd6YY0uE9dKK%2Fm05IO5gEos%2FKEDfJLRP56wumFDdDHyTBVzADbk3NegKfNZQmQCwAliwviuQuHSqCFZablujNNZh3pp6eoayTiM4ypBTDAg93LBjqkAWmKY0nr1dE9FQGf%2BeDotrUj2tnkkcyuusyb%2BNKJ9qQj7MUXYPKZfIM4sJLOMg6%2FxuVX1g%2B1tdOgbW7wr90wMYZy8RD5rKf8xspWBkfFsmFuu2sZIiULlYVi5PwP9Iga5C7lqu5AIeKNuPAGip%2BUKDlURIu5%2BD5BtnsPRvE56H9WsFahLoWCQYK12KBdptoLjDNhuq3ZAAikY1oZZZ4xAnhX5noz&X-Amz-Signature=67bbada8654b7deb746a84c5ca95eeca0972eae23771db80f100ae8a7a745a8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P2BSQUL%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCICKnZ2Q5TfTyMrsCOl1Cc0bI3ro%2FfPy25XZSFHeii16MAiEAudysY7VvE6wOHY29I2a%2BBVFD7lReYWfzQ0xmwGoK160q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDG1Z%2F1RVk8SDtxkX8ircAzckKy%2FLqLlCRzY3ALuE5AJ7p8RA4XaZYL3nF025zT3T1SkKVDc04EdzlOpG%2F3og03x9j14qNoYhlwiKXiJIvkwsjpkzWa9BvAPI3grD0RH5n1c6DNjTmejnXW4H2dmSQr6FHXIv0ArQ3nTcpHsqKsGapZEUEe5EHr99C6geyH5OZAdbHgHeWe6au7MsQM0zLsyi1w4%2FWqsdeuyPGSSHidj3Cy0i1lr6PSdIiAwge3ByUQzQoG6aklneQVGt3BzBl53wbhWbCSu92ZXOloCu3SxHISIiCaqJlK2qBWWOjqVHMetorFLnhkKHZ7gkwlDHbcp8qJDtkW7h1%2BchWbmv%2F7zt0nix2Tojob4CPwJlrHutb7pQ8J0qa34cXPnInc%2FTCJxsPQSUq7935pQlErzdZrmBxFGUuCqEqai0h3xBICSMPwVPRlNm%2BDjc4Y055Hzls13VpForNa6FO80YrfmSqmo6i1Yl0OTaJ%2FTlWpsyy7cSHvfSPMdCpwDXIsrLFt7o%2FiJryYoDtSVmTjyo%2FwwdgCCqzHywWwz2IPna7jwsBadVEww8hbfbOkPfv%2FmxzgJE2hK7P%2BIoKX%2FU6xChKm%2FvkaL%2F%2Fx9Oo48G7ms1MmrZZS4ebxpNaK0n3h6IGZivMM2D3csGOqUB5vS7ruXv1Htrg1gIzAXj%2BIpP09GKrgPn7AV%2FZeCZgLaH8WOSS1tSyy2Rlv1Vq3xOlc8xDfeE7ElEG1DTwtZGTK34GEBYaLGC%2BTC6yMHd57PJ0sd9rtC1N%2FCAH7fw%2B2mo3rW0iJAWF0lSzm9j1y3wcfUxxp5kdflbteNKXHwJDNoN8OIVo3bu6A%2B60ryE1M1M3TRaqGma9HnsJychggHyCQHw%2BdUi&X-Amz-Signature=7609cc4f312f1b1e23313b940fccaf4e8c34770fa0c801a31ae60b4615bb3738&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P2BSQUL%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCICKnZ2Q5TfTyMrsCOl1Cc0bI3ro%2FfPy25XZSFHeii16MAiEAudysY7VvE6wOHY29I2a%2BBVFD7lReYWfzQ0xmwGoK160q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDG1Z%2F1RVk8SDtxkX8ircAzckKy%2FLqLlCRzY3ALuE5AJ7p8RA4XaZYL3nF025zT3T1SkKVDc04EdzlOpG%2F3og03x9j14qNoYhlwiKXiJIvkwsjpkzWa9BvAPI3grD0RH5n1c6DNjTmejnXW4H2dmSQr6FHXIv0ArQ3nTcpHsqKsGapZEUEe5EHr99C6geyH5OZAdbHgHeWe6au7MsQM0zLsyi1w4%2FWqsdeuyPGSSHidj3Cy0i1lr6PSdIiAwge3ByUQzQoG6aklneQVGt3BzBl53wbhWbCSu92ZXOloCu3SxHISIiCaqJlK2qBWWOjqVHMetorFLnhkKHZ7gkwlDHbcp8qJDtkW7h1%2BchWbmv%2F7zt0nix2Tojob4CPwJlrHutb7pQ8J0qa34cXPnInc%2FTCJxsPQSUq7935pQlErzdZrmBxFGUuCqEqai0h3xBICSMPwVPRlNm%2BDjc4Y055Hzls13VpForNa6FO80YrfmSqmo6i1Yl0OTaJ%2FTlWpsyy7cSHvfSPMdCpwDXIsrLFt7o%2FiJryYoDtSVmTjyo%2FwwdgCCqzHywWwz2IPna7jwsBadVEww8hbfbOkPfv%2FmxzgJE2hK7P%2BIoKX%2FU6xChKm%2FvkaL%2F%2Fx9Oo48G7ms1MmrZZS4ebxpNaK0n3h6IGZivMM2D3csGOqUB5vS7ruXv1Htrg1gIzAXj%2BIpP09GKrgPn7AV%2FZeCZgLaH8WOSS1tSyy2Rlv1Vq3xOlc8xDfeE7ElEG1DTwtZGTK34GEBYaLGC%2BTC6yMHd57PJ0sd9rtC1N%2FCAH7fw%2B2mo3rW0iJAWF0lSzm9j1y3wcfUxxp5kdflbteNKXHwJDNoN8OIVo3bu6A%2B60ryE1M1M3TRaqGma9HnsJychggHyCQHw%2BdUi&X-Amz-Signature=c8c00a94e3cf293d20c43fea3482b4eeb8210c8405ca0e0cb409f422fa6f30fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GDFFWGH%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIBmxt2cBHbMjooo86nkcqlWvyL18StgOVcNVRaHcyWOCAiAFjE7n%2BEwairADFA8pZZzDzO4zxKWahu8PazXjQ9JTSyr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMbhyitJCZJB4kPVdzKtwDxiMYmKBDud6IBa8ubCvLjLc4kiDuWrudVdkcQHEYOwjVBmeOqETNgy43mDdgbpDN7mhSecBDAgql0414u6BdAShCRTxWzeBYwzZhlM0i0AXZsHFMNoz481l%2F8LFAvCe43JnMZS502j2AwgMaE6Na1ZCzGbUIetPT2Q51eAN8Qfb%2ByqXs6FkjU%2FZOsycaZA9UtAIZmb6erjSvjWhf6yhXWLIC4Wr7uEsGMb8N9537mqBRwIfQjLI%2FdvKLLkNYT78ApD8skTmMaEe0Tjrq1lAkSQtFwVFHhqm1pxjQW1HZVSzPbOBV9su45zyH6MorvH4EwW2AQf9MgRXJVH3lcOZ0mwW4thhphJCwLutHRxs23L6PO7NFXpB0jIOdbKs8Kn5h7l2ffyopqm5FGy7T7qCj%2FOd%2FBH5pm4Pj%2Bq4r8w5q7otCVX8rvo2NVV6YyOkIIryiTykqDfVL93A7vcATbdp%2BvR99XnBnKQWBWDS23z0yv2RNHZ5MqCNTXHQxwRH9piTLXWlIj5MyTW3%2Bc9ycXezkulAtF64ySSPqw0nNPGrSu4OY86aW7I3jyA7fHub9TGGv0DtQx5M5coV9H9r12PowZvzBJ%2B0zs%2BTyDmM%2BiSIV25QRB%2B3izyRvq%2FSSk8MwrILdywY6pgEETnaqSQSz4s4FUb7i%2FyGuVSJNwUdJj37FRFafkZOegMwuF2nOS5P3XaCuZuxMCsOnXOWINveNDTa8%2FchSn5cDfIO1pIarnfVOCHvwHz1tBUq3uY7prAFjFzsDiRYr5dktvkDAHtSIRKxwfh0ELC2ZkHlvANZI76GeIy8kxvUZTCeWKSz%2BhUzpK%2FKNaQMHj6wTocVKKMdf%2FELIv%2FRJoKC4LEHZh58%2F&X-Amz-Signature=9bce9bdd70988f4d7550ea3eee837a7cb4649c9e1578fd08eb78f89b62322afd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7L45XN7%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCi7uJNnY3tlYWpiDjGMO%2BANnyE%2FcLU9KQJVy359cFDBQIhAIOwmuaasQ9jsQYtzBC7bmapCXNq0fGRDGEj%2FVqeju29Kv8DCDwQABoMNjM3NDIzMTgzODA1IgxhHIEtxRDMFbcvFJkq3APLXFjErN%2Fm4njQV31u2u%2F3LcnFcivNzXpiAn9LKYOjILmea%2B5a64vfSQMSPzNUZqpvv7GlNQSN3FiBZ5KSsj67QDAUYHgHcWTBJkrkIfEuDkHV0pKk416Hdnul62XGlSY9pZJ8lWo3FsLZxrXYN4%2BLaC49gi%2B6dMdrLtcqSgmn35WwRmmwmwZRvNr5%2FfUrcBuv1sErlZv0s6j93S4JgYx17S5cLrGQua8fjn3PtMfy9bajKu4PRvdbLwNZcfgN4PRdaW4tUum22kZaKejsqHUMEGzzVbbn6q1Rf8a%2FB1nhaZ9cCXFOrhwpsfpVZLzAfBsO2LgFccTKsCQtxpqDOjJZnb%2BP8am3gOP6ci%2Fij%2BIXgLBRwgAH8njD6%2FU3WHnGe9SPLpYJQdmXJBv35PRVZOb%2B9%2BZmIzARrL3YFP116R4wgJIBsM%2FIYZYPPEAbfbtEZDjGA3nP7GpEGEJugKAuRxzpChU9usjgm4PfliulLrGVm9wbyOKq1xh8o%2BHntyNf6twUAhB%2BgvYIfgUhT32%2FrN39mag4Nn29JjF5rEaah3j2PGZXF38DWbdOXCjDOqh7jgxtf8Gs5kHhpu%2BCUzTkJa1DlA4Yqv5UR%2BIQCSuXkgUnRfvzjrsxmf846IOY%2FDCghN3LBjqkATz8ROOylQ3MoDXDtmeMIr4TCXVFt6kRoRJeDubFZqfSyZ17UdFVX4USjp8xmCORfi7ZcxOiStUniHeZQbv9mZwt2sZSIBvniufYe82iyGR8G%2FNJw8NKTxUY14LzWEj4HahcP9uDUzV1PfO5o6u0p0E2Tru71QjA%2BsayWEgtK%2Bcx9agEO%2BgX8q1QnZPtgo5U9WX%2BHckF9HHB8iLTqdNOA4ctJuwr&X-Amz-Signature=f53e7594389f4edaabdbf37e3a6a2056273bb77fdbdece136b5929d7b1a1aad0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ANZ5O5T%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCICwqimYISobCaHvCajU5GvBv2Dfjj%2BTsfH67zN3otmFMAiB3mLcf%2BwLYGCqBjJb9q7eokNjIQm704SVR5W4ZsQITPyr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMR%2FVGF0bRQvSCkEn2KtwDAfpRSO8WMduGF8uAp8sgU7iZ1EOWdlcIQFiqb1%2BWAgoK2YtLl88C%2F51pfQrRiKMQsD2TcwLUIFu5IONYt94JsRqq%2Bn4ks1BRdtYfFtu68oLF7lF36bAEHqpl6roHQqcKzcSTIVT5xqyPw8S3p8f8jTNeATp3MgKtBHqw4WYfF0d14WLrO7G6jrYHZUXu9la5GLtXqGd%2FY2h23JA2VMDi5p%2FdfeBVU9uEXnyR3Ir%2FFo9hnUfwNo0Z3Yyju56V5uBUbVxtyoaZ4Ykn68eVS%2FjX%2BC%2F5jJvCN4v%2BYRbZ70CZor7UiwlrLJ%2FL%2FxJeXtMGUif0fGWSQRmfW7Zfn4U2l6B%2F1p0XiB9S2EENJq6oWBIu8HpyUBLOerJ35gPKowHJ%2FG6SD3Vx7ABPJicS6UHu5RUdAHjWiyeQbcMLEHJzN%2BDytA5NIg3nXA8Z2fVXKh1tlbvaw3XnWEqB74pUY6qANUulH3jCxVunUKlXvBcCPgekQVLuz6fllXsrKSPEvksMGMUOa8oDWsMAzTR9XnTFj0CxoJ6NHlPMYuUHmmVjmj9WKteVlwGtwMEzYCswCXNJkK0VILnEoq3sAhG7%2F%2F0dsXeE3eWH2RwoUAV1TROZrWH1pKiemHArD1DiNdqZEn8woILdywY6pgFl9YH5Ubcj16gCTRTAgyhxEnXQ0D%2FhlMrBvuqv5%2Fp65GYlrGe7XXxjrmjSw6eqL%2Bf1fknjRbRLYAHZYsU8tPd9qbBF63KGJ%2BxAIyNY%2BptvPROvbQ5aKXej%2FNmzGAwi8Xyig2utZWAgd63Ic8r4iRyGCoQVQosGTKSs2Saoae4xqa7IaOtfUljQndZw53R020K7YAfmr5TzaZ%2FbxAnnZHV%2FD0K2cwVa&X-Amz-Signature=ebd62941139f72f5299c71f4b23265185facfd7c10f468277c18081ae84c3455&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEWNJIJ3%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIASFW58FuZrHzGf0zm0iXDU52D%2FMzC%2BYGcXInU7OzwCTAiEAr60D65Qxvjpt0EeIT2ylnHVhZb52tqBGM0AEVLwWrwUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDImm94FDLQMDznIRGCrcA47iFe0E6DPvwnq918h29vlmmqTEdqOMhBFGp%2Bmt0EN6UjS9l7jRH%2FyVDanq2VYaWbHbodreU61eCP846IFlKiRVuhMVS2Px6DY5EV7lg4jmyODALbXp%2B1yVtgK%2BTbvVArRO%2FX4ETMYbhvBF8GAWE54Ommz31VcR4PAwJAabHVcWujj4rbHJzv5Elu0udK1o5RrlBsnlMtNiRw9MzTSTr6mg0jYn%2B%2BPTlNYFj5rOYntiQVc7kvYYCDPtHK0OT0dEyIbtl9orlCkaVzeMuxorBZ14VtLGAsK6E9b%2FbAPnht79sZzaig3F%2F2DlH2TQlGUPFqCOQs3%2FEfQyo0bNUvA9s8q3EBjG15wuKFSvu0qB2Day0cZXxeGqQt0lxUV4K3jgrygZDY0M9cJ%2Bd6DLPZ%2BD0S8TUfyOgbHZKy3aVZUOmKedf990gRkYa0ugeYM36L2cvT6l1Wy5flC4blPnqt99jm2mKSbz4D3Z5IVK41K4GnmCp3mtQY6Io3T12rQu71YJU27wohbRq%2FVociHi%2FoYVcoIMbuN5pdIdYvPYIBw44c3gukOvztdwuZne%2FKxGmmY5uZ%2BCptD5WJu3zGFGUIQyOSfPim3iIZ6nLitrtbBYo89knqiK6Q89vUopDRDnMIiD3csGOqUBUVHfhB%2Bt0W9viywGHzENT8%2B%2FWHi7GXIdiqbQj8J%2Fwk5FwVN82sLEV0QGJFBWMc%2BYQwiCi1t%2BCqr6GFciBuxVGgFaUCcGpOpcEMbcnyXdsG9dAOqgn3N9WtHt4x78epNWEuxOxJQU%2FEpgpydL%2B1dSXRGdtmWIQJ3Nce5bXkRz2GQKxV8otHCSOmEAF71UIYdUDrlJLK6zJQ3LjACJ%2Bqi7%2F6cOct7C&X-Amz-Signature=a0d7c11b22ccef87090d80e82ffb1c856da2beddecd81aa78ca99d9e67f497c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEWNJIJ3%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIASFW58FuZrHzGf0zm0iXDU52D%2FMzC%2BYGcXInU7OzwCTAiEAr60D65Qxvjpt0EeIT2ylnHVhZb52tqBGM0AEVLwWrwUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDImm94FDLQMDznIRGCrcA47iFe0E6DPvwnq918h29vlmmqTEdqOMhBFGp%2Bmt0EN6UjS9l7jRH%2FyVDanq2VYaWbHbodreU61eCP846IFlKiRVuhMVS2Px6DY5EV7lg4jmyODALbXp%2B1yVtgK%2BTbvVArRO%2FX4ETMYbhvBF8GAWE54Ommz31VcR4PAwJAabHVcWujj4rbHJzv5Elu0udK1o5RrlBsnlMtNiRw9MzTSTr6mg0jYn%2B%2BPTlNYFj5rOYntiQVc7kvYYCDPtHK0OT0dEyIbtl9orlCkaVzeMuxorBZ14VtLGAsK6E9b%2FbAPnht79sZzaig3F%2F2DlH2TQlGUPFqCOQs3%2FEfQyo0bNUvA9s8q3EBjG15wuKFSvu0qB2Day0cZXxeGqQt0lxUV4K3jgrygZDY0M9cJ%2Bd6DLPZ%2BD0S8TUfyOgbHZKy3aVZUOmKedf990gRkYa0ugeYM36L2cvT6l1Wy5flC4blPnqt99jm2mKSbz4D3Z5IVK41K4GnmCp3mtQY6Io3T12rQu71YJU27wohbRq%2FVociHi%2FoYVcoIMbuN5pdIdYvPYIBw44c3gukOvztdwuZne%2FKxGmmY5uZ%2BCptD5WJu3zGFGUIQyOSfPim3iIZ6nLitrtbBYo89knqiK6Q89vUopDRDnMIiD3csGOqUBUVHfhB%2Bt0W9viywGHzENT8%2B%2FWHi7GXIdiqbQj8J%2Fwk5FwVN82sLEV0QGJFBWMc%2BYQwiCi1t%2BCqr6GFciBuxVGgFaUCcGpOpcEMbcnyXdsG9dAOqgn3N9WtHt4x78epNWEuxOxJQU%2FEpgpydL%2B1dSXRGdtmWIQJ3Nce5bXkRz2GQKxV8otHCSOmEAF71UIYdUDrlJLK6zJQ3LjACJ%2Bqi7%2F6cOct7C&X-Amz-Signature=0050dcc4bd4cd01173670f9c2b6a10a92354b16729294587244399ecc4726860&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3HQYOOQ%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQC6R%2Bhy5GVLxeRea683mg7XS4jDca%2BF6Zq1HT%2FEHHgCTgIhALYWVLWd5ij7JC3IGXeTLV16Y0p0reziDHehi6RetlZ5Kv8DCDwQABoMNjM3NDIzMTgzODA1IgwFFj129tYo%2BRgPR%2Fwq3AN3uq68O8ujj75kA2C1kUK4%2BzBajS9j4tTjR9bbi%2FIbv6nbXELdS74Qu6yPCMGzii7uvZYghV4cFHBnlI5%2FbudpQwrcxY%2B5lbJwKf3M0b2q77HaFlltPLHz83PX3hcn0kU87Dh9GtI1azhfoYe6J%2FTBDzACtb0QIwCm2mzLskKMLazgqgMtyx1P31EyNgJuA2UnSCJ2IhG6lhXOLutYKkPYTlmDQd%2B6ZJz0dpH2t5IstkycjmGcoBXOduwVjNda%2FTYJbyWK2y4hh3O6Ab3YdkecB94j3rdpONDpBxyCtz09HGwB5AGET%2B9sSHwdDQ81mNRtPkv5RqAAY3YkSZLkCZ0QmqDeB9mKdydxfkklsee%2FUZRm1XBcHmy%2BRnpEo2GJdOKKDYZNCe4hAyDUOVAIoMa7Rt0WgrjE%2FVerQt5sDwXEoyF00RwlXhVAOexrVbc7mmgTvdQpDiQzgdN1x%2F0zg5O7WWixzNuZ%2BxXBjZx8z1xGvG092xzyr31v1%2FXMugvnGYT5P0z%2FANh8%2BgpSe55ziqn4K8CZyT3U0DNgITgeahZLI8iKcdcJObZdBhJdLuixrJFyrBwBBWKDmmQPeq7%2BnqQGWLDjKsjUNgg%2BPGzFaOLfYlNg%2B6%2FSo97frQzcLTC2g93LBjqkAdbYKlpyWuY%2B%2BVyigfULglLgIUSeIgIa9j2kA7SMZsfqBpEDuBz%2FEnPZvLYodPup7%2FgzTKtpGxzE1fLcvI3suGnX0Nq9YraBdnyuPhh4OWPkSbQBqMXMfg%2BcNak8j%2BPJmaLDmpzZtK6cUOSsj%2BuN2IjxCqlEkAyTMclJJw%2Fxct29B1cPCp%2FnamDDDP7qv0PGf9JDZjN6bpDR4a4jaOnAntesehx8&X-Amz-Signature=560dd0e749da52a3136902a31c032cfcb807d962e55cc2d54b4f54fb5d8ede8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPYWVN5P%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQD%2Fh0KuqNmfxJD%2FZJYQxw%2FunKPQX1b0LhYOGZJ3a4NG0wIgVp5f4KZMAvjsD1Jn9kb4bmGj1msCAZfms9e98sxHiCUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDGw4t%2FN5APYe0%2BFLCircA0i21OkvQj27wE6uKbQoeBwhDLsOgcvF%2F1Ax0ZQiVZP6RQty2qmr3qK27o72ibvNh7fs2zF1lkMr4PXqjcTBC3q2%2BgN5d7ed0ARbcXWu%2F7IScxCe3j9hFcUmMLuH7iIObeWbvcq4y8bz22LU4L3ByDwmGn3T1nMHn7CLS0cgXpWalj3EsYoEmxppRJTVIOoY6TOfD2HC2lUECsBzn1D28a6Q0D%2BxjnjRN%2BaIubeO8YpRZDa2Da4SetZjzp%2FqiH59nJx9KoN721K%2FlVbmL1JIzgpC862kLQdaOoxoSqxy2W83j8%2BOekncOb4vw0rk2bOjGkki14Rb9TVJ7NICCquSxdwrRxZcGB5sC4i4XYRlWcbHLPqoDyxlHXT1v2JJG4AJTTn8PW1km3vTv%2BsP3tPl52fitvUbusPsiSQZo9q7zj4AFdhizEErsXL9p7lKW5tL0srhhCKQRyc6hlJvVkMmUAZoWoIx5e7vosGWXi2WT989PteYNVlTPCJUZ7qFyY8kJY%2Fkdeor6CxRG8cHHmHkcMme%2BBnSt4BEjX2IxZf0dijWvbEPwaEGHucvm8iyYOmPiHmmm129Z5NiVuXVKNHDFOMbXhSfS27icnB6E3cwnz%2Bl33kjRTwOy34rKmoJMKKE3csGOqUBriFwFV62nNfcH3WDy7CXGEpdrxNFlMjwg7nUtzntJ35KEmY36MHHvTe93GF6jBaeMurjFTEwo5y%2BgkiJJLyja7BTaiOjRnsTYQWZzdd%2Bx7qq1T4FhUYziMd%2B6r91Nf5EKp%2FG1vI1FXHqx%2Bwu5hs3JWqvK6u6AJClE1N6x2drHDOm31c0iSnzukGbIpJAjORkRnh9T2fiI0pqg9Naz4q3AhfxfuPW&X-Amz-Signature=75248c20a1413633c0df56bb3eb7aee5a256fe28b5cd8eac5017fe40d667be93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPYWVN5P%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQD%2Fh0KuqNmfxJD%2FZJYQxw%2FunKPQX1b0LhYOGZJ3a4NG0wIgVp5f4KZMAvjsD1Jn9kb4bmGj1msCAZfms9e98sxHiCUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDGw4t%2FN5APYe0%2BFLCircA0i21OkvQj27wE6uKbQoeBwhDLsOgcvF%2F1Ax0ZQiVZP6RQty2qmr3qK27o72ibvNh7fs2zF1lkMr4PXqjcTBC3q2%2BgN5d7ed0ARbcXWu%2F7IScxCe3j9hFcUmMLuH7iIObeWbvcq4y8bz22LU4L3ByDwmGn3T1nMHn7CLS0cgXpWalj3EsYoEmxppRJTVIOoY6TOfD2HC2lUECsBzn1D28a6Q0D%2BxjnjRN%2BaIubeO8YpRZDa2Da4SetZjzp%2FqiH59nJx9KoN721K%2FlVbmL1JIzgpC862kLQdaOoxoSqxy2W83j8%2BOekncOb4vw0rk2bOjGkki14Rb9TVJ7NICCquSxdwrRxZcGB5sC4i4XYRlWcbHLPqoDyxlHXT1v2JJG4AJTTn8PW1km3vTv%2BsP3tPl52fitvUbusPsiSQZo9q7zj4AFdhizEErsXL9p7lKW5tL0srhhCKQRyc6hlJvVkMmUAZoWoIx5e7vosGWXi2WT989PteYNVlTPCJUZ7qFyY8kJY%2Fkdeor6CxRG8cHHmHkcMme%2BBnSt4BEjX2IxZf0dijWvbEPwaEGHucvm8iyYOmPiHmmm129Z5NiVuXVKNHDFOMbXhSfS27icnB6E3cwnz%2Bl33kjRTwOy34rKmoJMKKE3csGOqUBriFwFV62nNfcH3WDy7CXGEpdrxNFlMjwg7nUtzntJ35KEmY36MHHvTe93GF6jBaeMurjFTEwo5y%2BgkiJJLyja7BTaiOjRnsTYQWZzdd%2Bx7qq1T4FhUYziMd%2B6r91Nf5EKp%2FG1vI1FXHqx%2Bwu5hs3JWqvK6u6AJClE1N6x2drHDOm31c0iSnzukGbIpJAjORkRnh9T2fiI0pqg9Naz4q3AhfxfuPW&X-Amz-Signature=75248c20a1413633c0df56bb3eb7aee5a256fe28b5cd8eac5017fe40d667be93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEIF6WJZ%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T111206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIDf939vMEC5pXC2Uxwz0rIG0jijBpyZut%2BVPfq34dT6OAiEA26n1CYooiRn7dfDC4e6gKeKbaJKXhejXkHQ1QvRv8okq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDHCLi7gNd6cxIHtdECrcA5ebcwEKuA7ZawSU%2FHU%2FubNwKamNd1IvU5d3fVd%2BOw6LleGpAK1Ihj1PrWauwK3VpNeHVfytebo1QwA%2BJ7dhYpNYy%2B2%2FXtXYSWw5EHUh7ObWN6iiBJrdrwKzfskywh0yJzmUqDK8Jp%2FpYEN2dwYRD%2FFWryNJXR%2Fc2J6916fYzNktxm83nWV%2FO3hC3WyMJfT4DzKPWSuIB1ClmrmJG9GEFlvX3RwzQPWApKs%2Fa5SIFSpqTSkeH4d42vWYBJp1uRf16jPSIBgexZ9TJ%2F1iGDxfEv5bTUzmxn4G5bFS%2BfcB%2Fyg5fKpmzT3ZVJ%2BSfAf%2Bgh4lj%2F8EN5mi%2B43t8GvldOxE7c5VR7RdXYU%2BsIhgB%2BPC22zzJieC7bcWt3b6U9hW%2FDuvUCkDmI%2FDf0F7poJs60kt9yca4pIBhu%2FUgnlVwSy%2ByzV9%2B6IbjQbNbHhvXCMBfQXHr3%2BYY7hnRwpbR%2FOAHpthFpV%2BZf0xdpVW7YEYl5roSMUz%2Bi4IHiMvRx1B%2BbvQgjo7sHiVcYyWvHvA1%2F78dW2Rvk6QWmBLAkPPXzzVUC8cj0ulVSUEyY%2BSq65ses7SYh%2BG4tNvwM4q09epwiWZmrEjQqhdlPlBbiBzgBwcqbpPGXzGFjSvdfNmH%2BKz4bmcMP6D3csGOqUBhF%2Fxdl2ZxLmzlkKm%2BKNOiA84WVSkR9vkZMnOl8Ol9HmDBZ1RUR8VkMLMOnUtasZKE712JyYxBABBifzz4Wo8hrvbYxhJcIUgd9lV8KZRrnIteYB%2BBOUmEJ4DiclnkinksKYKh%2B0EB36PaN5yxnmB34Zbvmq9DKkR1OFk1UVOTyKL%2BOlYHcIIowfcx1cf8uOEVuq12Do2fjhHbj4XYiXkGL6xaY4l&X-Amz-Signature=3b5898c03df4430ae4d445fc900471d3ed944c2cfe67f62056fccad539559d17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

