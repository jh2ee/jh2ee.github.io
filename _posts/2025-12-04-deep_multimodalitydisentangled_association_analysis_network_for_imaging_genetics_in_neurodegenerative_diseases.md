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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H2GU6NC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC67mgB2PFMXJ8wK%2Fx0wuYbbLinHK9wj8spTtXploxnpQIhANjiaf1ESB9v85J%2FHZd6XLLUeT2fdtE3Dmin%2FrxmqrPwKv8DCCMQABoMNjM3NDIzMTgzODA1Igwj6J9URf1tk7vMjeQq3AMeWQIJI12ag39kSGU1WE9ExURNUOf4nBn1uNGi8u%2FtASRjNHobd76ED6B158y8T7FAJXpPA4YzdRzRlOhDeUrR4yIsZ08aAK74j7xht%2BWgZvnLEj8W60J5E15UK2SERc2jn1%2B58OvxKYw04oT9%2BE8VoYKv7iD3VbnvuEPfZZ1UXRsWNeUnqzgIE5Zgm1UabP3wxF6g3ibuxgZREv%2FVUDMYgbyGzRQIUEow%2F8VamUJX0lWGi3DqYpVUaYvG0o%2FR5bTdcGi%2BYCnz0XQxfIyLHg%2BhF2sPeG0jB7XQpA7hvPNiKgoVpvfSD0Wwg9RZQuke6BG6sckehgreu5Ilck6TgoKSpbllIfR3VB3FgB7Skqt1p3dwX8VgCXHMjcZGQQEMPGrr2pgzF%2B8gJnPfbdlmStE4zFRjicr2ZfGAvwk%2FTorkAgf5w6VmPrvxFQsZIVRVo1TMWx4jtYD0%2Bz51SB7AuqH5nGjJyxplM2XR5cbyCelnxv3JLhKGD1fZ6c8CGLPrINVRpJJdlZOOOx1OTumuh%2BYXfgEuxZ7CtjhX%2Bqc1DXB%2Fv%2F%2BgshkiXl9GPn4GKDBnge5Q6yLA%2BSz2IeZISFaW%2BFknKNgezsamuRkXaUpfaHBiN8aCWDmAsZzkeTWPdDD4qZ%2FLBjqkAfUr3f%2FnNeA184p%2BGRKX%2Fl4rYH8tNNY%2FuAvKGxO5IITLYky6reObspPQN51%2FQvxuod%2BAyD4FDVJKO4Xa%2FB4RviPitJCauSm7%2FvfenjgtZ4qJdtNHzHOG2o2NGr2u0yCD0RBXWFvEq70ZbtQt86Pm%2BPMUD4KS0BJlk%2BgzR5ymjg2O6rocMylOEcvDOSyvPCB7%2BVYidtmloKX3oGELJl3ltyddqpC7&X-Amz-Signature=4328cbba1d2bb046723ecf1011d4d4308b227489e9f8c8d6b6f681a34481dd15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H2GU6NC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC67mgB2PFMXJ8wK%2Fx0wuYbbLinHK9wj8spTtXploxnpQIhANjiaf1ESB9v85J%2FHZd6XLLUeT2fdtE3Dmin%2FrxmqrPwKv8DCCMQABoMNjM3NDIzMTgzODA1Igwj6J9URf1tk7vMjeQq3AMeWQIJI12ag39kSGU1WE9ExURNUOf4nBn1uNGi8u%2FtASRjNHobd76ED6B158y8T7FAJXpPA4YzdRzRlOhDeUrR4yIsZ08aAK74j7xht%2BWgZvnLEj8W60J5E15UK2SERc2jn1%2B58OvxKYw04oT9%2BE8VoYKv7iD3VbnvuEPfZZ1UXRsWNeUnqzgIE5Zgm1UabP3wxF6g3ibuxgZREv%2FVUDMYgbyGzRQIUEow%2F8VamUJX0lWGi3DqYpVUaYvG0o%2FR5bTdcGi%2BYCnz0XQxfIyLHg%2BhF2sPeG0jB7XQpA7hvPNiKgoVpvfSD0Wwg9RZQuke6BG6sckehgreu5Ilck6TgoKSpbllIfR3VB3FgB7Skqt1p3dwX8VgCXHMjcZGQQEMPGrr2pgzF%2B8gJnPfbdlmStE4zFRjicr2ZfGAvwk%2FTorkAgf5w6VmPrvxFQsZIVRVo1TMWx4jtYD0%2Bz51SB7AuqH5nGjJyxplM2XR5cbyCelnxv3JLhKGD1fZ6c8CGLPrINVRpJJdlZOOOx1OTumuh%2BYXfgEuxZ7CtjhX%2Bqc1DXB%2Fv%2F%2BgshkiXl9GPn4GKDBnge5Q6yLA%2BSz2IeZISFaW%2BFknKNgezsamuRkXaUpfaHBiN8aCWDmAsZzkeTWPdDD4qZ%2FLBjqkAfUr3f%2FnNeA184p%2BGRKX%2Fl4rYH8tNNY%2FuAvKGxO5IITLYky6reObspPQN51%2FQvxuod%2BAyD4FDVJKO4Xa%2FB4RviPitJCauSm7%2FvfenjgtZ4qJdtNHzHOG2o2NGr2u0yCD0RBXWFvEq70ZbtQt86Pm%2BPMUD4KS0BJlk%2BgzR5ymjg2O6rocMylOEcvDOSyvPCB7%2BVYidtmloKX3oGELJl3ltyddqpC7&X-Amz-Signature=4328cbba1d2bb046723ecf1011d4d4308b227489e9f8c8d6b6f681a34481dd15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625NWNYER%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIFtS7PE%2FxyzUUKzJWNbfC2eAJ8i1gbrqxFAuxvew7sI8AiBKkI8RdXiughlJ%2FuXb3DBFwryIoI2xOKPFYGdKxJrJECr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMdafr88BCVL9WKyFEKtwDAIo3DjFDZhTvY18wiqT3bWDfAuM65zEoP3HBQmk0FcZ4l9NyvIZ8RLt9xj63NXFsDTWPHHrzpYFfmS0dSvia1iYEYS02%2B5VwQwzZ40igrOYwW%2F8cLcV0JZMDlH5M%2B2ndXAVXDxZnSRWO%2Fkfu9A05NB3McSxF6SubjkYubbXeo036lzL8ldO2JIHQujOcVKG8%2BbqKFtjrd%2BFpodFMyYZ1cUiH4YRWVs83E5pMYWg16xbKLkITgBKqyRlW83nqswDCaA5fFjfLhbGSuLHsjasWfdRfA2Gs8LGffcTnXyzRpOH36cbX%2BgicG8hhjY73K%2FRN9KxntTczcF5Qv%2B5qOV9jx1JGChDIT9Jko51WoGGkXbepBtSDFIHhEDtkSlBNGUsd1PP6Qmi45P0aHq%2FxIge22nYX%2FmfRDO74am5Df8d2lc%2Bf8DJYCdMVUgUyH7xU3mPKvN%2BH9vLcpHDMgwObbCmD5CGnFJ12O%2Bn%2FQJvsdyC7q6c7t7ASEGmSaep5MHYPSLn0UMfzLYbFaoglmzhqtQzToldl%2F5boNwiO56R4MBalqR8DDaYdS6B0OzFIoacTge9lrXKwqEkn4Jj1BmnDur6k%2F%2FwOQ6Nqy43GPy1pYywYeBSafxflJZM%2FiWrZWN0wwayfywY6pgFx2K405NnJIiQpXdPuil3kXMrqwlyKND3WgbtoSuXrIjNYQ%2FJ%2FB2okGpaHVDgwxJWZ%2FecAqpW%2BndlxQdNnL4Fo9MyUzKs%2FBAtdD7w82n9nyAHIY9Cj%2Fy82wkHD7Rfhl%2FqnuDb5PHtzN8AY%2F2lJNlM8RQ0hgpnWuVkFY%2BErW0uVjplSLeV9cHYrbwVUaBzXDhMVW3S7yEgGNI9q82UJRIZISuSD%2FU0J&X-Amz-Signature=f66e1d8bf83f61b9d3a6d2360fbc295b503a2d06a225df0922e92bc1cc88231b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673NMYANT%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCZwtMXq9Ap84WdSQkO%2FEOcQgKGmtlKW1xtoWz0cG1amAIhAMTL38hs3b4j2oqTFsNIUUMFMJdLZ92JfqWak8k0iaoHKv8DCCMQABoMNjM3NDIzMTgzODA1IgwTKuP8wtcEENlwT9Iq3AMGVrDCpdex%2BfZNnek1yz7gA%2FxKeKxYZLPpi57GJCFNcnVSwPHxfbjYqHqKu1jqAXixPzB9y3Z74e15BuSnArLmcNi98dZYpzX7OD0t1owvCTMO92QktYvHQmLvDnvjYVT92064NmxyUlmioxE7HOGB0s7fPOIm4p%2Bgz23Msr91O%2BmNtl6GoDI6WuBKSyyNmT0XMhw8JYlfpYUOeUidtV21IRpsiJaLAzAFRqa9voEEPDZtyWjjqc3YvktaYKtMVbKxl9VOvHlnu8uvCm4psLzp7oLvX6UdlRcQWyNH7oKCV6J%2F2owW4ZuXmYgtvUSsDogkkpPSP7%2BlxQ1I%2BeRNONuX6NWKJ2rq3Pkp01QLlogs8cFTlDN8CtKegjKVHvjpJX2ey4kwaoeLdeFKrDuwhtGIfPXm8seoUOgUY3J%2F4oVjWdp1V8V0JjAFH9vYly3MLU7TFgXxvl0EEJKl5M5AsVDmYm6p4zMSVQ8J0YKvNegSFWqoHA1lQCzpYVC%2BAricVljuKvW2TIm9phToQjBVkzyX2PD5%2FdES7ppM2ldwnqp3pQE%2FDgdIranXn%2Bykd9a%2BS3BfgHNCVCrJWy0jGFd4%2FXpxj%2Bhfz1w3eahK%2BBYyzrYkjv1ypX55B7CqfHNKJzDBrJ%2FLBjqkAaA82heuizI5HG7sLRKyXRKxEn%2FQuHHGd4BRplDZfmpxOQkRbE7AJFKPSWlt26PGB%2FUcTnokqhhWt%2BKtysYw%2Fj9e3GCCksbblQyAlk%2F9kPuDmQx4nI6DbbTNPzVGKQvbt3n0fCPXd6H1S%2Fydv%2Bbv0jwmm8ObxwF%2BRXRiQ2MpORvRniWuWuCmEu%2B2fwReZsanfuKSKMuH5URIdbVEqxUTjIvkVjt5&X-Amz-Signature=ad6f33ca18ab04258595ed9488b66626379556ad2a7b7b1cd2c0bf480657d4a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673NMYANT%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCZwtMXq9Ap84WdSQkO%2FEOcQgKGmtlKW1xtoWz0cG1amAIhAMTL38hs3b4j2oqTFsNIUUMFMJdLZ92JfqWak8k0iaoHKv8DCCMQABoMNjM3NDIzMTgzODA1IgwTKuP8wtcEENlwT9Iq3AMGVrDCpdex%2BfZNnek1yz7gA%2FxKeKxYZLPpi57GJCFNcnVSwPHxfbjYqHqKu1jqAXixPzB9y3Z74e15BuSnArLmcNi98dZYpzX7OD0t1owvCTMO92QktYvHQmLvDnvjYVT92064NmxyUlmioxE7HOGB0s7fPOIm4p%2Bgz23Msr91O%2BmNtl6GoDI6WuBKSyyNmT0XMhw8JYlfpYUOeUidtV21IRpsiJaLAzAFRqa9voEEPDZtyWjjqc3YvktaYKtMVbKxl9VOvHlnu8uvCm4psLzp7oLvX6UdlRcQWyNH7oKCV6J%2F2owW4ZuXmYgtvUSsDogkkpPSP7%2BlxQ1I%2BeRNONuX6NWKJ2rq3Pkp01QLlogs8cFTlDN8CtKegjKVHvjpJX2ey4kwaoeLdeFKrDuwhtGIfPXm8seoUOgUY3J%2F4oVjWdp1V8V0JjAFH9vYly3MLU7TFgXxvl0EEJKl5M5AsVDmYm6p4zMSVQ8J0YKvNegSFWqoHA1lQCzpYVC%2BAricVljuKvW2TIm9phToQjBVkzyX2PD5%2FdES7ppM2ldwnqp3pQE%2FDgdIranXn%2Bykd9a%2BS3BfgHNCVCrJWy0jGFd4%2FXpxj%2Bhfz1w3eahK%2BBYyzrYkjv1ypX55B7CqfHNKJzDBrJ%2FLBjqkAaA82heuizI5HG7sLRKyXRKxEn%2FQuHHGd4BRplDZfmpxOQkRbE7AJFKPSWlt26PGB%2FUcTnokqhhWt%2BKtysYw%2Fj9e3GCCksbblQyAlk%2F9kPuDmQx4nI6DbbTNPzVGKQvbt3n0fCPXd6H1S%2Fydv%2Bbv0jwmm8ObxwF%2BRXRiQ2MpORvRniWuWuCmEu%2B2fwReZsanfuKSKMuH5URIdbVEqxUTjIvkVjt5&X-Amz-Signature=2c7dca24f6c9e0b40b2b19d3fdb8a30125fd48c64147636e8a51d2066fc615e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZ7HQFLV%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIBeLhvyTB2Ia79%2FAw5SqtMApyoa1J0uu7fNKGUcRLmmhAiEAzxmAHMANCYphOUTxgKVueDcs5%2FzitnBt4X0ptg%2Fada0q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDNMAnfG3UALNdA0SeyrcA0tatgB7K78uYnRndoBCtrs5xkNE7n6ZVLSu3CxBjUOr3GFefoGaGWATuAhimy4W8ROnCAfC394DnovNFgIf9SqPgK6pLF%2FUFBh5CMAToElnSndBKiff%2B4o4sOBG6eDLou%2B9UyQFBdAuNfcyB7i64aOjuJWMFZDjKZayjK9N8u%2ByoKZqcPkwee7iwASx0s76nlRUwDz63VFshDCyCwDi3tNC31LnSpXT2VsyYQWglmKfkc0xd78OaudS3ZJbSfolxQ5urlqL8mYDHyI8onBYHEXTKnTcTXb1lGFC43Mnb%2FYh72Q5kybttF3931dQM900PLfiPH%2FZ2Y8wAuybUB8ISNnMTmrIhzP8IoE0UHioJpMfblkZZWhzOUK6RvHFWBIlA4as0LvoLjU5kYL%2BpC0OdV7FPqlj11wOnPoDLqx92NpgL65iIlTP32VOQDrT2d1OFbVbW2Y%2BRBWu7vcApSPtLvo0FABH1S0o3W5L0mNCkJcgCek9DyUc5JoLafd0hGCsRf97URB%2FluQJlnO1rnfcZnLvQ%2FGRa8Us3e2LtklnFhhuLdmdj0IPVwTWnPhgxo5%2ByA%2BCMNcdwstCvvLwT2ONbB3jVcLd1Mgq6GiwLcle1u%2FtAcqVP8H7x624wps2MMeqn8sGOqUBShuBnSygj4zsxheCG%2FxdsUxtlfnwcI%2B%2F3xx%2BHmyOosb1aT6HMyUhkxfj6d%2B1BUs25hhFyX2nF7fRRhaXJqQabz5RXOESyY72ziNGchr46kEU1iW8TreFvk%2FKvHt1d30MZRDFlpdOOro%2Bl4IO7%2B1z5VKBlsGeBhjICpNUgxgwnXbkskMBV3t8ZWUSf%2FzCMwPMWRTO%2F5Ja3w5q4KgMGvfubG9NjdHj&X-Amz-Signature=69f0dec984ca89dc27ec3084bbd467c902f710cfb9a7b6e9f69cbfc4f9fd2699&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675D4CT2E%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIC57%2FC9cnfaDj1rGdhFdZstDgiNXVR7TdRXhzkakUIqMAiEAkMBB5MOLkiFIVybK7Fu2DmYIuEgTxNegQcxp7r0jjacq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDG2Z2040%2FbEIKTbTSyrcAylgZp%2Fs4m7O6AQ%2B2d6E2JNz8B6SKUj9jH7oFSVPZ6mRuOxe7ElL13yKefuyfbqrzjdFQXCBEbtT3QM5gPHUB9O%2FyBTsvQAUr0YqY%2BES6fJJRSOmY1myoSA5INt11TwltXr%2Fe4youge2tXztzh6TYiEhgrNLhnKoTf9w3ftkzBRFr5Y1RjbLwNEXh0abKonMWxNBw2U7oG3NjOzMKaKkafXF2cHEA6Y7kq0CMkeao148hQfhNtaXM5%2Bw8Qwj46Gvsow3Lvo5fEpZeBzuXfW7FFWShCD7t%2BRcCmCzRHcx8sFODbOlczm%2BQBFTM19s9kNAqfmRNqEZt2ONYxx1E9OMfjHKSVqUc2nvELXgJWnzUeqkhHAj08gpQkg77naf6YaW0PifQfu5flknsMk%2FC1zxfeq%2Fnik0rJF%2FRVvbFUewf0kMnQ%2BDP2rnAXK5rRZLcb5uOZpfaJNAi2%2FSo3NZ%2B%2BsUWPu%2B4ADYu94Ow3zyfD5r8nvrbfmoWyHl%2BBUoReh0CS2lc%2BYqT30fS%2B58ssbWjDqJJ4RljN1IKrG7pO%2Fpygy7BBBUQScmsgHn4dS9AdRszKK7FYgDKurv5klsiQRC9Q6%2BgtoxtvtY%2BhdlkJrGk39DcsFZdjDyeFyoO7qpuEC6ML%2Bsn8sGOqUB65USii8hWEIbY2x%2FVgpDLN4eiEP6Fjhb0l0MSiLnny1hfoGCE79ofFV%2BJZArEnseIuMG1lZqULhYR7i7eVt0%2B7fLltpAshn5UGY%2FOJaJtXhrfIOwOI5%2FZfeQ6AzuskebjZ2j3Vw%2FBksQP09xqQoqMxSzR6h7EKLRSOuORFC7wm9bsD%2FH2lo%2Fzx9rmdM1w5ISoxVuOZVCXJ6FkeCSyGlffJWhSxHA&X-Amz-Signature=34b412158cc506ade1ae13c76839769d8e910cd635325010dd4553c1778aa807&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGKOXA7A%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQD9ZhHasAYb6u5GcL4J6WiVSbflgbcbu9hJTkGI9TpkaQIgaMeqIGMDCxFlBuj8tJpOHoCXY0lEfowk4hoAt7sq2isq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDL%2B6Ru%2FW7eiJJOQFjCrcA6mnqEupfKVfMH740dk8GZQY4sBn1jMzrEJOR7giITfP4z1vuUh%2BIAjG70woXkhezdYf0UTUiilTyBgi3o58CTGjnBxo2gU8M%2Ftrb7af3QEFJjj%2BZoYx99ZO9FPn0sKa0cb41ujsAI48PBagYa8teCCIq4%2Be8%2BIast4YN9afN8a9gI16NPEWLV%2BB7o5KjJ0FTKilRULd2VKHfWO0QDAO4qi2uEBtHU9CdNlM9hTldKO8PMr6rBUMDbmhtdAO1w6ts%2FIhJ%2BAMTe8VjP%2BUZQ1TubgE36reC8UuY2IYa%2B8eXahcNmar%2Fo4t%2BxdlbjS9%2FJGqFVFzM3vnk4EXFivtxQTpS0hRC8paZ1a2Ka028vxZeB3xAWOLbgcciVJ%2BcBeX7zLO5MDldDYXSzE14LdejGHC76MyikBaKwhu3SB9p39ExFbA9ktwCMspR23dcc54o22tUDGQYpyMsMAmomp8tK0u5rFzL9loZKJfkqoELPMskYJhchPJfW5DiSU6eBbQzPln5xX%2Frxf%2F7lWys3o7N1ibzsH49L0LeOk2c3zCkI6l3tdyNjg4H76zJqZkh%2Bw0W9TTJ1YgXtmLHjnVbrcvB6LWBiPvDzSbk10lGcoHjlcGw6b2L%2By8HuEdTfOy41IhMMSsn8sGOqUBF1gpwrl97LaOCl4lotjaoIXIrZ4LTYZgYzQVClk8KHv6rdcuhnvfTAi9YemzDhPTFfA%2F2Rm0VkCsMzUYiol2bxLNtc6IJvQYFdVXJqRDiIn5wE638IXqAs%2FHBGZ3Dui%2F1zI7zNR9zn9zGwrs8ycaswivwX9yE0icyfzjPw9T%2BVWRrRipzjQ%2FKr3hEmjU0mDZbIHfwtOXBk55QuQNTY0l6qgvm%2BTX&X-Amz-Signature=894cc74c1cb5dbe3abaa783bee08bb9dcd1da255a4eb2a51c60bfbb43974860d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBLURFE5%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCDdYcTkMhn7CQNxCWtk2Bc0cvNFfBWIGgfVn06%2FcE%2BTgIgMJQFWCaXAbdwsT%2BCLiG2iJFcljRrIT4LtQAb0AMbt6Uq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDJQSWVhLH6OZJCJsICrcAxqiD9XpYYhPPb5kNKeAEF6UnFS67KvDnlFsTIulRbPFAayh7XVsAgFHlGFmkN%2Fts6qkb53TufDAF%2BtFfXVXtwa%2BNc6KdRgnQvbs2XMel9l4WhbelzRfzLuVFnyubx%2BoKgSS%2BwAwjYZWacOv2dePu4cQXzLQbEfriq%2BIHxKAWhlP1QGyc1fJ%2FMIhT7xpvyMKbM%2FHlP6zCcrkad1wP6WAJjzWgd0310aPfoB6UXyP2yhKxGuFA2j2ooy1r2honZcQ7QYOMbKuQ9ACRk%2BSgE0jqUs4%2FHleKfPFq8OWx3U5YKeY3pQQXE%2F0tojzxVp38ll9ifTXqDsTSTVSZY%2BITFKRDrI7PfO9YKFJ3bpYsgl%2F7HvUsW%2B39%2FHxa9pD4UKfcAd8HET5gxVOyXkSdKxyYuhzWwLd2Ij1NY0UJA5HKvOha1IKD%2FzT8WbX905UCulGfTGUeRbI9GE1%2B62ZCcjQENXYFZ1P4uRnoJ0k4346U2eB8kUgl6W0DUAc7lArkdO7D2xfzwevBfA2yiD2V8g%2BFtHUIXOcvvBXui9QQlO4o5CT%2FuGap9%2BB%2BGNhI8aova989jLy2W8BFkbf9FkwIufNA9zBBbNilz96TLOQWuejVZI3cckJhz7o4xRFPfpVEVgQMMOsn8sGOqUBRIgHim8LBRkGqQfnhFMPCmyT%2F4nfdN9ekHZOD%2F9u2NgE5iEU%2Bx3QagguSMFgIt4FBquHPeJ4ksx4jh7UFcPXZGUWcRFD%2BdAbsfnX4R3Tn5t3UdV%2FZ0PeA%2BYn4O8HPZWKBQRDj1PACbO2%2BlTFIjMeLa06vaE7aBg4VjEykBAGE3UQPGtcUqIFMZm5IuGzj9%2BGGRYLshN3FtKeXoyfcxNYoMCbwxa2&X-Amz-Signature=1b0dc9607fb00552490f088bbf67bd31e0ed331420f7c2b3f52e789962a394fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBLURFE5%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCDdYcTkMhn7CQNxCWtk2Bc0cvNFfBWIGgfVn06%2FcE%2BTgIgMJQFWCaXAbdwsT%2BCLiG2iJFcljRrIT4LtQAb0AMbt6Uq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDJQSWVhLH6OZJCJsICrcAxqiD9XpYYhPPb5kNKeAEF6UnFS67KvDnlFsTIulRbPFAayh7XVsAgFHlGFmkN%2Fts6qkb53TufDAF%2BtFfXVXtwa%2BNc6KdRgnQvbs2XMel9l4WhbelzRfzLuVFnyubx%2BoKgSS%2BwAwjYZWacOv2dePu4cQXzLQbEfriq%2BIHxKAWhlP1QGyc1fJ%2FMIhT7xpvyMKbM%2FHlP6zCcrkad1wP6WAJjzWgd0310aPfoB6UXyP2yhKxGuFA2j2ooy1r2honZcQ7QYOMbKuQ9ACRk%2BSgE0jqUs4%2FHleKfPFq8OWx3U5YKeY3pQQXE%2F0tojzxVp38ll9ifTXqDsTSTVSZY%2BITFKRDrI7PfO9YKFJ3bpYsgl%2F7HvUsW%2B39%2FHxa9pD4UKfcAd8HET5gxVOyXkSdKxyYuhzWwLd2Ij1NY0UJA5HKvOha1IKD%2FzT8WbX905UCulGfTGUeRbI9GE1%2B62ZCcjQENXYFZ1P4uRnoJ0k4346U2eB8kUgl6W0DUAc7lArkdO7D2xfzwevBfA2yiD2V8g%2BFtHUIXOcvvBXui9QQlO4o5CT%2FuGap9%2BB%2BGNhI8aova989jLy2W8BFkbf9FkwIufNA9zBBbNilz96TLOQWuejVZI3cckJhz7o4xRFPfpVEVgQMMOsn8sGOqUBRIgHim8LBRkGqQfnhFMPCmyT%2F4nfdN9ekHZOD%2F9u2NgE5iEU%2Bx3QagguSMFgIt4FBquHPeJ4ksx4jh7UFcPXZGUWcRFD%2BdAbsfnX4R3Tn5t3UdV%2FZ0PeA%2BYn4O8HPZWKBQRDj1PACbO2%2BlTFIjMeLa06vaE7aBg4VjEykBAGE3UQPGtcUqIFMZm5IuGzj9%2BGGRYLshN3FtKeXoyfcxNYoMCbwxa2&X-Amz-Signature=9f6ad10769ac1bac829f6760c912abe49202312997f737a4f01983b37c4969e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWSU7EOQ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIEuwXJfjeMLWBATOVjVHHGCvJWq8dyljCfcDgBHWTNnuAiEA511vzl10PPUF8U0INFTX9jO1qGjkCAHyU%2FizVTANXo4q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDKcxHgnDgHgWiIBdNyrcA%2FxA2z5022QYCzJI7%2Fyq4ggl1HcbKrJI0iDsZQsRYNF%2FH9VCgB%2BWPROVLiHBQuV9OuW5MBzT9rrMSsHURTOD66UI18dYTUZ1N0WfSVW8mWVnfXo157MNBcDOetGZehLS2KxWELnsSLlhnlQZBnA9iN%2BA6R4Hp9z7Ffmnizk44TPyivpUmwOBiCf5wrI%2FPJ14Mnid%2FoCVsVkblwsZJwgUr%2F64VQmPa7V6LOtd8OxLcBmqeAPA6nBK8ehg72voe87FNchCdgS02pU6HASW8oxOgfYnBN8N7xuAKUTM3KikCTxLimukaZwiheub%2F1kOcDKQdaB75fe9sYhdnhAppGKnhmzCgCzUncJbiegV1fDDMCgjhJaBOwPts%2BwaPydrYbcALJhclQrFzKnOOHUHURK6VkoCpgDKWgSXebf5RrsxplpYiIPA3G8CvYvxT9ULDZ304ROkTR52NiQPKxc6aTWApGpQz7b5jJ1Ngi8C5H1jVg7%2FL5tXmSNET2pjbJsrsSw9QlR1aWirRjRoxJcTPjynB7RIzSaoCuPJmV4bdaMRqTXQ6mxdWWtsCYt0V3PXXZzzDmEjmqE6%2Fbxfc%2Fu4YUIQ7dOkKdKoC00TiIuKosx1pjBWJQ3c3RhTrXf31CPPMMKsn8sGOqUBH6Up9phTEst6mwiFJDvEgP47xsdhAiBze4mln32pD0xDHQ48KZLpozST1qurFRWmQI2oPtBjWoT%2Fs%2FgJMdA1a6KoyuIVN0Hzd5FT6auxWGuqBf51nF0EVUQLXMIWBBCFH45EqtdmKuQDuccsye8v437aW3DlIuVPIuaqQiB8vRlUJn4lZ1a34chUWrhJStHkdattZwrSINJzD8cTMayjSBrSL71s&X-Amz-Signature=18013ec18497bbc1c4b53ae7318a29d169b2934972cdcfab9a833c04b3fd5b70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BZA7LLN%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCz3a4DaJz181aMKn%2F3YygRZ7IGXW44No%2BjfguVNmpJDgIhALk86tmqKZNDbTBdIBOiaV%2B8%2BN0rJZFX6fuOBGHeNMpYKv8DCCMQABoMNjM3NDIzMTgzODA1IgxTdwrJzTSUkCmsdbYq3ANzQYxd2gg0wR6x99xMyWibskogM1lGpaaUNnie%2B3B28gqYdjf6sd3ygYS2V2huwUP6pTur5ixrV%2F5E8TkKEZhenCeQBMAxwQxTH3vQ9D1rYR6sYXNWve5I5WjQz9zEGX6WoEV1yz3CfPm%2FIQT%2BWiCcyEx7et9GPeND%2BhJxPLHNNeLyk6cjUondrmfwn38koE30A1EVRvOCltVtqVWFgOOO8dlwoHp51CjCjEmQx9kz0xwaDv%2FWVdP0SGIvLd50JLF3TgSWWi476I68wJx0nwbJrLNF2IchvEUPEIBsgPtDBkAh7Oei576vhfRxt5qqKdcUUamqic5pIhKrZ5%2B5l1wIBS%2BDWWrem7OedSsLwMlCn6Avpejk4D0C3mZxkVG%2FzUrMBtPmMsGHKX0MkVOO%2BBe5Cyt7e0D8EhQQNsPy5CEHHjr2HddCTgw4WyPORv3TxIEExxOXRRbk0zpr5HIGgScJCfRJ%2BskpRHBTzuGZfdLVpX87YubUblJcsvz%2FB1wCkGWzWsl%2Fn35Yl3ONRdpC0gsyS%2F0zm8mVJhdBFALF24IV6cgCFcisPGI5QTZoXH%2FV2mVdApRoviLeLEHIsLFRznsOSTBHyrKBFS%2F8P3Yom%2BSms4B4ssXZGjwzY7tPJjDArJ%2FLBjqkAXN2halTZm251IG28KSh216oWWaPnt2264rBw65cCco5w4PFJkkHh3jZAIXFyIdjS6OGJMPkADxomWzVskB%2FB9bdk3N2bMh%2FuiQL8sFvQCiTEyIhJ4ZV%2B%2FGnKSTgfmxKxqFZmQnKH2wKWCCpE%2FlS5g19jcKt5J%2BknSSmdoM1%2FyKzfEATB1eMgHHCDVYZyuWjwtfQql70gP5hnt4UeKwuF311F1tF&X-Amz-Signature=57c315dd32a2bc7faeac7a783f98908745c523d6abd22dff8d785ad45b8bde50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BZA7LLN%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCz3a4DaJz181aMKn%2F3YygRZ7IGXW44No%2BjfguVNmpJDgIhALk86tmqKZNDbTBdIBOiaV%2B8%2BN0rJZFX6fuOBGHeNMpYKv8DCCMQABoMNjM3NDIzMTgzODA1IgxTdwrJzTSUkCmsdbYq3ANzQYxd2gg0wR6x99xMyWibskogM1lGpaaUNnie%2B3B28gqYdjf6sd3ygYS2V2huwUP6pTur5ixrV%2F5E8TkKEZhenCeQBMAxwQxTH3vQ9D1rYR6sYXNWve5I5WjQz9zEGX6WoEV1yz3CfPm%2FIQT%2BWiCcyEx7et9GPeND%2BhJxPLHNNeLyk6cjUondrmfwn38koE30A1EVRvOCltVtqVWFgOOO8dlwoHp51CjCjEmQx9kz0xwaDv%2FWVdP0SGIvLd50JLF3TgSWWi476I68wJx0nwbJrLNF2IchvEUPEIBsgPtDBkAh7Oei576vhfRxt5qqKdcUUamqic5pIhKrZ5%2B5l1wIBS%2BDWWrem7OedSsLwMlCn6Avpejk4D0C3mZxkVG%2FzUrMBtPmMsGHKX0MkVOO%2BBe5Cyt7e0D8EhQQNsPy5CEHHjr2HddCTgw4WyPORv3TxIEExxOXRRbk0zpr5HIGgScJCfRJ%2BskpRHBTzuGZfdLVpX87YubUblJcsvz%2FB1wCkGWzWsl%2Fn35Yl3ONRdpC0gsyS%2F0zm8mVJhdBFALF24IV6cgCFcisPGI5QTZoXH%2FV2mVdApRoviLeLEHIsLFRznsOSTBHyrKBFS%2F8P3Yom%2BSms4B4ssXZGjwzY7tPJjDArJ%2FLBjqkAXN2halTZm251IG28KSh216oWWaPnt2264rBw65cCco5w4PFJkkHh3jZAIXFyIdjS6OGJMPkADxomWzVskB%2FB9bdk3N2bMh%2FuiQL8sFvQCiTEyIhJ4ZV%2B%2FGnKSTgfmxKxqFZmQnKH2wKWCCpE%2FlS5g19jcKt5J%2BknSSmdoM1%2FyKzfEATB1eMgHHCDVYZyuWjwtfQql70gP5hnt4UeKwuF311F1tF&X-Amz-Signature=57c315dd32a2bc7faeac7a783f98908745c523d6abd22dff8d785ad45b8bde50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZIWGJEG%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T190933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCICqqybWRKdoSOX4zhkhA%2FibgeGrP62nZwFuje5GfIn3eAiA%2Bajd8ih9yatuz07Udw0Crrir029mt%2BhiMDjD5xqt9YSr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMV%2Fc6yxBWi6w8UYHKKtwDeqOeJJsiSiXLRQCys%2Bf4%2Bw8qabHqQH5oT9z4fhdfX6eUSn30n5%2FOk1fz82V3sRG8qUf7NT5ETBaxdPjnaj20MJoglRziUCKxW%2BHmJVMSbybEo%2BnREiWa9dY8xpxGdW2nQYeALKybeaxAbq7jLIo13d5kELJjzlpfvV6k1ALKEn9k7n3cZTKRL1CDj2XfJF8wQwey3Efpq2UFcsoUa%2BKPRWjKGdSSP8xy8esN2EORLcrh7htAPBRcOlAEBQNTLezFA32nRTa7wbqrvDeYbo2qrj6TqnIdSUa%2B0GQKVmhu7xe4xGz3A20ZK28y9JPhljFZeH87y8bOpMJ3df1GUzRttBowsLjaPssP5lJE7fN%2BO0RAmtA6JSz12DxTnnN57CKJ7aAgfA4QoSC%2FtsZpaleDSJSZMa7GcJLITPT3braLP5hitkgKDQWA2n5YnK9XKK4rB3g4tdXjvJiaEk45V7BSuGcHG7HOttjqA51k%2F8dFPcic7fUx4AoBSL4ZBB%2Bsd9sd9dPc6U2HuESnDec%2Ff2E8JkgIb2G8aiTxFOMuAUzkcetZnTYb6KpHMXai3o%2B6LFuJlgy4UoZwzAbSdScvMMT6lUfKltV%2FukGMIKNukfd4G8g8ksP6E%2BRTKXguZUcwhrafywY6pgHVmpAi9aFBVh0bS9aM8PlmyT3VF5lM8bAyrRQ%2BIGdGR4paR4U3bZFVahawrJybmJWZAqPKJVnaM3Nm7ClkhNPf1caQD1LD%2Fiof5tBECozZduoaT1LkeGQk%2BNnqaioXawQqSzqZaG4YDb%2Fh%2B44n%2F2BXV3aBtn76C1%2ByEBGS8FsEsMPNoJ8egmQjsZwKgSEs5A%2FLMado%2F%2BUBb7dsnpJ1E%2FJJRpcosAFE&X-Amz-Signature=02af6129468cd6eb169d15588cbe30fa6cbf5d3804b4a551dbed6aca3ac4d312&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

