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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QP6HMH5T%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIFs%2BQpEUzU%2BQbfBHvc56KoqhcfQROeLSTSlTHoAT8ha6AiALYXPa%2FfPVYdEKYqQoHXVcFxJElBm9%2BJzM14fVU%2BW3nCr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM2ppJoGqml8V%2FEKvTKtwDgM%2B8LrLdqXKeDGiaFYDXM8J5y5We2jJP3IwtFfeG649XXGMjdzkuyy6LVLaGyeyokyyV4cYd%2B56LnVKatZYxt17qeKs3tv7EG125VUNMGFOGQfgQOpcmCFSNGPgXRwRbHTz68LdBCOcF6lEWBJg5coC5dPfKfLpzKxBx1F3CfEXUOkG10wzkHyBdITvM4j1GR1ZhQr4Q2%2FF6MQOfvJjvNli%2BSofsa5px9yXCqTFAhBKejqhTuoBF4Eq0kh5ZYXRrHnpfYSoyJcg9I1C1pbKTqiHesJfdF7MTKfxfiE60j2lLpH8xxWHIsK8fYOe85YPmMEvrKytuYwzMuLKKvX%2FwyfvSiHjXkbHYfn2ABbVj665TGLvqrf7Xt8ts%2BbHDM%2FBtKQixY78DD%2B5tpRXygl927MzE2csYF58Ru00utcnVGDnP7XZExKNjzYkZ5Av1KrtsYcbWPrZRc%2FTvHL1fbAxc9cRYwlrIEhVXuul9g7s3tL4ujrxYeyDvUl7M%2BcwNnC867S295eNVHSOWcY2kz57zBhaRhYRPTJejzSYUEWkpk4lBghWPt%2BYRwznPQQLsHN04yRoJe0cDZjF6YwV7Tlkm78TbadWRb5NPhRff24s3auCK%2F5dPqVALIY6FB7UwgsfoygY6pgGVTMaN65klDyWj1tb70DEtw8CBhKf8TERhvngM54ECJlQcuKwn6K66C%2FZDtJjSVIvs%2BjZJuIgHemvJdP3Vy9n5okd7LPYpUY4lDXQEgxc8zMiU%2B833uxiuirIf8YAnfIdEh8wY3RbaXSpNPtbAxjyFXtGRXqEzO7WEXhvhULpgvMcaEFrtsbslQWonxtTwbX3oWqKA3FolXaVeLjKZ7mA5%2BF8hWNvN&X-Amz-Signature=7516cb77a21e83136c05844b9e54825dbb6c4fa4f7e4676c057f3a57de8ba2f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QP6HMH5T%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIFs%2BQpEUzU%2BQbfBHvc56KoqhcfQROeLSTSlTHoAT8ha6AiALYXPa%2FfPVYdEKYqQoHXVcFxJElBm9%2BJzM14fVU%2BW3nCr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM2ppJoGqml8V%2FEKvTKtwDgM%2B8LrLdqXKeDGiaFYDXM8J5y5We2jJP3IwtFfeG649XXGMjdzkuyy6LVLaGyeyokyyV4cYd%2B56LnVKatZYxt17qeKs3tv7EG125VUNMGFOGQfgQOpcmCFSNGPgXRwRbHTz68LdBCOcF6lEWBJg5coC5dPfKfLpzKxBx1F3CfEXUOkG10wzkHyBdITvM4j1GR1ZhQr4Q2%2FF6MQOfvJjvNli%2BSofsa5px9yXCqTFAhBKejqhTuoBF4Eq0kh5ZYXRrHnpfYSoyJcg9I1C1pbKTqiHesJfdF7MTKfxfiE60j2lLpH8xxWHIsK8fYOe85YPmMEvrKytuYwzMuLKKvX%2FwyfvSiHjXkbHYfn2ABbVj665TGLvqrf7Xt8ts%2BbHDM%2FBtKQixY78DD%2B5tpRXygl927MzE2csYF58Ru00utcnVGDnP7XZExKNjzYkZ5Av1KrtsYcbWPrZRc%2FTvHL1fbAxc9cRYwlrIEhVXuul9g7s3tL4ujrxYeyDvUl7M%2BcwNnC867S295eNVHSOWcY2kz57zBhaRhYRPTJejzSYUEWkpk4lBghWPt%2BYRwznPQQLsHN04yRoJe0cDZjF6YwV7Tlkm78TbadWRb5NPhRff24s3auCK%2F5dPqVALIY6FB7UwgsfoygY6pgGVTMaN65klDyWj1tb70DEtw8CBhKf8TERhvngM54ECJlQcuKwn6K66C%2FZDtJjSVIvs%2BjZJuIgHemvJdP3Vy9n5okd7LPYpUY4lDXQEgxc8zMiU%2B833uxiuirIf8YAnfIdEh8wY3RbaXSpNPtbAxjyFXtGRXqEzO7WEXhvhULpgvMcaEFrtsbslQWonxtTwbX3oWqKA3FolXaVeLjKZ7mA5%2BF8hWNvN&X-Amz-Signature=7516cb77a21e83136c05844b9e54825dbb6c4fa4f7e4676c057f3a57de8ba2f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJ7DEXOD%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCU6J2oww6FW8HRXaJ5UTVP5oYxYqYEbMohZmcJdy4KpwIgeq3gs%2BZ5IcBhAIiTV6nFdmhx6tclQIvNDJNDdP77anEq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDMw7YNBYauSDapBBhCrcAyW1Fr%2B8n0I63SXqiSFmFNQDuhmi%2Fs1tzU%2Fcna7rVdZ%2FPLflXFJAhd6Uim8d0KAHtIPinwqKBUlq%2B2REIIiMNxVpjlKujfNudvT16Ar9GWInGjHGRy2BkCmG6bj1G4z5Iz7S2ihD8T9bCyjTGMKTZCPXZarQiVulMyg6Oji5fZP9lFFV9WvJE1rHXhEBLkJtdJE7UU%2BJ73N4COR4Rn%2F6Ke5BYYONT%2BFcNFR5k%2BJ8GKxvz8zj%2BOXeCHnsYH3T%2BZg7n4cayFsOOTk87irHSjNhmHj9rzNQL%2BxP1h2TGBQhca%2FkQsZMAWYkOVw2mt9UEY3%2FmlYhzkKxZDR59CF2a0PfVJGf%2BQk9lFeLUB%2BRUSc5m7GED6ispE9FIag7xJTNV1Rucf6hkk7BphuTHehGLbiFzqv4hmh6SWIjrIq10%2BFNxMDcM8EioGRdRFU3h2faHUTW%2B2FmsIyi4hp12dhCCiVilKjf3m4zvgEmPU2pnO5g7ivsPWcoEYT%2BIE%2FqBG0ZMkf%2BGUsWVqqQfVZQ2TmcKeNx4%2B7%2FsGm4gJJWi5BwuBXyQFI6IRFd98byxYEyvhJdodtlvmVvg0NbtA5jYQnZZhOOVW4UtzuV4wmmfDDLctL%2Fu8PX2f436f%2B5wOpBKVHBMLPB6MoGOqUBvf01zbhsudwMJkoFljWdVjo0%2BkvaCHU9kK7ecFRW6fcxHT%2F5c9O7s2RTNNQNcTydsOSma2%2Fu%2FlC2kJhJTJUbaBM5dGD%2B%2B%2BV6j%2Fh7WArKL3jZQOFOCnW5NuANDaJZvx5gtGiJEBa5Zs%2Bxs8e%2FqnP6Je8DRuQwxFhxATNN9ZJjzr4ku9uQRbdrIT8U8B4J1nAmOvacqpD2SQKKOvuupnEbDSts%2B5AF&X-Amz-Signature=7b54ab5688b239a90ab80260d6193c00aa10beb46bc1323af8ae531a2ab61e84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFETYT6F%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIH2Nz9omb7D9kT8Dumfdh6bnsI4xewj05bi69npfHQTwAiEA3acb8x%2FoFG9hkw%2FqDSsXKbA3TFPqvhtIY325qLA5Qw4q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDHs7fkpxSih6IMkGHircA%2FA94N0G6rkV3OGeJm944pGGr6d8tnXzZ166rVeKluW7HLtMXWpgng8CYfRkPFIxnAo6lDG1B1xZ8n%2BR1Pe%2F%2B7HI%2FhtlNehqx71TY3Ayxe5WcObszim1ujyANa0rJfwBmT4kLvS%2FTnD0Ol6NZ%2BIjkD3pX1rKt0BBfhel%2B6Id6SzJfDMgNv76yZcd4X%2FOWW2V%2Fc%2FW7E%2F4AGhRW5d21uYHwMTg95zfjxvQcE0ZAS3LO8AsUzEtFDwAquoyiHH4l%2Bmzr2otzaQvkfmphOE7LhxmmTuJEpdZVp1ekvYe%2FHOvRyw6M%2BX%2FL3myGQVW5vr8dr6spsYF4dRORq%2BoV%2BQMT3jwmWy%2FIP57z%2B2TdGbMHK9RY%2BvSAvCIQagBJD21YRbeOnmD41cKTws%2FTM%2FTHGAqKMPrfLJW4V6Upxo2WBtSUdBvhwuDJxLV3S1tfjYNFBtY5nW9ng8I34BgENRBTmCP412KkjujtzZyIdYKMRO%2Fqe88IVf78pUxathZ65YJ6gqmIs49OmZ3iZy244SEJ6MagHzCIYbVL7c8JqpbmGuPRtUrY4LLzc0r8zJo3ROwrkmRrFlpRHq5E%2BhRQISlivE4GOJefSRo2k1anMnIwPLjqCBDl88hWcEzj%2BuhtRVfFfPaMJnM6MoGOqUBOwPDKczCyBXAhGkVd70fiBd8uwmrcO8jRUWCZjnRGfFb%2BCGr8l4J0s1f780ZWWRQBH1aQndH4WbgaIwOYiCCQ3fjDPlkfokGjxP%2B%2FCVGCYEFaqn43xtodLFFXP%2B7H8YqqKcewnZecEi3LBOJKMyjpa6IidbX1NZuDt6OysT4FP%2FcSl1KQsy7CpmIrFjtVt%2BM6k2OQ5Hv%2Bfvm16TdjTjoEhvsqN7T&X-Amz-Signature=ba0a940193681891afb8d9c9902a6d3a929f5af804c3cb3d958ef8e7ca5c9b3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFETYT6F%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIH2Nz9omb7D9kT8Dumfdh6bnsI4xewj05bi69npfHQTwAiEA3acb8x%2FoFG9hkw%2FqDSsXKbA3TFPqvhtIY325qLA5Qw4q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDHs7fkpxSih6IMkGHircA%2FA94N0G6rkV3OGeJm944pGGr6d8tnXzZ166rVeKluW7HLtMXWpgng8CYfRkPFIxnAo6lDG1B1xZ8n%2BR1Pe%2F%2B7HI%2FhtlNehqx71TY3Ayxe5WcObszim1ujyANa0rJfwBmT4kLvS%2FTnD0Ol6NZ%2BIjkD3pX1rKt0BBfhel%2B6Id6SzJfDMgNv76yZcd4X%2FOWW2V%2Fc%2FW7E%2F4AGhRW5d21uYHwMTg95zfjxvQcE0ZAS3LO8AsUzEtFDwAquoyiHH4l%2Bmzr2otzaQvkfmphOE7LhxmmTuJEpdZVp1ekvYe%2FHOvRyw6M%2BX%2FL3myGQVW5vr8dr6spsYF4dRORq%2BoV%2BQMT3jwmWy%2FIP57z%2B2TdGbMHK9RY%2BvSAvCIQagBJD21YRbeOnmD41cKTws%2FTM%2FTHGAqKMPrfLJW4V6Upxo2WBtSUdBvhwuDJxLV3S1tfjYNFBtY5nW9ng8I34BgENRBTmCP412KkjujtzZyIdYKMRO%2Fqe88IVf78pUxathZ65YJ6gqmIs49OmZ3iZy244SEJ6MagHzCIYbVL7c8JqpbmGuPRtUrY4LLzc0r8zJo3ROwrkmRrFlpRHq5E%2BhRQISlivE4GOJefSRo2k1anMnIwPLjqCBDl88hWcEzj%2BuhtRVfFfPaMJnM6MoGOqUBOwPDKczCyBXAhGkVd70fiBd8uwmrcO8jRUWCZjnRGfFb%2BCGr8l4J0s1f780ZWWRQBH1aQndH4WbgaIwOYiCCQ3fjDPlkfokGjxP%2B%2FCVGCYEFaqn43xtodLFFXP%2B7H8YqqKcewnZecEi3LBOJKMyjpa6IidbX1NZuDt6OysT4FP%2FcSl1KQsy7CpmIrFjtVt%2BM6k2OQ5Hv%2Bfvm16TdjTjoEhvsqN7T&X-Amz-Signature=4739f7e85313c927170162de3c212a74903d961d7b9bfc78db1f07d883dfc1ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EYWGWC5%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCvViKy%2FG82fAvSOemj%2B9hCQ4m4QhWej6ystSvVunCEoQIhAI8YcuBMlACoK0RsabSYYzu3Mm%2F0vv8GOBKD%2B5M%2BBDp%2BKv8DCCoQABoMNjM3NDIzMTgzODA1IgwJstqRHOoJyNmCU9Mq3AO4OyTmzWRuzrrmxiMhdZKZe05KXkjFh4j%2BOI4qD8ivL9dtdu1n7qjADFTS%2FBy03wicIYSttBYgoRwZF8MNg4TCnFCN%2BJjbgdYn02ToB3jtIF%2BffGx2%2FJvC0%2BuVTJnzZ8WG2Y1kCFzzT4Sety91l%2BaW04jnuMAygnI%2FXTq0asUV5xPkvcERcLwvponWOA3xxjh7SAOkozuGFEG8O0A%2B1FlSpRRvSlo56kD%2F5gLFOzMQQOGySEexYeX5vm0BcOi%2BkJI%2FbBWFp9wLpE2VKQszvVyl2JD9V9tRPPF%2Bo8n9%2Fo%2Bh24uspCH%2FqkOv2O5IvzWEhMhCANZIzgG%2BdrdPEI64g%2BLgESKU7Z%2BNyFElwq7HJ9C6ZMqpxmblnfNhce7RxX%2Fzgw9bUty52H2r915hIDjAMjUxuumFzQgzoiTjRUDCwLWe%2BpDIsxHAmysfoSx%2BrU81q2FKhW9p1dm9Y2ctoLs8AECh0oapXFo9Gp8m09rNIqn%2BRbrzw5B%2Ftz6PQyxtNn02Yr6jYhBy2QRYitv21SEiWOtSAlyFdGczAR3qBNDRpxpVMEm8sbfV5DhjrI17lm5HPaQmsPpqVOr35AkG5zmyYNZaZat7wXMQ5w3UoXzHtaVi8kdrI7d%2B9RXmwtzWJDDpx%2BjKBjqkAT4aWei5fGO%2B3XiGc9jYd3BOKGQTMpf7Xr5xuFu9osmogZmkXFGGksIIeTCoXhfZxxlMlo5XcyCS0XT9JlVvUKvaWf9ZV6bo%2BIYgRoaG8dhq5Erw9tyr%2BkmKGT0%2F11OOr1TypBR0GwYXPn0tdhecVhJZ%2FVMPkdPBTdA3%2FmZkOBkX1c6HKEh9Qibjnm8iA%2FPxxxpm1QA02TQX4sF5hV%2FzHPaRmC5k&X-Amz-Signature=0989c216f41a7d91cdf9346a0eaf8781390957f3ed253755e0b3b2323bc81214&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466524LF4QU%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDGz8h7ZIKiMxa5oZFH%2BaO%2F3lmSnpN1LtOGzBKm%2FfsGKQIhALAB4y47K%2FsC73%2FBfiNTbjDEyAdTEemencyc7VND1ho9Kv8DCCkQABoMNjM3NDIzMTgzODA1IgyIZFSOMCdLEu12ffYq3AM%2F9NFALnguwoOvdJ%2FzwffwLdxPMJNMmkHcswPlXtJxPD01z9bm99Z3kGDJwHAlfje6r%2ByspOAq%2BO4s7DETV0%2Fvveh%2BQbhPGr96UyPX1Jru964mnEgxvGyjF9vNQAkBfClKkE67DV92QDmEGm5YbEQczTVSG%2FasvBLiqTUGlTpmZS%2FtxkNXMNPBZWJuIg2zNSkuSXlY3yCKsV20XOBRTz8MPRfNzP6V2llJyXXgckMhrZyo2n7hzj9K2Zv62u6T45P2j5iWXbMgeanMTxGEChx1cbHR2z2QcZtMjM%2Bi64A2lf5PAVJkCoLHSSSySHO6FI6gnjLPhCaVxFwSuy3KzUQUl6syXTBpSY8IS3WzcH6A5pZMZa9Pl8n9NPl%2FE3zqgd2RpHhK%2BHWyQdTaT0W2U0gFhfU%2FEh%2Foiqmg02eTz%2BBVjoe9uRH9YIbbELUYELGa9WtalF5Gptqb5LEGEbNQL7G62hzNUYWCQ1I1nX%2Fgf15TSbfT6Y0CABDn%2F0OMz%2FXmSdIlc7fwnud3WtpyH91hSPR2woQzNuh1qnTPgVA%2BzyRzYlXYgndJCpJaaTSL7TAWo5JioCyJY2dTHSlhE8peMirwyJm9bD%2F5%2FP21kHJwXeKkSijqIdGdQ%2FFk4R7WYjD%2Fu%2BjKBjqkAbBByuH8146oJrhaNXvQbIVg%2FjIQgMGiUdTdnKsMLDKmMFNnFccr0ufMeYwVHIjBsIbxwhHhdVxm9kAFvPIuftgcCHagXVJbZk%2FEItqXmgluOy8%2BarSipD%2BVArmzV%2FmC%2B33WTxj7widiLHBtP51BLo91ebdLfrZRNDMUodbuGtkngrdNjkYHG1wq8Rto5oG3H5R4WIh2ABX6xQd3im1gnTzKgdut&X-Amz-Signature=f20bae43fa4c94c5a3807f60169f230b832c2cb3d1e66f6f0b9e0062eeb09fe1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LBKDZCE%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIDEl1cSiFUzbWiYEgph8ZcUAYzUJwk8METlLfcbPXbCZAiAn5Z2isVTAr85XKPxE%2BaOrGXmvb3axt2RKyiKB8fjhMir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMO5u%2F2ZqN3UQSC6LkKtwDERiCK2q7kbgIxfor02m%2Ff%2Baup7o5RHbCq8s9UuxyPp8RJwoCXAHfFDZ634W2BQhhl4EDWf8o9LMU4jsIZdl%2FyhruTtRWhbM4nU%2BhxCrsRCYd%2FnOyGK2XV7QXoB7TIIofwcebXaHVRi4NmLEyfvIqCtaoIU5I%2BCULaWXNlUR5KvA2UNn45J2AVKrSiDvAkGVo9ShWa3OVeilnsYM4s10cFBpvzD03pk5hnSXrrUNrQeeBmPVfR84RzV%2BjXeKTVpN%2BfTBvWis6WIjHKcm0crDWliFs%2FC3wgY1HmY7dxTA98xr5EGsD%2Fok0M3VCdzRp8Mb%2BTux%2FwWm%2BkLA7Lve3%2BHOjNlCFOwVP8PrBYaozoiZUhF7wCyRxawwm6myxN3F6jsXk7a8%2BwKhX4tnzFb0fYcUKWTx6DyS01HFztGFlcpyTK3LyetVB6CNSgUfZo5dRFk5VeNu%2FyLAJvGmAVrNK4j2VFBXFXGl%2FM24WuVmIX%2FW56post0h0ij2ZyaUIb%2FP2NYwuAZ%2F0bTEEGsaZWl9mo5mQf1bih7ZaiSo6Eca9gK7Wo5JH5RNLsFUtebE1mJG5Lzj1hlZ3fUB1R8K4cXDKPIyRB%2FB%2FVaFiFA1zWO2xZ%2F0qR126%2BnJy6JTyfBoEla8w7dPoygY6pgH5NaiQ6kYRwUj70xQRU1S6yOOlsWSs2pXmh83Lw%2F31UNdmC1GwMta3e1JOLVGQDnrj9Co0snBkNn3pPjx3dNBBigkwxvBafP4Eln0jz%2FWL1ImAtptVcqGBlx793hsHoIQCWDbuql%2B%2Fb%2FDE7dUG%2BwMLS%2BCbPT9G%2FZqu%2BLmajv1MreY9vokKXWThg%2Be46Rl74dMhR0D316p09yyTDp0%2BRnPLAdZV8Nyv&X-Amz-Signature=15adf0aad7066bea65e4c3eb39b05b9c46727dadd2aaf61547868debfa6197d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665P5CTDYZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIAyPlO1mmbqeDGIYnTL0BOGBebSrL5pYUeuwkTXjBVX4AiEAp2BEXK2DqKJnOV13KwPivpC%2BPI5v8oFL36kgduDu6dwq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDElLIwn1i0AaYbxkByrcA4h9fmeG65d72w1h8xCxcofNWQys4i0EbvzK%2BcjZGvr%2F7Ai8l%2BThsBQgoVyrMT%2FgXGQOwdWMSg3HEeU13B63rC%2BC5BqTTtciUjOuN6D6kA1DXOuCcDeoOv2QTQxdwsByCaCaz4byvE%2Fe3jkf5qsVfi4ct2yJTAxSqvBxZSjU7p%2FcQG0HavVYxXgk%2BoUgYNY2Awj8q2qA0S3BOCuSbfLuta3%2Fh%2FoE6klz8%2BJKRoNSCvgV8ivMZOAFgnmLG9%2BMPyOPRbRrsbfFKEMZZtd%2BLIaWnrk1%2BcO1P5KO4xBF557N76txqMRRZGcszhidv%2BzD23LrzAE3DPJG3d5UWEXxjygmeJWRIWx7WLMVyynus8HbBdu4ya6klwO4iS%2F%2FtWoOW%2FBDha%2FvLJwHoUgg%2By0fEUUWNf96EWH4DsM4Uyg4aHFySpXmyXZCiDqobUW012XIJNIYm%2FZhtW4czMnJxK5E5Q99XP858EkYfCuPe0mBbUuqBvM%2FW%2BoTqNpMVQHJBbdOKV1pjbswZnxipJEXalnyu0djSp7stZQNYTSxVZAQj0bfBgs%2FTrofIH3tGHTeap3miugudfi8UqDL1p50bf3SSBaqcHgAE83nXNoYs0waj%2FBa5cuP3Y97ZZPCjbX87ukCMJDF6MoGOqUBPjGPIHVCI6p01kr5jDZxGgV0YBUizXUA7foRU0NQLUaIQXH8lL8kx7xxUC2XWCuBXQuflzccA8QTBVCprijG0%2FWdrixas%2B0URa9v2QHICZ2XBhBoTcrmwYmapJwomz%2FjQwmD%2B3uTWxsb%2FVmvJzZrP2%2BVHYe4jGcIyoqnW7QaLv5Ej8lqxCsWN2vHIV3meUkSV8HfHZlP4zqC03my9RTRoBzod9rw&X-Amz-Signature=756beaee31ce39f12a0b33f74b2006c1ee8398cea74627a03e66d65dcfb634d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665P5CTDYZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIAyPlO1mmbqeDGIYnTL0BOGBebSrL5pYUeuwkTXjBVX4AiEAp2BEXK2DqKJnOV13KwPivpC%2BPI5v8oFL36kgduDu6dwq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDElLIwn1i0AaYbxkByrcA4h9fmeG65d72w1h8xCxcofNWQys4i0EbvzK%2BcjZGvr%2F7Ai8l%2BThsBQgoVyrMT%2FgXGQOwdWMSg3HEeU13B63rC%2BC5BqTTtciUjOuN6D6kA1DXOuCcDeoOv2QTQxdwsByCaCaz4byvE%2Fe3jkf5qsVfi4ct2yJTAxSqvBxZSjU7p%2FcQG0HavVYxXgk%2BoUgYNY2Awj8q2qA0S3BOCuSbfLuta3%2Fh%2FoE6klz8%2BJKRoNSCvgV8ivMZOAFgnmLG9%2BMPyOPRbRrsbfFKEMZZtd%2BLIaWnrk1%2BcO1P5KO4xBF557N76txqMRRZGcszhidv%2BzD23LrzAE3DPJG3d5UWEXxjygmeJWRIWx7WLMVyynus8HbBdu4ya6klwO4iS%2F%2FtWoOW%2FBDha%2FvLJwHoUgg%2By0fEUUWNf96EWH4DsM4Uyg4aHFySpXmyXZCiDqobUW012XIJNIYm%2FZhtW4czMnJxK5E5Q99XP858EkYfCuPe0mBbUuqBvM%2FW%2BoTqNpMVQHJBbdOKV1pjbswZnxipJEXalnyu0djSp7stZQNYTSxVZAQj0bfBgs%2FTrofIH3tGHTeap3miugudfi8UqDL1p50bf3SSBaqcHgAE83nXNoYs0waj%2FBa5cuP3Y97ZZPCjbX87ukCMJDF6MoGOqUBPjGPIHVCI6p01kr5jDZxGgV0YBUizXUA7foRU0NQLUaIQXH8lL8kx7xxUC2XWCuBXQuflzccA8QTBVCprijG0%2FWdrixas%2B0URa9v2QHICZ2XBhBoTcrmwYmapJwomz%2FjQwmD%2B3uTWxsb%2FVmvJzZrP2%2BVHYe4jGcIyoqnW7QaLv5Ej8lqxCsWN2vHIV3meUkSV8HfHZlP4zqC03my9RTRoBzod9rw&X-Amz-Signature=aca55781b91d2880644934ae248ebeacdbb07b58ff12245d0e32115c9d83cc18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3U4ROEP%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIDbZCusVbLgHQkSSgiqy92sw3FMl%2Fp74klf9WuDAXZL%2BAiAhskAQifITzXT6s7UqbO7Fbu1l0YOzKKpm3g%2FhRuy3Ayr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIM91BH%2FyGteJzrtRK7KtwDNvHcGfqPL%2Bi2tCoBj6I5%2FMriOyxhXNd1Si6AsErEFrOrTqw7z2ja4B4V33hYdQO6Kg%2B6dz2F5NcPM1S2f1BA4vAvSNY3n9NH7w0Ev4zDhsqgChEB92UhZXkXBfXB%2F5HInTKGnD41eev%2B9I5tdV0spj1%2BJOIqlZBPyuTG28RyKFEoCY9nGCzyLB6oZ%2F4aZ0At7JtGth2tWMnIKetfqql9X3GEjxYIBrCwE3eV7YGS7tz5k14BzjpL94d8CQSAUWs55EkyYeXx3oRHGzGoiNeHRKCLBjf4SwxJ6a5fTy7PDyIQ1rS7XJOqg5cDlxzurO2hWaUpfDEmZL0bIw%2FaSuHdtD55s0ewun8mxnsFv9ppbYhfnYnCobpJnbuQmM8W8AsXwMxP%2BfVP%2FeQyl9huvj3%2FaenKqrYvTXGtxu%2Bnr72euMbD1YwAVjy3CNnUkXTaWde1b36aUaMsf8LnQVIQ6LJzggb9kKsEM2MkC6Zhh5XnTg5LRbNdKcJZG22N4iRrXKYK3e4Z%2F86EbOwL%2FgADxV6yUcBfeyiWSqD7FawR0cLoCrArlXMpoKGJrwf%2FpYFlqP%2F%2FHtxse6lc1dh4bkJPKTGXG6p46jMQ5%2FogOQE3Q%2BI8eTaelcGWn0O7NazPj3gw%2F9LoygY6pgGvIV3Oxj9y8WrScqlG7EOKyp1hYjcjekdwtUW91Y0jBBpqfIqnzLXqINwZ5MIveyia6y9jxchwdbcYXdpNv4%2FRkPAYt8BzuS%2Bj28bDowajQi57sQ2KizvQBOVS%2BSwp8ceCvZyskSkmyeVlFAZfiMYb12ultoUMhlOCgKaf8NXV3YoxOy%2F%2BQV0yU6sQ0fRNi2pAhSv97iZSY8x2s%2FfAEFQj1INx%2BtxG&X-Amz-Signature=1484560d7c6b60cece03b8d0807f46fe63d320bb3a63c4520af48bb360852ca3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVGD6HPV%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCICrbkPV6BZQ%2FX%2Bbg2TnXr2yEal9Jyix%2F8Q3Sqh0RXMd0AiEA4YQKE4ON%2FyAW1EhXi5p%2BaH9qCLGSTnktXtzV%2FcMcpfwq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDPC9URUuKejWb1t0GCrcA2zUVWPuzPCj576qADKOSU%2BgbD7CX6LkeJYfXLmloGBm%2F9Ez%2FOolVL2tW69TcF1hLdpbHJrlMcXQFXqDkAGDMBARGRZbKBnQrgJIucysCaprU6DThO2IlDA%2FNKCiinsreScEASGL27pX6WzngqzraxgOMZnTSPodRz5IIS2naMoGgyk766uMxcsKuU79WVx2GrjI%2FiSL84SS%2BHcf3ZkaEKDTXgYIwyouhRkZBtZ7xaKxRStMBYFybRz0fo4rdZXeaR2kqU8Oqfk5vAUrga9ZqheJROs%2FO9zeh%2FIAfDWzc8JAGpH50ogDwKnI%2F8jkab89epw%2BevbhEFEAQSED9vBxslZkMwNOVWVzX4FTVgzZPPB9rHwJpxX8bzqubiZhZzI3JBbDCX4ErPlvC0dnY3Be7fUpyObzb%2BJe9ZnmqsR5yaipPlhBnB47WFmKB8u2HSAwnFmOn%2F4aCgECKnuDexDcvnbetc0AktthReFKc3%2FOsgDh4dnyLfIfJ6c4m0XSl2tM1KK7C9%2FIZ3P3YrE9Oe7xF8krk0Vd9%2FEotTJGI8J8%2FJgEKrRoDZM0TXLQIm4SJEs%2BvyP%2BI3DDOAhd%2BFdQpj5pm7kD1Ql8twh7o6y7vXFO11Yfv3ZyJ%2BBnfLcWMT5sML7M6MoGOqUBXQS0Of5DMuQYcca%2BVotPjgS%2B20PFY4lAErUWqW7oTZZ5GeaE4%2FfqQyiZBi%2FeNCy9JKyEpRo9GcNoml9h%2Bkdao8UIp9sbALeNlOBsHNLntGa5mfs56ERqflba02AjvSp2csIlrRrdWCL5fZF8CTqck9slr6R%2BEu0XSyxpunNzsw2MckJ%2F9WtiP8shRyjXUNdn8eTJ0pB2dsdGctaGnEuT3hdNS6kn&X-Amz-Signature=b6ef751a201080842aaa8691ec0752a65a65599125d11f5f85c4dfee34dee1bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVGD6HPV%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCICrbkPV6BZQ%2FX%2Bbg2TnXr2yEal9Jyix%2F8Q3Sqh0RXMd0AiEA4YQKE4ON%2FyAW1EhXi5p%2BaH9qCLGSTnktXtzV%2FcMcpfwq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDPC9URUuKejWb1t0GCrcA2zUVWPuzPCj576qADKOSU%2BgbD7CX6LkeJYfXLmloGBm%2F9Ez%2FOolVL2tW69TcF1hLdpbHJrlMcXQFXqDkAGDMBARGRZbKBnQrgJIucysCaprU6DThO2IlDA%2FNKCiinsreScEASGL27pX6WzngqzraxgOMZnTSPodRz5IIS2naMoGgyk766uMxcsKuU79WVx2GrjI%2FiSL84SS%2BHcf3ZkaEKDTXgYIwyouhRkZBtZ7xaKxRStMBYFybRz0fo4rdZXeaR2kqU8Oqfk5vAUrga9ZqheJROs%2FO9zeh%2FIAfDWzc8JAGpH50ogDwKnI%2F8jkab89epw%2BevbhEFEAQSED9vBxslZkMwNOVWVzX4FTVgzZPPB9rHwJpxX8bzqubiZhZzI3JBbDCX4ErPlvC0dnY3Be7fUpyObzb%2BJe9ZnmqsR5yaipPlhBnB47WFmKB8u2HSAwnFmOn%2F4aCgECKnuDexDcvnbetc0AktthReFKc3%2FOsgDh4dnyLfIfJ6c4m0XSl2tM1KK7C9%2FIZ3P3YrE9Oe7xF8krk0Vd9%2FEotTJGI8J8%2FJgEKrRoDZM0TXLQIm4SJEs%2BvyP%2BI3DDOAhd%2BFdQpj5pm7kD1Ql8twh7o6y7vXFO11Yfv3ZyJ%2BBnfLcWMT5sML7M6MoGOqUBXQS0Of5DMuQYcca%2BVotPjgS%2B20PFY4lAErUWqW7oTZZ5GeaE4%2FfqQyiZBi%2FeNCy9JKyEpRo9GcNoml9h%2Bkdao8UIp9sbALeNlOBsHNLntGa5mfs56ERqflba02AjvSp2csIlrRrdWCL5fZF8CTqck9slr6R%2BEu0XSyxpunNzsw2MckJ%2F9WtiP8shRyjXUNdn8eTJ0pB2dsdGctaGnEuT3hdNS6kn&X-Amz-Signature=b6ef751a201080842aaa8691ec0752a65a65599125d11f5f85c4dfee34dee1bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLJQFPVO%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T110055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIA05OGzI4fzw4VtQne4jqHsnQbViqjRuRlnQoI%2FzdYYsAiAtgYYetgsaRKPIfC%2BiQ8TLltrrGAK%2Bz%2BrrXb52CBVEPir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMZtZSTyq8dn1nfMk%2FKtwDjuUG5Hw7P1V5jf7yIRLAXyVjtA1ZFYj1onPwSQ53ZT1Me74qLccsFXwYerDxjmFSfYyTzNleDAZZGNRsMLxfe%2F5J3HM3cmApaj1EgAtdlRz0RW9Q4ps5X44c9z83rbt0KNORqppnIBrJ4IwzfUSyPIi%2FJo10q1x8HJ0%2BmFOxTOKkdgnfIvK5kgGuJYb2ZFU1tTvJbzJrCmh4l7C4is%2Faq6D4Hc3J8XPEzM8oOHJ0ZYUmy0%2BopsWN3yUoDF7dK0fWMBgY4aZI6ZF8B2GPMYOGPUfL%2BTJIpz6KGNvh4QQTiXmu5K8i%2FogHwYZdEW4Aj9h3aenUmoshehEI56SJOGSQDWm45mrEiWetkSQl0gFmyBoQvlehlsqWsyGOoEdd3vhPfcVTAAYPCONOia6iFPx%2Bi2O4WSs0hLmRIBvPw1Xv3s%2Fa6pxk1lbw%2FoFKrSkzIC0XL3QnEiUhqvpCOIw8GD8UatQ4VcOnwI9uWnPfH7J0ymhrwmnmVhva4sWR%2BNg7YKpFBEC4NA8fn4BBSawfbcNgNYeXmQLD4gTjjMhCf2OQBS0XQgTHfAmnmifz3wRGISn%2FOHpeVlT8isgO5bFWWUhkVwQ3IhPM87keH2s3h8TwKJlCGdUNdmqd7OqBy0Ew8c7oygY6pgHnxP1BVhBjF1BFAq8WwA0bdl3LsP8Sheoo5i1HvuJ4bD7WzX%2BIO1lEgCxHHS%2BRTWiaL1rmcTFsILmLaGxToqDgjpmX8Yoss9%2Bj5iCDUdVVkOs2q1SpI6HOqIa9UybyoUJ1v4BobJDZ1hVy9ZCO3dG3msXzbzrNiwzTo%2FyDrTDy5pj8LPs%2BoVwLcDJmkdiLKE2b9jTqFmZPB9TlMjvlCL5MlUn21EsV&X-Amz-Signature=cde9c7f09eef6b6d89b5be9865c8e3e971a3e6b82a6e2617ad63d503cea90bd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

