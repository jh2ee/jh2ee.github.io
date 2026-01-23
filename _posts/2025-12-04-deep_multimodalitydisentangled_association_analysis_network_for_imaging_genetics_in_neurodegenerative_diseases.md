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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCNWQG7Q%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIB8pp3%2BC4efnjD%2Ftke6Yac11mymBZoT1%2BV5doTGbHLjfAiBig%2B7q7lXf2%2FCyl8o0XJ1PsrrRyTRjkam7k%2BM0NpeLBSqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdBkvxCrOoiU1OtBwKtwDOghbOsbc%2Bbvsl8SQev20CJGD1rspE0x0HObD%2FIQxIgyHSSyTkUuXmZ%2FBLf0TKwswZhVSdDNoQHSdYOaZ16JZmYyUqKOgWg1HJHo680wAUTW3iem0s2mlyiTtma0vt05ub8hs11hBtXqy8d9%2FD1HdI1FyZkwmL5dtRgNWKPCoYACYd9mQOoOusqVGET%2F3SoEALqtoIIf9CaNWvSzqhUyTsgQqvhP1e6ovamyQ2GXzBlqPhPM%2BaJsu8gpG%2Fc3YP%2FkB9Z7sbq1tBxWmCCEvi5Lxa%2FzWMNPVVayeruKkAXeBBIJSMGBojLgAY2ifvCLzJ%2FHpWNSzOa6nfNGbpQWAF38h21ilFtB25qRtRHwI10ke3UaOXVLJapvRPRZct%2B%2B04fY5xtKX15F81942%2F4GkTHrygmymPI%2FrLkKOgY1b9r0C%2FIkOQ0W1hzVhtq06q0HI78fEMcZ4bn0o%2FxXvdzIo%2BNUTsy68MQdQI0QLVjSAwt9Ph0PvjnKgM%2FdvOTlzdMcuUu6gDOV%2FGbi%2B911tJRhduc3vU13dKAAL1NBoKoaUSGjk2RQ4%2BufbuS1MZEpnj%2BwWqTAivgC%2FHVTE%2BPByDxqfPhjtCQ76QWVG7MM3FKQCFaOigPOQsLh97NyfYUfSBtAwhrPPywY6pgFL0qJsL6pb0N2knIOsanYLb3HfqTFvOF6xb8u2hZyEuUCjKJx2%2Fg6%2Flegz3DQunGIWExVPvexHHTnC4YdhsWbZdw5lK45fs3Z24cgMG%2Fjl32jq7762ujdyg2Cw0lvnx98UxQfseRATlj12%2FLLpi%2BNomUzmkSd%2BpnkkaNVDDIjIa6NvHL2bmk0qRlhxXyVyjj6tC%2B5r6alNZLedkts49RRM9eokHzJ3&X-Amz-Signature=b3ae987cd854d18341326a3afa5079d98d4b318031ca35416f1de0c9ac22ce6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCNWQG7Q%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIB8pp3%2BC4efnjD%2Ftke6Yac11mymBZoT1%2BV5doTGbHLjfAiBig%2B7q7lXf2%2FCyl8o0XJ1PsrrRyTRjkam7k%2BM0NpeLBSqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdBkvxCrOoiU1OtBwKtwDOghbOsbc%2Bbvsl8SQev20CJGD1rspE0x0HObD%2FIQxIgyHSSyTkUuXmZ%2FBLf0TKwswZhVSdDNoQHSdYOaZ16JZmYyUqKOgWg1HJHo680wAUTW3iem0s2mlyiTtma0vt05ub8hs11hBtXqy8d9%2FD1HdI1FyZkwmL5dtRgNWKPCoYACYd9mQOoOusqVGET%2F3SoEALqtoIIf9CaNWvSzqhUyTsgQqvhP1e6ovamyQ2GXzBlqPhPM%2BaJsu8gpG%2Fc3YP%2FkB9Z7sbq1tBxWmCCEvi5Lxa%2FzWMNPVVayeruKkAXeBBIJSMGBojLgAY2ifvCLzJ%2FHpWNSzOa6nfNGbpQWAF38h21ilFtB25qRtRHwI10ke3UaOXVLJapvRPRZct%2B%2B04fY5xtKX15F81942%2F4GkTHrygmymPI%2FrLkKOgY1b9r0C%2FIkOQ0W1hzVhtq06q0HI78fEMcZ4bn0o%2FxXvdzIo%2BNUTsy68MQdQI0QLVjSAwt9Ph0PvjnKgM%2FdvOTlzdMcuUu6gDOV%2FGbi%2B911tJRhduc3vU13dKAAL1NBoKoaUSGjk2RQ4%2BufbuS1MZEpnj%2BwWqTAivgC%2FHVTE%2BPByDxqfPhjtCQ76QWVG7MM3FKQCFaOigPOQsLh97NyfYUfSBtAwhrPPywY6pgFL0qJsL6pb0N2knIOsanYLb3HfqTFvOF6xb8u2hZyEuUCjKJx2%2Fg6%2Flegz3DQunGIWExVPvexHHTnC4YdhsWbZdw5lK45fs3Z24cgMG%2Fjl32jq7762ujdyg2Cw0lvnx98UxQfseRATlj12%2FLLpi%2BNomUzmkSd%2BpnkkaNVDDIjIa6NvHL2bmk0qRlhxXyVyjj6tC%2B5r6alNZLedkts49RRM9eokHzJ3&X-Amz-Signature=b3ae987cd854d18341326a3afa5079d98d4b318031ca35416f1de0c9ac22ce6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HRTSVNQ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIBdGUyrOG3JkPLiCzXHjUkC3UVIQhiZSahjTsKL%2B%2FLiWAiAZ6dtqkcYsQB%2FYE5UII5onmeDVo3p5Z1QQjvHDIxnkAyqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJGbwcWGcm2dZJnpBKtwD3gPorEWd57xcEZCfn64kYhPqClWEwlAR60yVlt2ms0kCNcQxqPAOBL2LwQ2UrzHp6abNxeTqMcLucYziIgmFDM1RnyZebyzC2lGPQpscPOM7EA7GFRZiVFyRhFrpEr5t9F8W5bCr1YT%2Bjr%2B4OTglb8%2FRnBimOXZsug6IVDGzGvqwpYhOUtzfgiDElTEnWTY08UPBFoVgTy51r3lk%2FNwX442edozLdwptsPigHxsmk4Z4JISBsGsUcJUV%2B3oj0htIAbE2%2F9TJ45fyKVtKEc6Vikmu19eiS4uAbnCyE908A7LRyQ5n%2Fk%2F%2FehMAkufAfZ2v8EbAYmu0i3rV%2FkIm%2FMADsnRQ3Ulifqv66dwiHehi3hYiX2Za2PuEsS8n98sulE22UGTTuZBBRKzgEOM8BVAjRsHfSVRdpUNjSxMXHaXYamxllAPEWJDAjNqQMcxFFtnXJuOLPBJnIl7hYnI2WgsG%2FvUf36gSO3tUDnadgFl3u5PECbNTis39KsQG8ar%2FPYH0HuG%2FO3undDQUJs%2FM8LbJVL9MH0lGVRS0Dbj9OtjeZKTG0EWJbGkPoxX9yBEBD1dQCdUgoGXEL0bjAzd0r71TP1ELYm97mLWlrxJRUiMs%2BJfGxbz%2FYNovDVgRX6gwmrPPywY6pgHnHTWOfggt8W77IjbFfvpt9n5CPbEpE6yb4eYka%2FKPB6ftolqBrYPTpaKQ2%2BpPl%2BqmTshChPGt144JZsf86xIPKyudYnk3wOeuBHDFljpx%2Fa2%2BFc7AIolwYkxeR2VzUi%2B1owMdX1ZMQE%2FastN%2FLhzie6nrBeuXWu0H0250%2FIupq7f16blhrhzP2ZeRqm%2FEv0glRoj1gpPWNSvry1HVCAFtJ804nOEM&X-Amz-Signature=1e6979989157f1a7b874b4f15211c6bf48def6deacee187073b2e16a69c2572d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RDLW33I%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIDd1sPEKBr%2BhB7kYtb6WGGRDgAKRjN8pA1xf7gEbbRuLAiANBPOQDoav6IvbwFiGLPAmo9os7M1onFjhlg40okej5SqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhULuD8inTm24cevnKtwDmUkmU7g6VbH2dK3lC2AdeSU5SUD1DanVlWG3kN8CLbfWSdHFHaw76wclHuHJZs9KgDao3vmDD1JxSgoPq1sohBukUKXMByNUazEMER5%2FVJHUzaA7smDSIJu8D9JGNuyEz0oIK04EF4h0ajv9sxfhO2USHiuwPsJFAYYyvj8YgWEe6LDDvm6cVxCXcdIrRvEK30cARj0E5GssE%2BQtC5EF5AZKhPcoA4jJoQQjWSQFA%2F%2F0ueeSdh%2BgoazYzwJiR786y0xX%2FDbHFOmBJVpZPuLTswKRMRDBVfQMiW0aGOQ1cqz3%2FcpHQgvMENZRkhEsNa8JShO8Pgxprl%2BWtpb3H8OEbfaSQQFMQdC1BYM2Y4QnA3pXHhsQv4lr89lUu4X3M%2FSUIb09tSQ48hRV2bH3uyQWePvtu6T24Oh19aUXl6LimOUtUfCH9epngM339z1ftkeNJs5IO63RvJsqTenPWJGkJS2K8MwsrwNcBooYkONvTOTIqFxXnLR7a%2B5fVXdgw3%2BBIxwZSiATOZuosbkYwDHUnfTzNoJpSZ78RjszVn6OMGxRyQOUhKgvAJYvkGs5jSdG26FYLAuiPC6p4v%2FIMdIvI7G6Y0TiLvEXAo5muqj923ZH6l5JmCLyZD7GgtYw7LLPywY6pgGcn6J1U%2BrHAL0js1HwAiYR2eVtttKYDTja3tXoLxoB9WWkyeuUHRRQq%2BAL3%2F6rubj6Z8BV6jb7b7y3jWFpaM2hO0t6aTnh4YtpOe6QxG5buim4Ba8xW2245oEzCMMIQbVCBUaI1iju7NUoKkGEq6VywSwefUQLNYl0G2sEsW3puKWde1LfWxXTzqEdnxJzCz463qQCPT95PDleIpHYr0vgjSOMisj1&X-Amz-Signature=83bfb8093c07048e99bc11d118a99264d4c8e65aa263012bd9a70c88aa23068d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RDLW33I%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIDd1sPEKBr%2BhB7kYtb6WGGRDgAKRjN8pA1xf7gEbbRuLAiANBPOQDoav6IvbwFiGLPAmo9os7M1onFjhlg40okej5SqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhULuD8inTm24cevnKtwDmUkmU7g6VbH2dK3lC2AdeSU5SUD1DanVlWG3kN8CLbfWSdHFHaw76wclHuHJZs9KgDao3vmDD1JxSgoPq1sohBukUKXMByNUazEMER5%2FVJHUzaA7smDSIJu8D9JGNuyEz0oIK04EF4h0ajv9sxfhO2USHiuwPsJFAYYyvj8YgWEe6LDDvm6cVxCXcdIrRvEK30cARj0E5GssE%2BQtC5EF5AZKhPcoA4jJoQQjWSQFA%2F%2F0ueeSdh%2BgoazYzwJiR786y0xX%2FDbHFOmBJVpZPuLTswKRMRDBVfQMiW0aGOQ1cqz3%2FcpHQgvMENZRkhEsNa8JShO8Pgxprl%2BWtpb3H8OEbfaSQQFMQdC1BYM2Y4QnA3pXHhsQv4lr89lUu4X3M%2FSUIb09tSQ48hRV2bH3uyQWePvtu6T24Oh19aUXl6LimOUtUfCH9epngM339z1ftkeNJs5IO63RvJsqTenPWJGkJS2K8MwsrwNcBooYkONvTOTIqFxXnLR7a%2B5fVXdgw3%2BBIxwZSiATOZuosbkYwDHUnfTzNoJpSZ78RjszVn6OMGxRyQOUhKgvAJYvkGs5jSdG26FYLAuiPC6p4v%2FIMdIvI7G6Y0TiLvEXAo5muqj923ZH6l5JmCLyZD7GgtYw7LLPywY6pgGcn6J1U%2BrHAL0js1HwAiYR2eVtttKYDTja3tXoLxoB9WWkyeuUHRRQq%2BAL3%2F6rubj6Z8BV6jb7b7y3jWFpaM2hO0t6aTnh4YtpOe6QxG5buim4Ba8xW2245oEzCMMIQbVCBUaI1iju7NUoKkGEq6VywSwefUQLNYl0G2sEsW3puKWde1LfWxXTzqEdnxJzCz463qQCPT95PDleIpHYr0vgjSOMisj1&X-Amz-Signature=f07cc84dafa43bd19f00e46dc52bc971169eeb596e98e50f48f80090ddda0066&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAKABMCQ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQCcMZrKfK%2FxNVDUJy0VfQdRxriSp%2BGR6HuPSp9ZgdULKgIgDP%2BO5epu%2BQFB827mdp4aXlquuF9av6lJs%2FXjPN6phaAqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNeVSRiZfn2QKbAclCrcAwzoTG%2B0HK%2BfO4Kq2B5VxIvjF1WDZmmTeCaY%2FStW3cbwb1OZIWLeQATZTgbZZQp918k1ohCiHxaHE3qr%2FgY88o3OownXzZ0gnglb%2FDpLIEwgHy63RbPjkyUYmSwejSYaMb65vn%2Fn5idUgAk9ZIssvceaeGgrEafxC5zgG7E9dJcskh9QO7hOl1Np9TDm4rDKg1uLc4c1sycapLuSNjou7bi3YcEwL5%2BXsnr41a5MZoYap2Qkb3UgXgMoKnOib8CdULE6STYfXb%2FHaskpXx787GBus8ssgLHhe2vlqqE8NHp5fcru7gthaQBVmqRerTVXazrhIS7mNKrtKDQRXMCx3CPBu387NanVg6lA7dQuMTcT1wxXaBZO3d8kf8TsiSVqtaBfNUVBDtEuyTWlDaIPDKYhiekIX0HRCS39F8MY99SQ4OfHuHUP%2Fz%2BfJxabGnjdD05uhFwxsdSfschOoXATOKGjW2Ech1P4olnJ4QiP9oceFQlSzSsPrJOPaupQrR7XVyIWFCWIWEtx2GTNMEFl7dLqQPYobwdMmGR8tu4qhJqKsABJkQtO4aDBiOOLsIphdfnOqrgc8ED9%2B3SvCLea2di8zitzx0U1uruynbbCIBAheXzJEhgfdxKpOUzEMISzz8sGOqUBQIsrlIYMU1XqKwSa%2B09cjeuERDkzrRWl3%2BoPUMOUbn4wll46LamLWfyQ9Yc9HsQGKQD7s8eJY6vQ0w0g%2BGLc31ft7uepkwggmWrZxYGuEQS0hi5o3Zsr9iG9WFp%2B3CSLjGUVXAEnUiP6OVpzbXpBVOj8SrBeKDDR4dTTjC2rJUq4mhrpSw3hKe%2BMugVORHjom0pBYFqO6iKUXpwlGqm2WMzGnMAX&X-Amz-Signature=915177aecaee984e05ae8e288c291a1fb2329dfe1b5f7a074ff065b2ef4b231f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZM6NHPPA%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIBlOydm%2BbcXfMT%2BFvMcAslD59XZ7ArwqwdP6G0O%2BIUUeAiBB4uyXJ8gTP%2B3%2BNjcLvfIL1oJty3h8SYb4CrHmsxncACqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZVcR3rp%2BSIgzPhRCKtwD%2BpSX540fwKbB1doLa%2BZSvr%2Fplrm8CTt%2Bi5d53Fl7yruEH4Gnqi07%2FhUn1NPwki%2BI6aLBLC7JH5S3CaimoPmR2XWY%2FNZaLVujgrVvjJzhau2xzT7nFw3SoueFXqLEjtu9LsKgFZrfeSKsg%2F%2FXU%2BdPiVR8092yRt%2FlIuLO8CvN98UeUeavOQlznl4Uy5xfi2dytwxBt7qlZwYH2HYw7DR4%2BjUs5QxuJ4KRBSp7Cq%2FkTAA6i1p1ZamMfkPHl5mMms3nQRAPJJwxTAlMW6fNWVL%2FCqIgWfdn%2Ffe26l44FzPr9hEibA61HAHfE8OF3UnIktkXuyo6pIvn%2Fbjw%2Fo0qBqG8GCgRRven%2BVJXEYu5ANb9EptLNQrpIe0NpO6TBSnJfZAgp1O3ZA2%2FjRyB1oPkx6p3FG1ttOGyR8gifkFyO%2B2HRMilqYmLkw77jbJmd41%2F2JwC5qRqpmnWtKmOJhLz1ttYz5EwRr5PSH9aoDdEB8FnPxVj5GTVyPFlhuRMwJwpBRPlfdAcKhL%2BPXLMBErFPg%2FxfVBwuXEHNTyQdzyMjG9RrJt%2Fxf5SNo5YKYW9skRtrRvJHLJcRUvBRqvr%2FjsO49Z8flAbd0MdvXVb0pmCxdk4r8AQJ0wL4JQtMcGKTgow0bLPywY6pgHJON%2F0iXs1T6r8v%2BrwG70trNJGZPMS%2BXFd8UHxhYIWFidpjuXTF8r0FU%2Fx8oCad3bvLRULEjQn42C%2BGO%2BJWQk33XSvK8pNbFfez9UeNSh58pRqgbgvTDDUye0zirivxOBk6sO7nA8Tlnj%2F%2B0qiB8apqPYDbFLyfUdSfhsCZKJL7NzNnxm5JaamMh9lBKcTwXXlTzEwidAdEiPZCOXyhuP5NHLZFNmj&X-Amz-Signature=ee68afbed8264e8848bf0a4bb9ce244cacda9d2a4868f885a02116f9f00fd0d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPSJTPYT%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDOCFDuZ4RHMl09kwINn7CfUpOAykW0bgBcfvuZQa3MGwIhANDz9aN%2BUAOfdxB0A9git70yO0AqcyxeNwPRHUHhMSU5KogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzPJHndhDsZc9HS56Qq3APw2wgvI%2FKzW68ZO7NQsI%2BBSi099oaZLpqxMCqAUQ6T1xg5ZEjtmIRv3uA09nz1bd0HFrzRIEXr9%2FsgDIggIe4KniD%2FJjMp1f3WcrJdya9TFieEH16X41P%2FrgfI6x%2FTY5Dcm551xYUWjn%2BrvJW6DAb4ebPVmp%2FJFAWK5Zn%2B%2F3Syj5z4P4naCDSctuTTKuOCEVtq1bCJlLYywzayoDHmkSFIhcqhgNiT0fPFPEJ5O4osunUvACcb7bg5p5k0D0JapP3gp605MtWFrVmvCu27tuNIS%2FC0I65Y6GmgOFOSDb%2BLYPcEwbLHq7AVClRb1DWwWP63VBWqSFxe1ZoD4ywtB5%2FpbCME8F1PKusW7wcRs%2FSahNs49v31UOsmSh8OAHUiDmgLVmUoIoKPs3uCUHvLHncEYM5Mnt7C4eYHTsdDj%2FZkK3%2BE5xhQ5v6xuedxqk87whpmBVvuehtgLaYMahv0TL7ifdMs4MH65P1S4PSxxWe%2Ba2BQfkB%2BdctsuVMM3YC%2BLIlbc1Au15CSxUYprMcLTacYWWF57hj3qjQIMQdWpJ5j4mDaR1BoiQ%2FsqoEWSXiRoD4jla0zM1EuudlJ6T9fMIuFf1OBUUEcxEbVYRxyY%2BvxrIeFC16SkGGWUEsKEjDMss%2FLBjqkAbn%2FArqXcSY4WYeJg42EGiMEMybzLFrW9%2FPwOsjaIhJCa19m3Zd5YHW6hdJqKkbMXcMkbjoQv5NsvtHipdBSjdGGW%2FkLY40YWcUHoCEafujzxAqLO16CFNow5UyM3o2aZVljsL8YjBhxNn0fYGgBCG6%2B8PgmZJTZobOoGliguUvwguBq%2FGZqrYdsKEtTKRAERj1fLaEVGqf6zevQqEhWt9Ra6cDb&X-Amz-Signature=72785ccf48960cf6f89afe9ecb159d3da4b1743dc598397b47ff5564c829128c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HRTSVNQ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIBdGUyrOG3JkPLiCzXHjUkC3UVIQhiZSahjTsKL%2B%2FLiWAiAZ6dtqkcYsQB%2FYE5UII5onmeDVo3p5Z1QQjvHDIxnkAyqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJGbwcWGcm2dZJnpBKtwD3gPorEWd57xcEZCfn64kYhPqClWEwlAR60yVlt2ms0kCNcQxqPAOBL2LwQ2UrzHp6abNxeTqMcLucYziIgmFDM1RnyZebyzC2lGPQpscPOM7EA7GFRZiVFyRhFrpEr5t9F8W5bCr1YT%2Bjr%2B4OTglb8%2FRnBimOXZsug6IVDGzGvqwpYhOUtzfgiDElTEnWTY08UPBFoVgTy51r3lk%2FNwX442edozLdwptsPigHxsmk4Z4JISBsGsUcJUV%2B3oj0htIAbE2%2F9TJ45fyKVtKEc6Vikmu19eiS4uAbnCyE908A7LRyQ5n%2Fk%2F%2FehMAkufAfZ2v8EbAYmu0i3rV%2FkIm%2FMADsnRQ3Ulifqv66dwiHehi3hYiX2Za2PuEsS8n98sulE22UGTTuZBBRKzgEOM8BVAjRsHfSVRdpUNjSxMXHaXYamxllAPEWJDAjNqQMcxFFtnXJuOLPBJnIl7hYnI2WgsG%2FvUf36gSO3tUDnadgFl3u5PECbNTis39KsQG8ar%2FPYH0HuG%2FO3undDQUJs%2FM8LbJVL9MH0lGVRS0Dbj9OtjeZKTG0EWJbGkPoxX9yBEBD1dQCdUgoGXEL0bjAzd0r71TP1ELYm97mLWlrxJRUiMs%2BJfGxbz%2FYNovDVgRX6gwmrPPywY6pgHnHTWOfggt8W77IjbFfvpt9n5CPbEpE6yb4eYka%2FKPB6ftolqBrYPTpaKQ2%2BpPl%2BqmTshChPGt144JZsf86xIPKyudYnk3wOeuBHDFljpx%2Fa2%2BFc7AIolwYkxeR2VzUi%2B1owMdX1ZMQE%2FastN%2FLhzie6nrBeuXWu0H0250%2FIupq7f16blhrhzP2ZeRqm%2FEv0glRoj1gpPWNSvry1HVCAFtJ804nOEM&X-Amz-Signature=ab7bfe45d5894e923e53a10ef7fae0f8142e5432c3fd7cc103efeda228d35b74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HRTSVNQ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIBdGUyrOG3JkPLiCzXHjUkC3UVIQhiZSahjTsKL%2B%2FLiWAiAZ6dtqkcYsQB%2FYE5UII5onmeDVo3p5Z1QQjvHDIxnkAyqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJGbwcWGcm2dZJnpBKtwD3gPorEWd57xcEZCfn64kYhPqClWEwlAR60yVlt2ms0kCNcQxqPAOBL2LwQ2UrzHp6abNxeTqMcLucYziIgmFDM1RnyZebyzC2lGPQpscPOM7EA7GFRZiVFyRhFrpEr5t9F8W5bCr1YT%2Bjr%2B4OTglb8%2FRnBimOXZsug6IVDGzGvqwpYhOUtzfgiDElTEnWTY08UPBFoVgTy51r3lk%2FNwX442edozLdwptsPigHxsmk4Z4JISBsGsUcJUV%2B3oj0htIAbE2%2F9TJ45fyKVtKEc6Vikmu19eiS4uAbnCyE908A7LRyQ5n%2Fk%2F%2FehMAkufAfZ2v8EbAYmu0i3rV%2FkIm%2FMADsnRQ3Ulifqv66dwiHehi3hYiX2Za2PuEsS8n98sulE22UGTTuZBBRKzgEOM8BVAjRsHfSVRdpUNjSxMXHaXYamxllAPEWJDAjNqQMcxFFtnXJuOLPBJnIl7hYnI2WgsG%2FvUf36gSO3tUDnadgFl3u5PECbNTis39KsQG8ar%2FPYH0HuG%2FO3undDQUJs%2FM8LbJVL9MH0lGVRS0Dbj9OtjeZKTG0EWJbGkPoxX9yBEBD1dQCdUgoGXEL0bjAzd0r71TP1ELYm97mLWlrxJRUiMs%2BJfGxbz%2FYNovDVgRX6gwmrPPywY6pgHnHTWOfggt8W77IjbFfvpt9n5CPbEpE6yb4eYka%2FKPB6ftolqBrYPTpaKQ2%2BpPl%2BqmTshChPGt144JZsf86xIPKyudYnk3wOeuBHDFljpx%2Fa2%2BFc7AIolwYkxeR2VzUi%2B1owMdX1ZMQE%2FastN%2FLhzie6nrBeuXWu0H0250%2FIupq7f16blhrhzP2ZeRqm%2FEv0glRoj1gpPWNSvry1HVCAFtJ804nOEM&X-Amz-Signature=854aba502a0deb7a46bbffe952f4100203ac0fe295d445b2cc98752fda0a48e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TOGKENJ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDh1F%2FJIVmg5wrCJv%2BtmSMT3I%2F1iQPUDQoMSRdpgWJQzgIhALvCH0Q%2FlsNNFDlNos0SSjCJpiO7b124xaZBwuufwEPgKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwqW71jdY%2BKrOSZZAMq3AP0Fkb1685lNjZvUCkdvxTRO808b5hB4xBXYPLiZ%2BY8u7kqb9975yZWYccuH8BEwL8n%2FtMu59NzJFIKmV7aoXAp%2F3%2FH3V3MlgJ9cGMvfSX6u61TD3ZDSTArHQI52qCExeRDbyKYDapTRqxuCb8gxtQhs3yKZVndQ3ONtuaXbMlyLLFXdWlyCBvftXJPvv6XyeoxL2MfTmMJwsfFpEEvTACilR5QK9qp%2BrOj49YIP4SUUV78K0hPgzDfFIm63wSyIKkncYCAzhRbG8ugA2VBHDE1IyJcKqF3xrCsnS9HuXpGb14%2BFd6BkU5QWqkj9r5WtByLAZ06xjj51%2FRtmn1HTmDGieyL8RUTU%2Fv%2Fpg8ESI34STnVC3UtJ%2BkJl%2BHycNagZ%2Bbya8g7TAIcBEY3x23qXNe0mkdCENXQQNGH9rD6Jnk00MmQKC8Rmntnf1RpNQMSVgF2GPA3PzgYjA2NgcLBHPeJYU3XOF2AJc%2Fb9jLeNWTpvvepaX1598rcrDh0j0y8fDZ%2FG8LKHokLZ6Mcc56PxOIo3EYXe0RaJtJj3QmmMN3JiO1tfvIvoQggJC5wrPBxWjlLhrOGJ20D4M5%2Fm24OnanBkdmT9wRGZHV19uC8twp7jnfCGrpwSUfqCwnZBjDfss%2FLBjqkAaikenD%2F%2FoAeOaD3DzoWnO6fqdGJVlGVDj6QIlKZyh5bF9d4RhByFI2KpduSCjjxdP2O8zu4aZuLaT2McqtzwEoO%2B1JELJU6VXFA3Vli17FrTTQH6Ua3XZjH4qPUD4XqmqViE3epzqAxm1GiRBTkKOq1czANgRPnTSWUI2QYTAKYfQdnXIljnrP%2By5wTbM8IfdRs9REzgL7jveZQxhuf46g%2FwPUQ&X-Amz-Signature=87bf5928fdee589a2e3c6a193d71843c1a2d555c8f6ce8051079c54e50ab3881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6EGWGD2%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQC5OsR5eSjJghlHM5mJq3WfXQ6PeauN5x6FP%2BX3tkghlwIhANsLgkk%2BplwoxabZKo0tanCdpdohIV%2FLyzRqHCSDXT8wKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyMZ91sCt2PeIsF3a0q3AMYQYVUJuQcMKLP3c%2Fgr5BKELGYFeRGGdUPdn%2BK0L%2BuwU%2FjVUGBdfOrMiNd6uXoigVwqOJMeW6bOD1Q30wL2rZLK3ZQrlGUONptBO42%2F7FOcwOnbSuGf59OioV5aOZbDnc96B%2Bea6ffBpT8HzEaZdOmjpCtunR1ENNTRHpVYIa22oarD8M7ZNLr3z6ZA8vDPFPqYaIcgKwXqvs59b5d%2F8lGdhrKHmBGuBFw1G8PFlRzkgw4Z1M3bZpyZT6BgbqgYQoVzzJnZXbUExeM5yl8EPdK1wXYjfW5QTCIeyeNsEAUr9VCoJEMvZt%2B%2BXvkh%2FzcQAQJ%2B%2FUwG0PycEOspydM0XJqxpE3MdQYH3ACodIn5q5U%2B5Oj79HTyRU4JgLN6YaflWi56R3KHzk5KJOk5JyUE1L3d0vEqhAQEQZZUjFQf17s8kvcWkkNkgQUACG98SPxqzZ1%2Fho6anYtfRqhmkw72zpsk%2FJfgMkbBig8hV9A26NhEs0fNS%2F%2FhIr3rr6SI5hOd1ZI96%2BRtEsgve8XJo%2F%2BF0JKRU9GyqpXgeOb6svDvkmYd9BYmuQnolzuPFPcMdRFXHaLQdOtcXrBBgXKT%2B4arJmQsdNHIFXtjgOiGi%2FrraeR8ZDF27SK%2B4cCSK%2Bt5zDmss%2FLBjqkAYF7CoLh8YhgkPw%2FB1Ame%2BxOqCj5atHsjycWDYBvzsJYdy2SSlc7Ro5%2Bcl4yh09XNq8tfHa753YQPB1Q3k4kCdIqDzFciAHK8I0399WO1JDU0Dt9ih3Zy5XgUbaUuUv3KVqvvXDn9%2BUPKaQBFVD%2F3iC1518%2FQuzHlaw2Ch6j9bd3Bu%2FmNPdwGgpxW3r70M9OYim1ZL%2BcJlBi5DJPE%2Fv2nlE3L32g&X-Amz-Signature=73c403b1c2b78f6315f6a31c3109d7659f8b971ac4c90487b77c5fb287215ab7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6EGWGD2%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQC5OsR5eSjJghlHM5mJq3WfXQ6PeauN5x6FP%2BX3tkghlwIhANsLgkk%2BplwoxabZKo0tanCdpdohIV%2FLyzRqHCSDXT8wKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyMZ91sCt2PeIsF3a0q3AMYQYVUJuQcMKLP3c%2Fgr5BKELGYFeRGGdUPdn%2BK0L%2BuwU%2FjVUGBdfOrMiNd6uXoigVwqOJMeW6bOD1Q30wL2rZLK3ZQrlGUONptBO42%2F7FOcwOnbSuGf59OioV5aOZbDnc96B%2Bea6ffBpT8HzEaZdOmjpCtunR1ENNTRHpVYIa22oarD8M7ZNLr3z6ZA8vDPFPqYaIcgKwXqvs59b5d%2F8lGdhrKHmBGuBFw1G8PFlRzkgw4Z1M3bZpyZT6BgbqgYQoVzzJnZXbUExeM5yl8EPdK1wXYjfW5QTCIeyeNsEAUr9VCoJEMvZt%2B%2BXvkh%2FzcQAQJ%2B%2FUwG0PycEOspydM0XJqxpE3MdQYH3ACodIn5q5U%2B5Oj79HTyRU4JgLN6YaflWi56R3KHzk5KJOk5JyUE1L3d0vEqhAQEQZZUjFQf17s8kvcWkkNkgQUACG98SPxqzZ1%2Fho6anYtfRqhmkw72zpsk%2FJfgMkbBig8hV9A26NhEs0fNS%2F%2FhIr3rr6SI5hOd1ZI96%2BRtEsgve8XJo%2F%2BF0JKRU9GyqpXgeOb6svDvkmYd9BYmuQnolzuPFPcMdRFXHaLQdOtcXrBBgXKT%2B4arJmQsdNHIFXtjgOiGi%2FrraeR8ZDF27SK%2B4cCSK%2Bt5zDmss%2FLBjqkAYF7CoLh8YhgkPw%2FB1Ame%2BxOqCj5atHsjycWDYBvzsJYdy2SSlc7Ro5%2Bcl4yh09XNq8tfHa753YQPB1Q3k4kCdIqDzFciAHK8I0399WO1JDU0Dt9ih3Zy5XgUbaUuUv3KVqvvXDn9%2BUPKaQBFVD%2F3iC1518%2FQuzHlaw2Ch6j9bd3Bu%2FmNPdwGgpxW3r70M9OYim1ZL%2BcJlBi5DJPE%2Fv2nlE3L32g&X-Amz-Signature=73c403b1c2b78f6315f6a31c3109d7659f8b971ac4c90487b77c5fb287215ab7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666A2TUYOA%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T210113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCID7Fg6vL8ghFjc6NN3mbFRmvUZwZfRqtTSe8FJJ62bPIAiEAq%2FpSkMRPnuOIhUwUcks%2FTOw%2BXO415PNylRgEMgfaJqAqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIR5cTHIbLPQGlHpjyrcA%2FHsIOvxgxxn5RhamY4uQ1PQoKJEBThijB4PX39eUuwd50BKIZCRUIp72oKc1Eoc6Szsn4SSZJA7yqR6wXQxSqWv8j95W%2FamLDmJz9LSS%2B6bKEEb3ZKQVgojZjLc2D9oXF4CSQ%2BftXK7sgxwgNd2u5j%2BZ7FDGJ48mMpzvNA%2B%2FTW9iwXp2wnp7hyexpi3gzfDE5eHDRidgAc2kDbJ5eOBMuqR4%2BXmZPx44Weh2FPQRKBCCdB%2FuvtEovSCArjjkhQiJMOjpmzmDazNPB04EnJ4Lhzq6SZZVAjUqvwJdFnT%2BlWRnC6S%2Bx3%2FRBZ2rTXDR4U%2FO9pHkSfBXheffcpwaNK46p2IJnki2NP5Y26XKIq2TEWSWq1maE7hAFrSGDc8j8Ms3wfQwQ4XOM6SgV%2BLk4aJ0qreLZpCHbbOdYSo1jLezYyPwOGlG5O744B6q4glQJH0Vr1ubTX4nY992DQoMFm0VSaHf%2Fop2kejQm03RmKy0Vbel5FQORjp7ggoXSVDXffbdKZb5GZBlENBiXzfS3vDjy8%2FSLjMs9LQNY1Q8gVKUSmInd0p5MtueOOxizN4UlsjOBIPKkSAfeVI9z25vA83%2BK2iJoXVaLLxJKpN1Vf4eX8lneh2S0gdKBEgZd4xMNSyz8sGOqUBgpgVrAQkm8sfUyDtk2eisez2Xai4mMk7ueEeTblSpKDCQcNozWGgHEWYOZf%2B5QorgFwC5jJrLGw9J1IX%2BtGHRHPJu1KKpPH5MfhPLRMa343iHW2EjauypTiULXuXtVMyMF3%2BZvEzV%2BQCIblVEuJvBoPiJTaHOtdyNPUoE4gd%2BH6W9XSuXabeuh3HvRcM6fz9is2mHawcHmCth8Jk32dPqLMzQFHn&X-Amz-Signature=e4065062b30c607d190fa926379d3f69bd878c6cbe1771551c7aa99bf2044f2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

