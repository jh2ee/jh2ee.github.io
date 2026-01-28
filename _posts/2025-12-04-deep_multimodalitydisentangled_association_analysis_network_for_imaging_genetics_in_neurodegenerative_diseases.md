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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTAMKE5R%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDvRN4h%2FuVnYi0jMKQbQcly1B07zyVyG%2Fu0d3QIU6gbxwIgc83nbY7aw3Cdl3p1IvyBDohw1kfUQUAlYnVtLlUo%2FAsq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDCmHpNsdEytLSo2MISrcA1SzUacMiinFlpRj50RfXPSsQz%2B6gcIIn4k3C2kL7GXZGgAv1jWdITDav0J5kc8u24D85jnRtn9KOz8ydP0XLmxxH16oFZv%2BePub1S6orId%2FzhZmcREhXoyUjr904y9sU8YOZp9DQWnB1VNvJgcBk%2BBLyDuKO1ZJM3hxovN78yscp29Z%2FI%2BybVCWygUKexepFY0EaiL5IEXLKR9pVTBHjA652nZpEYcoX%2BlH6TSD3%2B0zlcR9LtlwMvy214B5iKZT%2FJg2yYScsUHRPeawdtq1X9BwYMoZvAeHJaobCJq33n0pZkKBF3F6TWbwk%2Fo8z46FMe1hU9Na7JHbp31ojCPM2t9CQdPgzY0o5%2FgefyrBJFqL5iaTYR6WxoM%2BBcJhsCNAvFXyHsQS65fUOZzjh9qvtM12%2Be7XN7RLSArL54qQbL0Rki78eCQW163fzxKrGcBbfiDgjOkCAXvltcB3N%2Bqf%2F3JierNIDLLoCso1QeACy4dxI9sm1597h1%2BxKaSPja5AcMyPZML7%2F%2FFRI4JwjD2m4cmLEqHRxWpt26ANOPPT0YSBZ0K0XjaEDLN03X0AHcWDOnL3rwT4PZrxik3QWF3a%2FCbgxpphxKUgOfFBA16lSTaShllozuZb6ycT8PtAMOPt5ssGOqUB2mNlqlxbk%2BdinyGv%2Fe1lDBFCbB42vEaneMiC6VvPwV0oeyF7XORBqMVRus3UJtLiujw80JGlLjHA9oo9qXlA%2F4aaoPO%2FRuEhI478inwpQweC46yth0kFrlOMSCk7bnWc5ug%2BmUvEhvjQb3jvovoaBTNySYCci3HPfTW5UnAGrqdzL40waAcmA4lpTerS8tbsNKZauBXiarJLfzu1zLbKIzp6lV9c&X-Amz-Signature=c39ff12da01518c2366a708fa1fc6afbab8d9993efa7c50371ca308f5d9e3f5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTAMKE5R%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDvRN4h%2FuVnYi0jMKQbQcly1B07zyVyG%2Fu0d3QIU6gbxwIgc83nbY7aw3Cdl3p1IvyBDohw1kfUQUAlYnVtLlUo%2FAsq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDCmHpNsdEytLSo2MISrcA1SzUacMiinFlpRj50RfXPSsQz%2B6gcIIn4k3C2kL7GXZGgAv1jWdITDav0J5kc8u24D85jnRtn9KOz8ydP0XLmxxH16oFZv%2BePub1S6orId%2FzhZmcREhXoyUjr904y9sU8YOZp9DQWnB1VNvJgcBk%2BBLyDuKO1ZJM3hxovN78yscp29Z%2FI%2BybVCWygUKexepFY0EaiL5IEXLKR9pVTBHjA652nZpEYcoX%2BlH6TSD3%2B0zlcR9LtlwMvy214B5iKZT%2FJg2yYScsUHRPeawdtq1X9BwYMoZvAeHJaobCJq33n0pZkKBF3F6TWbwk%2Fo8z46FMe1hU9Na7JHbp31ojCPM2t9CQdPgzY0o5%2FgefyrBJFqL5iaTYR6WxoM%2BBcJhsCNAvFXyHsQS65fUOZzjh9qvtM12%2Be7XN7RLSArL54qQbL0Rki78eCQW163fzxKrGcBbfiDgjOkCAXvltcB3N%2Bqf%2F3JierNIDLLoCso1QeACy4dxI9sm1597h1%2BxKaSPja5AcMyPZML7%2F%2FFRI4JwjD2m4cmLEqHRxWpt26ANOPPT0YSBZ0K0XjaEDLN03X0AHcWDOnL3rwT4PZrxik3QWF3a%2FCbgxpphxKUgOfFBA16lSTaShllozuZb6ycT8PtAMOPt5ssGOqUB2mNlqlxbk%2BdinyGv%2Fe1lDBFCbB42vEaneMiC6VvPwV0oeyF7XORBqMVRus3UJtLiujw80JGlLjHA9oo9qXlA%2F4aaoPO%2FRuEhI478inwpQweC46yth0kFrlOMSCk7bnWc5ug%2BmUvEhvjQb3jvovoaBTNySYCci3HPfTW5UnAGrqdzL40waAcmA4lpTerS8tbsNKZauBXiarJLfzu1zLbKIzp6lV9c&X-Amz-Signature=c39ff12da01518c2366a708fa1fc6afbab8d9993efa7c50371ca308f5d9e3f5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673OWYACV%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDxl%2B9IvVrIogr0MU9HQo%2Bl0wFD5T70f83oJsjCjJ8bsAIhAMebQCFUyLdxvwraxYHHpgqIWwUUr9oZRQRppyt97DNdKv8DCGgQABoMNjM3NDIzMTgzODA1Igy%2BJg7QxZFoc5xF7Uoq3ANn7vy2QT3R1LJbf8EhRqoczUuFtc5%2B4eb4nphHrxnuiAZN%2FAj9KXJ%2F4NLSg7ryV74dtwhYaIZIx5bGj1aQSOCUcRAWVOJG34D6bJ8pEyODBtmFOVq4%2By0Q%2FYE8NLX8cCsDAxLzhqRENUpC4zyxxg%2BqZ7q5b70KgBid0XcQpomYhNP5x%2BPuW0eDeGEUHYNd3ea6v6afWytBBnGV3PZK4ILQiNRk0rY4yIyES6DZAilba6bmUb6iM22dlyfpw%2FNVlusmYQhtDItocVMOquapZx6rmuKv4tw0m3bWWdnPhWX%2B9sAAnki9IVz1PzvEXG%2BNyePWMPtkjL0aL%2FehEnnR51V%2B5jB0sxbIDKXNZO47l8ZwtYk3x9mLz0v79HDwx0lfoB%2BGnnE8KMxoqeXSthLU0ksLd3TNQ%2Bl23kI9lj7ui3ao%2FzmMrxIimNGtceztr7MljHCuzlXHV1G9UBIlksJFUeaEqiXD3xXAygCan3pgWLuyKmHI1cSRkTLGTJ2JPF4bvPhlHtzZC7KCCOF68MIC%2F56AfRHJKCTBlPRO0nd2dvT3lEMzyHRxDO2WGPSCKhIr6Q%2Fz0c%2F05lrNM%2BrNTCC8O8mWYJqTvyWTJK9m6fbKdbhz32i1fdYUZ26Ddw8RSTCQ7ubLBjqkAYGuxfUqLFbn9YLTtaDalrdnTZ8LtPfTDgVWC%2Fw6oDtINYipPkS08z2q1T2JDIAvsxKeQ4pu1WksQynOisJhmeZNDCLA%2BJomOAzCh3Bpc%2BIPmYi2V2%2BwrW%2FgCBd4sh%2B01WVayHJtDKzVyJyDtKCSzErWsrjKjfzblK%2Fti2uJ4aT28gbI9UoulrqxZens%2B%2FURyrFUCcL%2F7NqymbitGoPEIxbZZzTX&X-Amz-Signature=835a90458dcdfb2c7f7b711e7d0a8de2eb908771a10ce8951f46a6865b69f115&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUKGQS4T%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHkk2LxffcTwLni2PLiMhoTbFV937JxnzyMgfzCjPfYWAiBKVacYoa%2BjGsV%2FhcEstcjFxyWDtikmnOj9C8RBKjcYpCr%2FAwhoEAAaDDYzNzQyMzE4MzgwNSIMiWpXJFV7RRLcjwrQKtwDeJ%2BUBsN9oWCqMq0l4hR7UBxkvN853MG8rhQLGsWRtbbSSY8pbHQkiQ9K8DsU7R5kM%2FKI0KNgTSUTCfG6G5BanC76nuhzfNeSZr64NwUDiVAc9zAMxfUyb0MtsUfh7Peef7oW4%2BsI6eBnfOPZPbqM56eSC%2B4qZJJhhdkg7%2FdcdaaujfRJjF66atctNMJP%2FBparTyl7oTmO%2F9CTFtkKu5jHjVPqqwhTl7vw3YTPOKJfpVaqRkut%2BLO%2FPcjgHk%2F4JTNyCZR3KXTiuPiwlLIwGpls8bMrBwHQxB8TUFVftI8Y9GCBKXvQ6JKi7a72CFaiFMwQxUcvcd3kmrALTW9DVm0EUkrWD4ghAsST6O1EA6izQWcZvYG72JiLyN%2BxIJ6z0%2Bn5L0d4sVzoFNE3S70Lfajg84j8r8NiXZDiH2H8hAOthBM10e4x%2BdYKz8yJNty6g%2FerGpAFQZNj%2BdtXPRmoRDWSe9nTarz4ND549d0l%2Fu0AghjIE%2FqrvEZ1Ugrcx5XRZzmHnoI9TENVwIJdKTA7JZSFYCqfZ7FRdfn185dOBEbCVgZTr5zJ0XFGXDCd4ArI8owceY5%2FbLyJyk3cnYjk4xrecKDWBm%2F3NgI0rW9qr%2B2t3ieumfFW1gdkuEyINQwvezmywY6pgG4vdIGs9tcYgZUj%2BO2CxCQzhfnPljV7VL1S2P5xG3pq6%2BsCR1vw3KFrGBrttol5MpqG3Po5kJRWKezskBaQtXbmL3aWlYQmoHfY2oA3g%2BDgTuyxpQLhMVXHO7uuckopohMM4R42sy9WMWVTS5yQIcfUZuk4a4%2BFiBsaFRidtUEEiaQ%2FEF1F0GdpHNuwtb8HE0rFrbTQQaz20kO0dNEnqAPtPFJy6VM&X-Amz-Signature=bcb93164c8b83b55743a9c8d91c451afd2ca12ae45111a9baed277f754937855&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUKGQS4T%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHkk2LxffcTwLni2PLiMhoTbFV937JxnzyMgfzCjPfYWAiBKVacYoa%2BjGsV%2FhcEstcjFxyWDtikmnOj9C8RBKjcYpCr%2FAwhoEAAaDDYzNzQyMzE4MzgwNSIMiWpXJFV7RRLcjwrQKtwDeJ%2BUBsN9oWCqMq0l4hR7UBxkvN853MG8rhQLGsWRtbbSSY8pbHQkiQ9K8DsU7R5kM%2FKI0KNgTSUTCfG6G5BanC76nuhzfNeSZr64NwUDiVAc9zAMxfUyb0MtsUfh7Peef7oW4%2BsI6eBnfOPZPbqM56eSC%2B4qZJJhhdkg7%2FdcdaaujfRJjF66atctNMJP%2FBparTyl7oTmO%2F9CTFtkKu5jHjVPqqwhTl7vw3YTPOKJfpVaqRkut%2BLO%2FPcjgHk%2F4JTNyCZR3KXTiuPiwlLIwGpls8bMrBwHQxB8TUFVftI8Y9GCBKXvQ6JKi7a72CFaiFMwQxUcvcd3kmrALTW9DVm0EUkrWD4ghAsST6O1EA6izQWcZvYG72JiLyN%2BxIJ6z0%2Bn5L0d4sVzoFNE3S70Lfajg84j8r8NiXZDiH2H8hAOthBM10e4x%2BdYKz8yJNty6g%2FerGpAFQZNj%2BdtXPRmoRDWSe9nTarz4ND549d0l%2Fu0AghjIE%2FqrvEZ1Ugrcx5XRZzmHnoI9TENVwIJdKTA7JZSFYCqfZ7FRdfn185dOBEbCVgZTr5zJ0XFGXDCd4ArI8owceY5%2FbLyJyk3cnYjk4xrecKDWBm%2F3NgI0rW9qr%2B2t3ieumfFW1gdkuEyINQwvezmywY6pgG4vdIGs9tcYgZUj%2BO2CxCQzhfnPljV7VL1S2P5xG3pq6%2BsCR1vw3KFrGBrttol5MpqG3Po5kJRWKezskBaQtXbmL3aWlYQmoHfY2oA3g%2BDgTuyxpQLhMVXHO7uuckopohMM4R42sy9WMWVTS5yQIcfUZuk4a4%2BFiBsaFRidtUEEiaQ%2FEF1F0GdpHNuwtb8HE0rFrbTQQaz20kO0dNEnqAPtPFJy6VM&X-Amz-Signature=3cdd060abf5c7c44d6c4cc0eefe936d4dfa284f22c7ccd46f3279565611a88ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTWGU64R%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAFM9Hajevb0hnwILLSb3zPzjNlhCuT33XNVL9S5u5Q2AiEA6gKtX%2BZ6hNVV4UXOd0CClChXwL6jDxZvPmNVggP8bOcq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDO4wi%2BBDHDsTKGIRAircAw%2BttKMeVkwWugNkdidXQPlKPguvHltCahM95HML6DBnYJa05buceo8IIf7A4qe3flmKaK4DKYwB1YrGusVhdql45mWkQm4CZ9%2B8Zgw%2BWtnucAB3QEON%2FqFDbAr7cd0EWo3AiEU7dsWu%2BQO7dFztjodKeV2ez9eRkMe%2FE5%2BFWL6LTiUqaMIcgHIqjrvvXTlBdF8fZEytKWaPnSiV8%2FSqTSjwmFzPy5fiP6Q0EkuMQMMYlnq4n9uJ%2F%2BW6XtXI6u9nzziD1KVfrIOzN4mcbkSIv1GEPyeNUCioPU4QWdyLT2rZK6CWivXP%2B8eiwg660xo8C2IZ7T3PpKbeHEYwOZ1DT9eOy0NKbzI0w7VRXGXqJKnj9vFnjRFib0KEhgb5%2BPQfCk5SZs81OmCY1jqRfhlHGGIhWwKBVGE5KoAaC5pi3PX33onYj2mj%2FuWICKBa%2FfBnURmHuS0ULN7ZNaF8lIYRzyPGep52cJXbTbG1HFZ8X6LtNk40YQ%2FMQVDkWrM0k2NYRVpjyAJRzFaBXqlcig2%2BqNVjAW17gpYgA7LtLRCajSt4hAKxUsjKnl5wMDVpW9gla7r7ErDDCN0ehulpVEGNus4WiwgShPVmJ2NIZy2bW%2FE77H2rbsQz7qMbg9uTMO7s5ssGOqUBBSJn%2FbNQ2Px4fYe1OL1vfg6kgeThYlvg2ZNv0%2F5nkWJ7CEBCwvLhihFLmobbd3DaVGQW28uUI23jURu%2F1YPoZ%2BncFTiArhCYFzbFXZRMUwkOSlbJc4hVWMdRt9hdZ4%2Fg%2BpZFLFv79ITLwH%2BjFlwgILPQMJKKz1nQgczVZs4BSRrCQbqEZHsBXwLJFIHd0TFjHfc8%2FSVu1OzdFgcgYEI1pm%2B7IIhv&X-Amz-Signature=dfd1adf942400efaa062f2f54c92dd061b9760305970c047411eb7fde133f686&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOLHAZY4%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA5zTAgb5Hv%2BgfAh23RixlNSZA3i3dFsKrDp55bXa7OjAiASpNUzbfLIVtQeUTyNluH7M4Lj73jXXqWJh19aW3zOZSr%2FAwhoEAAaDDYzNzQyMzE4MzgwNSIM5mvg4lg2aWUxORuuKtwDtoFNfjhOfDR3aS8L5sOADx68P4Qrr3kpcAI84MVSLCiBQ2WwiRfk6pM9ughQYGd45fR7mJPFmTgL73EgFT5BypBVmYl7eRgkyj4FgVQ6Aveyk1jQ5fA52mlbBGS5yVitbhfeUrAy7D86B%2BmZbakGUeVIcgZR1nQsKRVKFmeFzOdqcZqtiYQCZd2NcWTT%2B9rsiB8Mex9SG47qUD1R5MfAyMZ55hmTk%2Bl42X6KdhWwRvM5e8x6GcONoD02RFWU%2FWkdN6%2BxOGZwGeFn7DIJFmvI%2B9fxJGnbiVhHtiBRr4BXrErxSUPwLL6lG3JHtvlh9MwfWrnmpXdf0mJxYxWOjGryjDHr2Mu5I4933gRMnRp31ovnEn%2BTc4okm5ZfKQVlcRwxsh0gInlNgizu3IWe9MTxczobJn2x4FFWprYw5cK06MzRbd7mcb%2FWa7g5X4%2Fl0IO5E36r5zju82LWC60ZkXfQYBTIZ2DvoU%2FR8NVFkgyJrxf673oUMrx6evP9ei6AnXW8rnAh%2BXtm1GcRQtq4aYd5dF9fBt0QPU1zfxI6V1G1UjyRW%2Bab4vGYVl92SBgLXAYeohMl3KF%2Bo4zJZVI0RkoJE1wKPDid%2F3kvhlGrlg9Mz5%2FUTNTa3blaogwhSAYw9%2B3mywY6pgHq%2FmfdEGTvgHsFGW3SoRTdsiek0jzH6HnhtEBvGCoxEl%2BIVpqHSL88X4zNNiqwy0XU9aS7peoimGLPlC5FJcIG9eCSt039g3OUTbU0i6kea7Y7J44aN%2BeS8mt9Q3LBa0TtyFPQkwBZ3PbgANswtdnYk98M5l2okwWoDJmugM7w%2BrJB68yyj99ewcIIvlB1Difo%2BmwBpyWNqcN1Wi%2FTgEFGCE%2FuBgwF&X-Amz-Signature=fb7e397adb0d1ea4017f99de59c2c7e9824378a482c4a4045de3563950db9c16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGPDXIPX%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZx1OEzQXs6Xsg1MTpUCntWZbUxLFY257QQID62aoPXQIgYMb%2FJJu3zDpB1SoJPwG4hesAMwNz%2FJVTsGuY6B8mIhsq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDN0xoJi9Pek5sV3G0ircAzRw%2FGlmEQK8%2Fy0m2ACRaoui4FHv7AlJsZohEJMEevbj4%2FwyVSMHZlUmtK9snjvkgHCI4uIqItzj%2FsZp5jtBZjReQq5KV0Sd4zpb5i45r2cWqQsox59x0xP1MdcYbfGr%2FqhMMV%2FJYw9wkZy%2F1d%2F0fnpb7n13Yejp234P29j8YIglBDnEe2zMdykP%2FYibw3mm81zLYaJFwwMx4CqKwFKozCNnh0Ux%2FOoeYuLy9Jpd2RawDKVoWAEkWvUBa%2F%2B1ETGQ4WqcakkxBr83gL52c2CZTlnBbw52DUDvvJeL6sgKxk95FC2JpKnxcEXj59gHFGeC70MyWtLlpApXLknXGm1F%2BuR9SWFK6LmRLMHX1f5u2JB8sJ1qGX9hmvRnjl%2BUg17SM4XIh0livooCKdi62ZmqdwMxKVj%2BO7QzWnGVUH8idKNxcZV2Ml%2BKmZBpdbzciT4NfMZgTTPr08fuQDw3X4KUlg8FItlZskC5PiGdIFdPS6ZS22lTkszimq0%2Fm7yFl3ATwSDoPQFYuZLxlfynfHtHSFYMbf78%2FfcmAc9hgraqYkraWMjpW9eGpbK8BeVBn0su%2BMzGHdNMt0rGmmd4L8AuoipzOUYxu%2B2mBJ19Kaj3IzioICtMNBxzbNPipLQwMLTu5ssGOqUBF4CF1ONdKF01RIuun1pWwODNM3RNZEF6adfap1gSoed6zYtpeEocWX3SiHFZ66SzicfV3m72Cvyzf6wODf8Fw59ba7CFjgkXgbVIwI1zaoAQRPYbZHUbLud2rN%2FOWixd%2FRbTi7obGw8NMsbLXlgUO1%2FryUvbCBmuNx2dy3VFYgMQhpSqjJq0gnVtoAeKqPzlgzhpggOZL6rY3vgZyqGFdk9Clts8&X-Amz-Signature=f00d7316648f8cd20b78da3ad32f3b15fba14142fd41f0d486dc36adcf848133&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634YVKFXY%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICYyPi3qnx9Gh9gwTCGL4ez0TP%2B1ccNtk7HywpibWvHCAiEAm73GfhUknzebCxh7MAqCQAUG9oIkYWvLQP0qcxPG9iIq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDKt1N5sFqZYV9MUbNSrcA6wWaRIJ6pIWEYz%2FReNwzptkKBJFYRysD15LAjt2ROZkMVkz5%2BcHgw2qy5Zx%2F%2FGnJPsa25A1UQYRPbDpxwxErseKizkg5j%2Bfh5p5u1jO%2FP8yx9iVNagDFUsy%2F1OqkPhxqz4wDpaY3eou0Umhxtktmfh%2FY87dPd%2BzaFaEmhaNeWwmMtr%2B%2FQ2CgaNIFBRC7FjfDLbhhLZipiQAtaSEnqhI1%2F9MWfbCraBhRn63fyng2kH%2BGnY0SGE7j%2Ffz8AuHjL8SEh52ra5pVsBPD0jU5O0NHKJydFSY7ccsEW7EjOy%2BHyyioerU9LC3g5C3kGSyiy6TSKjvoh%2FWff26KdtHwyejXOrT9TG%2Bh5QdMneaw2V5ukZLire3n2cw7sjAMmG9Ic6BX%2FzDp8xpqTZgv%2Fu9KRpjTuWwPURpr5Fc2OcghxWvIbn%2B%2FWHz2LU6kW1aH6NKZyUuw898fkF%2Ful0iSzMx3mJu%2BirfWn4I3tCIrHUVld9yDNYnP2wkpJ1y9SRTrsnUgddPp2ktJ89TYLd4AfCquzWFAwBxiJOoCwecEO6LIapneNJumb0lr8cdrhba2XjBZ1w4UfE3%2F%2FhCPJSEc3v5cSRByiPQd1ZuFFGgYhRaITs6au4elmjKvB%2FzTV0%2F7bDVMPPt5ssGOqUBkKPbF3URlwiKdXfkoofDBJhCsbXrrElIPs%2F%2FlfvEGLSktkRtKGDXeq0kvPYq0h6yBNKEvkoI2n0gCzSnU2HpBb8EDuhunijAdkaHZ5C2Yr0XHukAEczpLgwyfW1sO5MLJrHg24CS4Y6pPD5mAGAJ3saUuPT2C5YQf0HgVHODk%2F1hxqXZBNuIC7HpuIHlVBTI17wQgtjQoUZBkJ3ZZ7%2BRxAUhiJ2X&X-Amz-Signature=dc4c92b87d22a7591c65cd6fffe41f0a8768fbdb64814edc4b8545267089ad4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634YVKFXY%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICYyPi3qnx9Gh9gwTCGL4ez0TP%2B1ccNtk7HywpibWvHCAiEAm73GfhUknzebCxh7MAqCQAUG9oIkYWvLQP0qcxPG9iIq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDKt1N5sFqZYV9MUbNSrcA6wWaRIJ6pIWEYz%2FReNwzptkKBJFYRysD15LAjt2ROZkMVkz5%2BcHgw2qy5Zx%2F%2FGnJPsa25A1UQYRPbDpxwxErseKizkg5j%2Bfh5p5u1jO%2FP8yx9iVNagDFUsy%2F1OqkPhxqz4wDpaY3eou0Umhxtktmfh%2FY87dPd%2BzaFaEmhaNeWwmMtr%2B%2FQ2CgaNIFBRC7FjfDLbhhLZipiQAtaSEnqhI1%2F9MWfbCraBhRn63fyng2kH%2BGnY0SGE7j%2Ffz8AuHjL8SEh52ra5pVsBPD0jU5O0NHKJydFSY7ccsEW7EjOy%2BHyyioerU9LC3g5C3kGSyiy6TSKjvoh%2FWff26KdtHwyejXOrT9TG%2Bh5QdMneaw2V5ukZLire3n2cw7sjAMmG9Ic6BX%2FzDp8xpqTZgv%2Fu9KRpjTuWwPURpr5Fc2OcghxWvIbn%2B%2FWHz2LU6kW1aH6NKZyUuw898fkF%2Ful0iSzMx3mJu%2BirfWn4I3tCIrHUVld9yDNYnP2wkpJ1y9SRTrsnUgddPp2ktJ89TYLd4AfCquzWFAwBxiJOoCwecEO6LIapneNJumb0lr8cdrhba2XjBZ1w4UfE3%2F%2FhCPJSEc3v5cSRByiPQd1ZuFFGgYhRaITs6au4elmjKvB%2FzTV0%2F7bDVMPPt5ssGOqUBkKPbF3URlwiKdXfkoofDBJhCsbXrrElIPs%2F%2FlfvEGLSktkRtKGDXeq0kvPYq0h6yBNKEvkoI2n0gCzSnU2HpBb8EDuhunijAdkaHZ5C2Yr0XHukAEczpLgwyfW1sO5MLJrHg24CS4Y6pPD5mAGAJ3saUuPT2C5YQf0HgVHODk%2F1hxqXZBNuIC7HpuIHlVBTI17wQgtjQoUZBkJ3ZZ7%2BRxAUhiJ2X&X-Amz-Signature=969cb03b6c5309ea87029033ae473a1186f209ef98f8f77f0cbbd560af3764d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SRHAENQ%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCUbRuMWGfdOnM7W8WDqwqC71bSkoTsBr%2B6Axqnql9OjAIgY%2BdXwlRm3XrMFxg3GxQD0zjq9P1P2ih6H7WMrgJIpbMq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDLHNf8452qlT6wgeDSrcA5qr82g07YwtAexBXicH7vS9cAAoaMhMduFPQCRks%2BTVU9q4twaXrICHYvYUmpUQAd1xOVNZOHSJ039OL5E189HxNxh6QxzNPtIb0IwgHmgb5iW25Y6sTBIPQFKuJta92w1h7Tfhbs74DsboDpKxqVBwEBy1enm24w19Xp0Ya28XwqpJKpvJdYpq53HMliSsBPW9rws1rQdUVMjSLLoVV82NyOHjCy50hYAwousvd9MtlQ3vQVId9CrPyfPtlXieV38qkP4tBjWhEzyZn1fLlnJoK4deCNjPNScZfigIVDBL7TWIFlNVqGrL8S0u5duAVpYSZ9x0QfKvPzzYS%2F%2BQsIsb4qe54NVc9jphe%2F4m1yORxJ9vXK3k3nO5rMw6%2B38QP%2F9L0JGcyPOIO%2FeVyS2Y2sJIfzSuLffVc47mrtF7YwDG%2FWz8W%2F%2BhqKHnb%2F%2F%2F7xCBeVNVTmzGcrXzDuaYI%2FHRrQfvNfzeUOZK4d3J7Uz%2BtVdyaD9gxJtazAmDx5VL5ZsIaVpYFNd98NottP8s8M9KrtAer%2FCG1nfmDwcqLByi27VMNLomHa2jBgQ3yJYKzAHyIaGrtxNmteNs45TTQFI1V%2BtAannyFtga4D9kk56oWe2zmDmq15EpkAaj7XDaMMzs5ssGOqUBL88%2B4BswsThw8HMbBm1kc%2FrQ2Gj7WnV4VtrXFqzxYsCB7TWl4x7%2Fjtyv3ToxPGe7VTvMGruvB%2BHbrKBoXPQEvpYaNf4iiqrLsRu%2FHRVsMK6ALeG4QOrMye%2FRj0uivGM%2FnHU7GPlBgyj2g58eynEimpQ8iGmxDo93SVea2UhcxE6tVpWqWSdbTe9SNN25F74LgjZEN3gFIZoRbWKuy9lhIhDHBu5z&X-Amz-Signature=91d0c59c5bd25d0e215cf4628ce8a0056861696557a30a83a044449d7d092369&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LKJA7ZP%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGdNqUSXuaAg0XBLkehC7VPpWmP5CjakOm2BFJCDNTm1AiEAsmEtcwAsrwFUpx6AwOgsvlLyQATnk7n1MA7fCtU9CEUq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDBYoTiCL1yK1JUKFCCrcA1TIIv7pC0pdq3cTHVXgiownMFkxmY99%2BN3iP5PtpxBC1QvNw2YT0lCn80njZfH8FKSUFLIvhRCrPaJSV4HgaIv5ofsmzk3npLLRcFBXGrSKcoEtwgQWVxA6T2x09GVYUCUFGFcGFeImN3gsyElvBpkl3D6nJfgXeNj%2BRgomS4nx7iw2OXB8EQ9y5UHPS0kIg2utgmGjfY3MLW2AVEZ3AI9M2s5m6dkGaGEboUzjveLu5EY9JCJftnFBy6e9lKSbjkovX8%2FRfRY8tWwRscMyJkFAk9%2F1%2F1Tb0%2FXalrHS6%2BBej4VgAPnqC%2FzDP3x7JQrOX9qyufKJpm%2Fxz%2F8qx%2FA5pgB6x9SmXLoKOvZKqkfCgUkLPYgju589k8wSsGMto09g9xaPDV1UdWmt1RyOMF91hD%2BQon0yGp97cStLfIqmLRGezMOQbbkywYZ62EXtRnYj9DWZJ1juzFEAN5oZS9bKhRsWj9UmfKtl6HwwabZKxNGsVClOKTQwDGOpMgiFx4tenZzfBMeofY09wZId%2FZxTrFh6uqkgtT4qA8ZPge01V%2Bq9xjVw%2Biy7ZUBeBGv8Em9QGDse98GisbbfvpknlS8jIoWE6HGB6Qm4rSm3tL81adGy49aM6BMxE0uAqTSxMJru5ssGOqUBQLIAfemzan%2BDEkQsni8ay0vleEWRMT2WPALB3Iug4zuNLEtZ1j6TAWUZlxr9rxMhL1Xgf9qGAXXte091j3fDiFevtcECJFQfxcyZxmc1rPl%2FI7HKqI3BTfJ7BmvA1wrk3CkIOWqp%2B92bjkNMX3SsV8GYd2EnbixUYEFOKtktnTxl%2FEEAeRwLWxqHCKK9KV5HvbLFmru9YMel4owRRToHX7UOaK7%2B&X-Amz-Signature=45e8651f931f8b8fe99b4464acecf31532e5fbebd4703321485d7e661614507f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LKJA7ZP%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGdNqUSXuaAg0XBLkehC7VPpWmP5CjakOm2BFJCDNTm1AiEAsmEtcwAsrwFUpx6AwOgsvlLyQATnk7n1MA7fCtU9CEUq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDBYoTiCL1yK1JUKFCCrcA1TIIv7pC0pdq3cTHVXgiownMFkxmY99%2BN3iP5PtpxBC1QvNw2YT0lCn80njZfH8FKSUFLIvhRCrPaJSV4HgaIv5ofsmzk3npLLRcFBXGrSKcoEtwgQWVxA6T2x09GVYUCUFGFcGFeImN3gsyElvBpkl3D6nJfgXeNj%2BRgomS4nx7iw2OXB8EQ9y5UHPS0kIg2utgmGjfY3MLW2AVEZ3AI9M2s5m6dkGaGEboUzjveLu5EY9JCJftnFBy6e9lKSbjkovX8%2FRfRY8tWwRscMyJkFAk9%2F1%2F1Tb0%2FXalrHS6%2BBej4VgAPnqC%2FzDP3x7JQrOX9qyufKJpm%2Fxz%2F8qx%2FA5pgB6x9SmXLoKOvZKqkfCgUkLPYgju589k8wSsGMto09g9xaPDV1UdWmt1RyOMF91hD%2BQon0yGp97cStLfIqmLRGezMOQbbkywYZ62EXtRnYj9DWZJ1juzFEAN5oZS9bKhRsWj9UmfKtl6HwwabZKxNGsVClOKTQwDGOpMgiFx4tenZzfBMeofY09wZId%2FZxTrFh6uqkgtT4qA8ZPge01V%2Bq9xjVw%2Biy7ZUBeBGv8Em9QGDse98GisbbfvpknlS8jIoWE6HGB6Qm4rSm3tL81adGy49aM6BMxE0uAqTSxMJru5ssGOqUBQLIAfemzan%2BDEkQsni8ay0vleEWRMT2WPALB3Iug4zuNLEtZ1j6TAWUZlxr9rxMhL1Xgf9qGAXXte091j3fDiFevtcECJFQfxcyZxmc1rPl%2FI7HKqI3BTfJ7BmvA1wrk3CkIOWqp%2B92bjkNMX3SsV8GYd2EnbixUYEFOKtktnTxl%2FEEAeRwLWxqHCKK9KV5HvbLFmru9YMel4owRRToHX7UOaK7%2B&X-Amz-Signature=45e8651f931f8b8fe99b4464acecf31532e5fbebd4703321485d7e661614507f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFQW4F3V%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T071631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDQ0y2FGkE%2B4NDT7C1w4IO%2FMo3KKbGPzMdRfE7zdb3NFgIhAPSJHx0JiSz8mHIk3fGJalguhIHCgHRxeoYjdJr2B4z2Kv8DCGgQABoMNjM3NDIzMTgzODA1IgyxXeJXwWCNZ5Jb6Bgq3ANzdpo8hzu7k7HJMk9VIJCsOCeh1nPEfEZheu%2Fsk03irV8%2BepJ%2Fl%2FgXBfCll4BH%2Bjtik%2BBuT58H0dX%2FIF5lx3jXrcRJtPKmVaKNsQN49uFvV6lWpwMExMFb5n%2Bk7qe2TxmL%2FqfUKa1jrnJAYfsOPowi7vYMC4QjDEFxgt7fXsi8nMyNC%2F0djN8ELJIUcAMhvxMqIbf5sUpe7SXXLN1mOcUbry%2BgAdbv8EmfTTiTC3Bz8RlGO1q0mQ4FQ%2B4BqZWpzeaWPZs4ogKvOOOZ4QAdacJGQQzaecWS5tEU2w4YeXIfyuAmkBG1HN29RCttVP9KXQCmKZntKMhCFPP2mEjTN5Q%2FYRDMFs4laGLizV0UBBgDnS%2Fd%2B4A7UBnN%2Fo2cMV8w%2BdJUZGfVbkjPgV2bhAHoGAUvJg2DJzPMMzFYWK6APOGzE8E%2BEfJXkPD%2FdAZBNMcV8BYXG65U7lo5dsm6BkT5rvaz%2B%2B0zVz8dDcK963Ft3Az01%2Fi0Pkgcp6t%2B8cW8kHUMxbaYQha7JzQO%2BqKq%2B6uJTa9KF6fhFfls9BVNTBIrV2wZvP9UJVj%2B8BbCHEehRmOyKFvyeXtgAKLy4LfOYXDgvarVLkgqppJCTf0WHJR4MlSA05y5psFTsWkiqArz1TDK7ObLBjqkAWDkRvoTmQGtJvUFDs9cBYmdD8oIUaY24krYoZeWQRND9m6Chnw741%2BQMGCiJRAm1nGdugjR5K6BRaWI%2BQZr5VfZsWRJmVtrvZDfQnK7hYuIjNY574h3XV6ZoLZhJfd1WvjdMYP7I6TUcMhHOaoTF7wW917k33t%2FFId%2BsGq5exF2SDVuWl%2BGIIwQHWLBS2oBO%2FXO26%2B2uRbV5Kj9xlYTZjALCkJL&X-Amz-Signature=fc0c2eb3901bbbca936a38f5504c2ca32a27878c2e6f75eecbce6fb26c478ee7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

