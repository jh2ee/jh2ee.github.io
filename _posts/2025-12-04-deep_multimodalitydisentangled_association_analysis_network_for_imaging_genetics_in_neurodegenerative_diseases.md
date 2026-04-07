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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CYWSKBI%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIAYAuK6rO9x2tiHZcAFj0cNse3kzvJP1Zvkd9NVJTrjOAiEAmruo0qnLFI58qkyX%2FrKfvnEcHvaoeM9sUSR7SMrtKz0qiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKcDwMvc9GWIFfPrCSrcA19%2BCQDB8Lmgx9T71wD1dI%2BMgwoCW2I8tlyJFqa0PPnDcgSwhd3jec0iuZHRorKAHdYiA9iNHZZDeAiQ4D%2BqHs3mp2lQSexbNks0QErENmrBeaEPpptgZr5ujwO%2FtUn%2Bp4DQ7WJF2ARhr55k%2BmTRorKPn8oIjKjlltxlVpbk3NclljOb0qJK0g4myM4tnd%2Fdpp3MxeQP%2F4KMzv69Ji%2FK35TlTs8ZpUXe1W1WTJOkyOeT1dcJBMAL8v7gpVsNGEHUXnOLDnavDP5zxQR8Qe4WA7w8kxI5pq%2BGcZCubN%2BDTjKC7JVZYz3RA72S0EcO%2Bl8xWHhmF7nFDLkGGLZilS%2FxkwqZSo4rh8g9Bzd3Wjx7nUgXkwHjlu%2FLyrLPp32y%2BavVWA1VYWueMmyiW8jWeWGa682mY%2BhupbRGQ3%2BM9z00fUSB1XDzuTFVn2jF%2Fz%2BaBpTAbGkBsdRbvqA6ywhvPOChjd0VlYqOw3dO2hegA7LrhZJbWfDNHIZ%2F3FERco53sA%2B3GS9R32lB%2B2Y5ZU9rHgV9%2FwgslOzzN4oToVc9RMHwB5XwBiw5000XrsYbqsYhcsDkuy9U1QGMf%2Br80J11y6xb3hw%2BRHz1TEVXxbJsqLBEMxhgnbq5yPbdnBShPtZLMLeI1s4GOqUBnOE5FsWmYil3QTjR4QoP36p5bCBWyRNK8e1DR5onyFZoPjW%2FF2BVS2%2FDLaHVofGR5FALEiSEvdtUN4HYZtWEtrwGLix5fTX6ZRFuPuaMQab2ZVaFxFd05g%2BO1XbnR7o%2BuEaor3wm2A%2FSNDpw3adY7Cva9DnEycuxyBpiA5%2FAIxhTYM8AUB8cp4xGXewpxYE2ZmOqD26vl%2B0auWmPYzc4LIRQ9Sdi&X-Amz-Signature=c8f8962f576652a47252a480897cce6d8db8e6a039a7fcbb12e8f6a7d5db2011&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CYWSKBI%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIAYAuK6rO9x2tiHZcAFj0cNse3kzvJP1Zvkd9NVJTrjOAiEAmruo0qnLFI58qkyX%2FrKfvnEcHvaoeM9sUSR7SMrtKz0qiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKcDwMvc9GWIFfPrCSrcA19%2BCQDB8Lmgx9T71wD1dI%2BMgwoCW2I8tlyJFqa0PPnDcgSwhd3jec0iuZHRorKAHdYiA9iNHZZDeAiQ4D%2BqHs3mp2lQSexbNks0QErENmrBeaEPpptgZr5ujwO%2FtUn%2Bp4DQ7WJF2ARhr55k%2BmTRorKPn8oIjKjlltxlVpbk3NclljOb0qJK0g4myM4tnd%2Fdpp3MxeQP%2F4KMzv69Ji%2FK35TlTs8ZpUXe1W1WTJOkyOeT1dcJBMAL8v7gpVsNGEHUXnOLDnavDP5zxQR8Qe4WA7w8kxI5pq%2BGcZCubN%2BDTjKC7JVZYz3RA72S0EcO%2Bl8xWHhmF7nFDLkGGLZilS%2FxkwqZSo4rh8g9Bzd3Wjx7nUgXkwHjlu%2FLyrLPp32y%2BavVWA1VYWueMmyiW8jWeWGa682mY%2BhupbRGQ3%2BM9z00fUSB1XDzuTFVn2jF%2Fz%2BaBpTAbGkBsdRbvqA6ywhvPOChjd0VlYqOw3dO2hegA7LrhZJbWfDNHIZ%2F3FERco53sA%2B3GS9R32lB%2B2Y5ZU9rHgV9%2FwgslOzzN4oToVc9RMHwB5XwBiw5000XrsYbqsYhcsDkuy9U1QGMf%2Br80J11y6xb3hw%2BRHz1TEVXxbJsqLBEMxhgnbq5yPbdnBShPtZLMLeI1s4GOqUBnOE5FsWmYil3QTjR4QoP36p5bCBWyRNK8e1DR5onyFZoPjW%2FF2BVS2%2FDLaHVofGR5FALEiSEvdtUN4HYZtWEtrwGLix5fTX6ZRFuPuaMQab2ZVaFxFd05g%2BO1XbnR7o%2BuEaor3wm2A%2FSNDpw3adY7Cva9DnEycuxyBpiA5%2FAIxhTYM8AUB8cp4xGXewpxYE2ZmOqD26vl%2B0auWmPYzc4LIRQ9Sdi&X-Amz-Signature=c8f8962f576652a47252a480897cce6d8db8e6a039a7fcbb12e8f6a7d5db2011&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KUNXP4L%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIBHYCVUe%2F4O4Pq%2Fqqlg%2FwhyD7T1TBmURk4l363lvYNTKAiEA9U4YnsZEPy6gLfx9odtAp8eX4dlFhCzWDPrEufryxX4qiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN3dow2xRdJo0C478yrcA0zNFRjbtX8Tlkdjzg3h886LNlFboEZIW5kWhYqAkyuSt4y%2B0yrY5xp0lHXdP1Kep9gINW%2FoHYwXVA0%2BBr9J4v1IPyXYKvfMfoDFTDnDfcqJNqaz%2FwCpjUyOxw2ORhZ%2BkP2Bzlq9bsPuoDww2DfTpVPfNztixhyhM4xFfLV0aKRLyr3G2EtAnEIV6PapippcVtI663PpV9oAZatoXka7dvnAFkm%2F3aYiDEJAPdTP7qmuJZOpGjdlV23kfhiEW48Z4bJWH9ktbl%2FWiG8FnHNLDuM7OYuIAhjmuh%2BLhkP4EOZVkJANhMJWTe6FdoAAhQtrmi%2BOeKFQUDJR%2FngbjIwYJfpp1obgDx6J6Tgqaxf7JqrrZRn7BOIMItzh%2FYQs9GMwkmxrSWz25ORj8jo8QbyPH2jgCoAkGNPBDvhkJePPTx1%2By6NR7qVyyAFDjU8TDrhcJRGflqW7SQ%2FxykK46NQIkWzTSiSB5YTtM3BQmmXpu%2FOeob%2BZhq%2Bon1BJMwSYlBUDKb0MdibF75piJXy1NwPpzIDh91P3X6t%2Fu8PLpn9OkmBF6dtApKJeIuNL3IQff7C4tQFZja3pYDLSK12m91m3R3nAof7GLm4eis6RVviKWGIHPefNKtMg7KP9SXr3MI%2BJ1s4GOqUB2dNU6YMhotjRWZQspEVdhMofLfvHvyRYk8elbIqYli1tOzddFDckjL5UWsguWsqURRtpHCRPLxhgFC1M2kBFlxv7u%2Flc65lHumFh8TLePQdnP3eGoNCje7zkzWrWfbMVXviwzuGso3Zx0MhnqsCFiJecDiEys4IU7S2058zhfCZPiW%2BGry9HOlVk3WdfQx8OqSkJ%2B5bc5SKAi64LOPBF91t7t0fJ&X-Amz-Signature=ce52c23538d9409bd2503927ffa4a138e36599ba6fff0e877b6f41f9c0a27c9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHH5SMAU%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIB55qHjPc1fI%2BmUftkOFDvDfluQptRxL7D2i34HsyRiLAiEAi1TTYX2QMbYJHyCGX%2FxXr291MlogeN57TvcAhmRGMbQqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPmU1jZt3NGIGqBuVSrcA0%2Frx5d4D6LtHpxAB6a14MbMKsksBy%2FjxCmU1oA4BoLZnwZZN1N5rYnHmqDYkoZBT5ulECNHwlkLoR84AnlyDpmdJIc7Bot8k3VD1N6Rp6Ctq3b6lCGUFEh5iYpyQbWs39BBU2DbXlorIVasKa%2FQBGgbPxF36EmeOqmPZ3mcuL5SewNXIHBNYtlsIB9VJ3%2BypZW0HY7KDANAXrre7PDeczMG05AIdjZzvewmBc7i%2FXx0tMvz49o%2BjhzYQiVczn5vwLXZQ%2BRF%2FSaLpxQba6alIQxc1hGdSDvfYGm1u4LylP5FwrwtIi2voIk4CI%2B0zn3FkzSqPA81KbnvB3tMwSBt9mwJ3h5Bc1o7j%2BWIAhCYweejYnTHZnVY2%2Fa7zBDS2s5P1kPeDuzjZyiP%2B3XvTFoLDeNX71m33wg5qufHhXXi8Y9OR%2BupkOin1eCZMky2FDefniQKSVe%2FXyZIbneBhb3lv3LMfBhzNxnD74X2c4R3uwTJSM%2F1rPGxG%2BTgkalx1saD2cPJ%2BWX%2Budb9XWh2heKIUgJMIS6bgKn7Z5wH19r2VaNLf7Z8gi6Pwz5q%2BTLO%2B4de4LDMc%2FY%2BmP4iMP60MDrA40APi91jpigTW%2Bta79DTbBZ%2F7DDDOyp5UWFZqtsrMLeI1s4GOqUBDQ%2BFDFPKptYG770%2Fc4dNiBotiOswszckeFEtYhxv%2Fnqef7PKJSgxaTR8gf%2FUq4N2vV5T0nJB7epnY0ZY3XyiRfwvKbdmKFBzt0ipv3yzn8x7DFBPmDJ6ZJ0LN30oKEycQgO1jPBq1wmPlrJ%2B5O0Q%2Fmjq7GOq00F3Pnsh59sEaJKTIBUyOkjyxl2mq7e0xM3%2BCeNSFg3URTQll1OkslZQTkWljPKK&X-Amz-Signature=f54d3d2afa63a4b19269b8a95b6a0243ca53a5c7bf277ee549c364b950b12e5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHH5SMAU%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIB55qHjPc1fI%2BmUftkOFDvDfluQptRxL7D2i34HsyRiLAiEAi1TTYX2QMbYJHyCGX%2FxXr291MlogeN57TvcAhmRGMbQqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPmU1jZt3NGIGqBuVSrcA0%2Frx5d4D6LtHpxAB6a14MbMKsksBy%2FjxCmU1oA4BoLZnwZZN1N5rYnHmqDYkoZBT5ulECNHwlkLoR84AnlyDpmdJIc7Bot8k3VD1N6Rp6Ctq3b6lCGUFEh5iYpyQbWs39BBU2DbXlorIVasKa%2FQBGgbPxF36EmeOqmPZ3mcuL5SewNXIHBNYtlsIB9VJ3%2BypZW0HY7KDANAXrre7PDeczMG05AIdjZzvewmBc7i%2FXx0tMvz49o%2BjhzYQiVczn5vwLXZQ%2BRF%2FSaLpxQba6alIQxc1hGdSDvfYGm1u4LylP5FwrwtIi2voIk4CI%2B0zn3FkzSqPA81KbnvB3tMwSBt9mwJ3h5Bc1o7j%2BWIAhCYweejYnTHZnVY2%2Fa7zBDS2s5P1kPeDuzjZyiP%2B3XvTFoLDeNX71m33wg5qufHhXXi8Y9OR%2BupkOin1eCZMky2FDefniQKSVe%2FXyZIbneBhb3lv3LMfBhzNxnD74X2c4R3uwTJSM%2F1rPGxG%2BTgkalx1saD2cPJ%2BWX%2Budb9XWh2heKIUgJMIS6bgKn7Z5wH19r2VaNLf7Z8gi6Pwz5q%2BTLO%2B4de4LDMc%2FY%2BmP4iMP60MDrA40APi91jpigTW%2Bta79DTbBZ%2F7DDDOyp5UWFZqtsrMLeI1s4GOqUBDQ%2BFDFPKptYG770%2Fc4dNiBotiOswszckeFEtYhxv%2Fnqef7PKJSgxaTR8gf%2FUq4N2vV5T0nJB7epnY0ZY3XyiRfwvKbdmKFBzt0ipv3yzn8x7DFBPmDJ6ZJ0LN30oKEycQgO1jPBq1wmPlrJ%2B5O0Q%2Fmjq7GOq00F3Pnsh59sEaJKTIBUyOkjyxl2mq7e0xM3%2BCeNSFg3URTQll1OkslZQTkWljPKK&X-Amz-Signature=e0f232942e9b7dd243ee80360f9352652baa55ed8a2fb020a19be7f9ddd1c4d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXJOWBTT%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQDZaf7BNsfLV%2FohzBKWn6MyINIBAy%2Fdzxm1FWMqGHCYQwIgD92qcv6yDMM27W3oXFp5FkszPGJlGlVAmU7FdY6dyQwqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDFY7CXSi34a59SrOyrcA4Nmw7fAOwDLNlCFyB1CY5sbQ2EyDh0HrPsnOQb%2By6CPKYU%2FWHldZjUVemtskonPMvBV8TcmLb3J16sXOexL%2BP8Ob%2FwRPVMsacjf5dHgEMOUNjzBAxDCRTELsVFusRsxfLBn9cYAKZibxxOjoCGRdF7jaKzhKY9cizyKGHTSjfwhs3nftBwmG7mgXRLUUWTuPoYWE73Osl3QOCPhRy5NyAbGHvscotbkHdF1nnEW8iYBFM%2BHLNl4YV3YMAMxh46PkjR2xlo0RU%2FIJoCJm2fVJxqkGgApqW7CwXcK%2FYavKKWiYO2jCskiU5tKv8w95lsLmgRdZQqiHlFCIc6%2BOkPn%2F5bQbBGS1%2FlXRgzYkD50YRc2iED2%2BFxQm5%2BhcwHNoz5ZTQkUm8%2BVB%2Bnq6DC1xnEpYAHKdsijPcScMX%2BYLLZURt8x75Nt%2BVtrq0muxj%2F99vNv8unhyyjtPGLqKCFDd413RnkOd3Kd%2BFYg%2BJGjvg5B73f5Ub%2FBklEp9l0aydochGSTV9%2FkPPPmpZYjcxmhKPLJSnCcqAoyJjQF6MCJ65JxCVbuCDpuzm4zgxVjo4vkoqDPg5fqK1Dwq0C87LHRW4HPcw8eurvrEdl5SwbXYAGi1M3xxPanvvhAT%2FYOlJfpMPaH1s4GOqUBFL3ciS5jyTmA0h1Roo4NLn85sWSvBP%2F8eOVwJXU4xisnWPOk6n4%2FIhjfRGGpikq9V0PF95wTYgVBaA%2BjqyMxGmg6NsIJE8BXRSeX9hRxJLTDXUHvBQtCzeKq8doF%2FP6AMgIuzndiNq5MNc4yvSSEYfMSkWcS81ucqx6ielOw6%2BxgD2UcpYMN1wdEPORaDxRrbTZx9rTyoDY%2FwEFiRCW2rrY23cUc&X-Amz-Signature=a2ed9909f17fb7abfe967ca657895a6da2bddc7be578c1dc5129e2e48c892bed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LANXT2H%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQCUBQfDI%2FKds5BmvE5f097YEuz30HpM4uiffbZNBXnkVQIhANFfydxG1EuNBlmD8vIiMFKpeJv6UJQz%2BxvIPGAAbBvoKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxczHr7Hj2lm2tloOsq3AOOppuVv5gaoKRJs9tEc4EWOjXPr2oEa1p8viOlo%2FIL8VnBiOHnP%2Bs6JzAQDFUtx9YJfbMeVW0nk2kKhPlgZIy%2FXxuEJpOqN9XNkVGwWhDKljegry1e0JKGHng4oCYOjfxeCzPQ0vP4u5Tg12iQEv6MBiOPaRdK5VeaqCcNZZIuJr6UgmyF%2F6dhJ4QU1xVqMqAzV1NSG77h03IKeJJduukr%2FYbYyFy8U3UOpo4xyeklSJvB7WPEF8Zv59gm1TkqHDS5%2FFkkRUr%2F8b3Mg%2FJVMbKjddgAw0kSf54yCgou0WEferOK%2BbdDfA9G79dJxFRUZTktLhAU08y8KV%2BnnqSYAJ54iNCLRhGdQPQmHPaiPxexRal7Ic%2FBtid9OTeP%2F67Qfbf4fxu8dnKZGrlj0ysiTKeQsNDLEpa89scJwiM2s6%2FEkzqy3nCeF2tZhnMJ5gD11ce0oCKWF5IXmgr%2FDLIriLdopUL903oT6i88GCMkCWJBN3grFK%2FNuafZeTu37SlqgDOVIhgDOwLM6Wp8VGWq9MSbO5y%2FjAU0yW8amW5E3Lf6eUVNsWhI3P1YyrvDFonzVcD6vIy2tCaRoClA34LzdyVGbwAYPAVrJA3xMlsJFxBgAJEdB2ctVFbdIvQOqzCoiNbOBjqkAV2ygOFEbbwNIA%2BB3DLYRkP3%2Bt9zjvRm0BrGue9a6sRvZ2VfrJG2vCl9fU%2Fyl8tyniI9mcdrg9T87SkiauWDYneKsvR%2FbuH0x8CZEPFfAq9y4hL9neKQmhW3g6VSPMe1KZJNdHIWIPu3AEZTyfXrzl7Uq30vIcvWx3gZluolPaTbaltA%2BnE3fNLqchEN%2FxSdJjIm6lT%2BL8a%2Bs%2B4Ku%2BtHdbmyHbIG&X-Amz-Signature=e0b0b4182143c4a32dd8fb33d41bad69f1cb020d125bd86e6899b089b607e77c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PCSI5Q3%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIEX8Cfzonl39fQzC%2FVzZ32zG%2FqIAqYhfQqzhJ8Vy9hLcAiAZnE3N8gYa%2BZRTnwIHn6nc%2FmA1wPAzbEuY3DojVppPsSqIBAjw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMy5bPRrL%2F%2Bkbbl6JoKtwDgmrwJ4QOfn3ZxfdRxlLyjqXUmhT8SjpVh8NzdcIihnfMjp0qnyDOUWsE7ezrbD63DjHjbitZP6nrhA7V0xr3ThjH%2FNfuJD9i%2B6gCbjYuhCerwiNPmbKrRKQqi2sebBmfigkBCxdLFGCMmaVYRUdpqJ40wTEnF7RoyEnuu%2BwD7l3XaUWNxMvp57799fHP1UVoo%2BVJaCjMBH5hgT4Jel4vKHk%2F1Thi8PuVcnS1yuAiTa8LTQOWsrxpQEVukEH1Q%2FNNRvXma0th8y5oUUtb0HzVWOZ2vEyBiGvgSPBIuNCFNNI%2FLA6ma9BdGz5Vc9dg0jk2UMK%2B%2Bhktgftuj4EWiOaRQTZW5LtQ8e3OQ8ThbE2vMeLuRB2Nzo9R3MX8pYbm7ysUgLvRTewVFSqnDMDr0RJYMDq8V%2B6WUzFg86CPMhrWbsmbD62bMyzWVAJv0NTpJKpXjwtYZfAtNtrz8hnT7ycpLPZGEuf9UwzL5oopEqqurW%2FSTgeuX4xWm%2F%2FygrrQWmJ62fa2hIxBbN%2BSjdTx56bHHzhFFcmrH1hWarzsoWdQOaMzYecFjsYdc8FBehqZdCMfZ09nwOjKdhR4imrQYHajxRoMQ0fYRdxz3MTL%2BNqXbE7BRPmZDfedG5qDWCEwiYvWzgY6pgHrq9po%2Bh35HPSp%2F9%2BWoR1dFUo3VquQl2SBAlAPlKciwrcPlknqGOTd1%2FgPwz7TAnomt235MY%2B2Gnhm7%2B%2Bg4P9Ghx4BcNUevLAPms7H7emSRFb7klgjUAdb%2BU0SuD%2B2It3xFQjjjf9DB4zzvc8p5%2FiBH0cEYkJIRIg6PW%2BmTHY%2FgYrZMEPbyFzL46MKLnpZSMtbQ8532oB%2B9yMkcbVsLALHm5dXAqwD&X-Amz-Signature=798440cc6bb7766e83136181e86ffe97ee62edc2245f7a008a2f6a3047475ded&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNBOKWBN%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIGDQkOEyygU3zo0RkaJI75UFS%2FaVOKCqIJOW5k%2FKvx9OAiBaGe48xHIiBEO%2BumS%2B7qvncrCeQ4jqii%2Bh1CIkASwzWiqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJS9Bum6hgiVj2qWVKtwD9d48%2BrlmO1XTIRo7eH56lxIL8fPbJzcK%2FcPnd7d%2BnnCiDn47aXcewk%2B6rcv32nEBMglI4ooKcZ9JLjgghSvz3LEHoI29HDlUdKWie6ELz0yKTVB4ukGXrtrC5R1IoE%2Fz5syvYCCxqpOR%2FQHzER0RJo5vpKnL%2FX0ZWhGKBhXwQQGk2aWL1Dax%2FjCBhmnBdgacUB9%2BrFoATygyLmqkuLTb4hwOJMRdjeNX67DDp8tQPDsBxcpINV9bBtdM8VhTmhr5mQnB5nRKCH1WS7lxRh1TPxkLp2WBB8G%2BaZsvj2nM%2Br5YBSvIjY3P0lgwFkLpstNZOe12PUgu2UfcSllofIZxNS0%2BAx%2BqEqJd%2FHDh8Nu2V9wStGiUWiuiy93%2FA5E1HNiqjbZ4mUKOYyLDDRiRUZx9JTsBB1irVegFaxF8GW5blquy11FEaq3ZmOzTm%2BAFbMPaRxlEHkiESDj5O7SSEFeWjwptiGBuTiMf6cH576D%2Br7OGmNsozKYtXy3HgnGIggu%2B1bvW0q955F0BLYR15yqsM9x%2BkYg0OEtOV2RDcfGp7uQxryb3V00I8w0qZAnasoF2QgeXeOErX0dh3MCFcKoh%2FpbbLtNHtM08%2Fev%2Fhz03dz8yT44RNiGGhuUhP%2Fgw94fWzgY6pgENQ6pby3S7J30%2FupnWtKposAoWk5IhbHkhwSa%2FhYdwmQtA56R8BDToTIf7phZyhU7kB8OOFUiNFwZvLXq2CtZm4lPZcP9yzWEK6GT6hv5Jc0ofSizcUJo1AxVR0tQuzE90bDUZTt8w2v0aotsJI3NrKHA%2Fq5omeS40L7rV3K2QDa%2F6poNWo3RObi4zdfuW4cz09LZrzuxLyE0QBtLET7Ge50UPcgzO&X-Amz-Signature=5367c8ac08a6a637efd5d70162de40f393f8375cabfb5a22ec8df23453f907c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNBOKWBN%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIGDQkOEyygU3zo0RkaJI75UFS%2FaVOKCqIJOW5k%2FKvx9OAiBaGe48xHIiBEO%2BumS%2B7qvncrCeQ4jqii%2Bh1CIkASwzWiqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJS9Bum6hgiVj2qWVKtwD9d48%2BrlmO1XTIRo7eH56lxIL8fPbJzcK%2FcPnd7d%2BnnCiDn47aXcewk%2B6rcv32nEBMglI4ooKcZ9JLjgghSvz3LEHoI29HDlUdKWie6ELz0yKTVB4ukGXrtrC5R1IoE%2Fz5syvYCCxqpOR%2FQHzER0RJo5vpKnL%2FX0ZWhGKBhXwQQGk2aWL1Dax%2FjCBhmnBdgacUB9%2BrFoATygyLmqkuLTb4hwOJMRdjeNX67DDp8tQPDsBxcpINV9bBtdM8VhTmhr5mQnB5nRKCH1WS7lxRh1TPxkLp2WBB8G%2BaZsvj2nM%2Br5YBSvIjY3P0lgwFkLpstNZOe12PUgu2UfcSllofIZxNS0%2BAx%2BqEqJd%2FHDh8Nu2V9wStGiUWiuiy93%2FA5E1HNiqjbZ4mUKOYyLDDRiRUZx9JTsBB1irVegFaxF8GW5blquy11FEaq3ZmOzTm%2BAFbMPaRxlEHkiESDj5O7SSEFeWjwptiGBuTiMf6cH576D%2Br7OGmNsozKYtXy3HgnGIggu%2B1bvW0q955F0BLYR15yqsM9x%2BkYg0OEtOV2RDcfGp7uQxryb3V00I8w0qZAnasoF2QgeXeOErX0dh3MCFcKoh%2FpbbLtNHtM08%2Fev%2Fhz03dz8yT44RNiGGhuUhP%2Fgw94fWzgY6pgENQ6pby3S7J30%2FupnWtKposAoWk5IhbHkhwSa%2FhYdwmQtA56R8BDToTIf7phZyhU7kB8OOFUiNFwZvLXq2CtZm4lPZcP9yzWEK6GT6hv5Jc0ofSizcUJo1AxVR0tQuzE90bDUZTt8w2v0aotsJI3NrKHA%2Fq5omeS40L7rV3K2QDa%2F6poNWo3RObi4zdfuW4cz09LZrzuxLyE0QBtLET7Ge50UPcgzO&X-Amz-Signature=1ec1501412860ee9205d537a42dbbcf6225d110059b0239cf82cdd5ebdb5206a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZV4BIQG%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232605Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIHx%2B4b8G6wyeliGthFdyu6hAXvh9O3NUO3qgxUQtkKPrAiEAgQRALKUKhM9sCqK2DbzpQUFcInaBsyvNbVt%2B%2BuvW3OUqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKuqNagiYL5Mym4%2BTyrcA9K7YhGKJ7weW%2F4gbikiYBl9Bi6CY4r4z4MJBtxfsnDCD8nID%2FFk%2F59xjMrmhwUPFgD1d%2FAwL6aU1rgj%2F%2F%2BCnI9Su7VAEvnsGj1fmB%2FpM72dXW%2BTkifyr%2B9q4fMT7mGsBE2OLMT%2FVgx6NYjCRJKZXiA%2BpFEFLePlw7s%2B7Tftqeh0AVJtSivr9HobTAkGxrgv4LxGgkdnBSH5kFI5i7D5eAOokdrIAcABaYmaOQSzdk%2BEUrJh7yx5I9iKQIykiL6DikpfPiW74BeBajPBqdJFS7UJpi%2BvDaMbRGAv0fbHkQlp23KnZAYE9Fj3qb9azXSPqJiDb%2F7vOcMior02806rXmSZArfOXoYbMPEQPLH06lM1DcYgUw%2FMbWWAsq4%2BBC034RvfnVv4aV3OqSL2%2BWhjOJnEAiLwjX1g%2FDsjOeHAtfq9tI%2BRg4VnnOVTs88IyOkLBGtElgor7PCyN3BX9G7yxtW9tuJLeSyidXdodwrGSOML%2FtTmrGbFCyC7Mi%2FLZuh%2FSOLk2OrTI9c2esJqkrL%2BIXFYoqfxGdN2EAxxr8O1gol8%2F%2FrO2zrOYMBshZCJXsTb77TfO0wIIuCuc6%2FpyNDIGrpLwN3Ggf5rV8Op363qA6PWGP%2BtLY0Z3pN%2FzmB0MLOJ1s4GOqUB4%2BzwXvys6Zx39vO51wrvnUOCUBKcVld5DMvrRWigijw7YjsIkHsTWrAtdRwK%2B6mAyhQ22iyzr37Vcy8QKcGHtYhxVP608LQitKYESK%2BD1hqE8J5NpqHGarremsXsk6EsfDQVzGKMypFsCgwSl38%2BGYB5NO37mb4lik7xw0NqDpFfbCz8dUIftEvUr05XXbzqCy4gD4uWLtcX9q1a%2BRmOPwEfGXT7&X-Amz-Signature=3470896f9e2567f220a90ddb9c5163f47c315c40f752acdcae43e01ac4918143&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOPAHMSY%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQDRrGk1audRhidE1UzcEXQTEJJArz9yGwjGoYHTfApOYgIhAIQR%2FG%2FhdHMqxczqqcl%2F9MI%2Byel2HJWfnhdo0o9dc%2FpuKogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxzRUrGR0tM4Lv4DmMq3APf%2FZfi3rWjxQkgPSbrAPVglvlChPVfhnfKBo4jK5hMagfttNQ%2BPEdl3bosGX3tcRXknf1WqdirWEN4FPX2%2B4TE%2Fi%2BQuosgKGzMOqRDGnCdJevAGP6P339aZis1Vj8AVNj%2B3eNS%2FhxA12c%2Bak4wUdWGfVVwYUjJ7zKa7VxIOw%2BcCf8LTmXXMZ79w1rjfz0WW7GlZvLR2Td0ohj8qUGj3FQWcnM8cIN%2Bk3WF8IzQaPO81PURR6CK72Jeo5ChMFg6GKHPWh9a%2FIpdIcV8sqwPJyZx4I0H01sOzu27Of%2F6dK01sotRHaIL0DHv%2FSakzuVEMdcJmawpFLofOAmqT8NoTYuUO4F8zcTjwUyScTSHdmQdnrV0up5dOMYVtWbq%2BFlIp5m8bQwoSYLK6CFUn%2FUPzLS575D2UffdfhGgrCMPdoloTqE4a1vdkk5QqiMILCu4D26c9bNQweLtq%2BXi5DOT9JpKvasfJs%2B2kG%2FDS5VyrhfGNH5xWRlIibuAp6jdNELVEH%2BuMRjuLdEZrzRie4ckf7aiLzASuWvIrkW39SW3gVVeaXTdC9OEJClCYF4EOVFJ1mImhTLPcdcXOjZPdnb5FfIfjcPw3Y3Gmf9s8SQpQ%2Bc880U2xLfsFkvRDKkwhTCKi9bOBjqkAfqx9W6Y1VGJW0%2BueO6b7hFWa%2F%2BrZzrMx7lpoXsuKtqmL9jBOmeiRMZWPeLAeF7TQAhH3mMyUbyvL23rOIdV5FHAnBKkZfQjbCniuUkXb5Ojc1GSV8XPJqNikTLOeL%2BEjHcsD7H5tbi3DA%2FSbGkfshvkQYf9w9y9hVcJ9mLJAVTzexC3IEr9aJypbEk9kg4l8mMhFMmaUu0le0nEOFcx2%2BCjgONn&X-Amz-Signature=46c5a60a2c3def00091b99fee16230259943275bb47d03ac502c23ad583c9739&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOPAHMSY%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQDRrGk1audRhidE1UzcEXQTEJJArz9yGwjGoYHTfApOYgIhAIQR%2FG%2FhdHMqxczqqcl%2F9MI%2Byel2HJWfnhdo0o9dc%2FpuKogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxzRUrGR0tM4Lv4DmMq3APf%2FZfi3rWjxQkgPSbrAPVglvlChPVfhnfKBo4jK5hMagfttNQ%2BPEdl3bosGX3tcRXknf1WqdirWEN4FPX2%2B4TE%2Fi%2BQuosgKGzMOqRDGnCdJevAGP6P339aZis1Vj8AVNj%2B3eNS%2FhxA12c%2Bak4wUdWGfVVwYUjJ7zKa7VxIOw%2BcCf8LTmXXMZ79w1rjfz0WW7GlZvLR2Td0ohj8qUGj3FQWcnM8cIN%2Bk3WF8IzQaPO81PURR6CK72Jeo5ChMFg6GKHPWh9a%2FIpdIcV8sqwPJyZx4I0H01sOzu27Of%2F6dK01sotRHaIL0DHv%2FSakzuVEMdcJmawpFLofOAmqT8NoTYuUO4F8zcTjwUyScTSHdmQdnrV0up5dOMYVtWbq%2BFlIp5m8bQwoSYLK6CFUn%2FUPzLS575D2UffdfhGgrCMPdoloTqE4a1vdkk5QqiMILCu4D26c9bNQweLtq%2BXi5DOT9JpKvasfJs%2B2kG%2FDS5VyrhfGNH5xWRlIibuAp6jdNELVEH%2BuMRjuLdEZrzRie4ckf7aiLzASuWvIrkW39SW3gVVeaXTdC9OEJClCYF4EOVFJ1mImhTLPcdcXOjZPdnb5FfIfjcPw3Y3Gmf9s8SQpQ%2Bc880U2xLfsFkvRDKkwhTCKi9bOBjqkAfqx9W6Y1VGJW0%2BueO6b7hFWa%2F%2BrZzrMx7lpoXsuKtqmL9jBOmeiRMZWPeLAeF7TQAhH3mMyUbyvL23rOIdV5FHAnBKkZfQjbCniuUkXb5Ojc1GSV8XPJqNikTLOeL%2BEjHcsD7H5tbi3DA%2FSbGkfshvkQYf9w9y9hVcJ9mLJAVTzexC3IEr9aJypbEk9kg4l8mMhFMmaUu0le0nEOFcx2%2BCjgONn&X-Amz-Signature=46c5a60a2c3def00091b99fee16230259943275bb47d03ac502c23ad583c9739&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLAWSZLU%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T232612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQCZHv834zAbfRslJAnr8mEA2K%2Bys%2FJKgwfrH5AdmwngTAIgDmtjPMKBQdafmqE3o%2F5bXDbe%2BYzDVw8KSFYCrTRiBkQqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPFJCu7nFcmYiydaRSrcA5e%2BhIiHQCMHhLHbnpywllR7WgKn9H%2FmYezRqA1HnqTfHoHGdNqSaRl9dYiV4PZvgymrtoz%2Fy%2F1Gn%2Fc0nQQ%2FizsXnPGkYFTLgvUxo18oq8BM%2FOVfrUhDCFjft%2F407luLjKgCJvFSupQA0Dv6jEjpGaHTXBvzIxXu3HdoyHU7x%2FTE%2FXlwINaPpjeHZPMKnLGWIXCFiGiG1kNxdZUd74%2FIokCYYpAOD0XkiDDoOYvXlzcOpsFOB%2BtFb8G4hLsecex10qdFRPPmwnf8EFhyg%2BQwkqTYvoXOV2yzUXI5IoERBSf9UYO8gJVkoR5ciqt3JT0ogt%2FA0zYRpeUPWpJwc5E2ucLj1eachR5bBk6zagzcca94fTktk9zVAY9slU2iPlKehEC4LpT2ubEtxtWUjI6JoU1u7K1%2BJNJLnriM0hYaYuytHRVsMmUTobDd6Bcm5FOacVcPo8V33GuKK0BieJddbn71CanQWYPahWRawZkwE0rdxtA5YCjmaT%2BatsKuN27bmZiO1cRORf%2BTdZXuD4KK6ORt1tcY646nuYV7Jm5JKcH0mub6a5HdHNYAgfMEZFg5wHzM%2FpEpe6GCMymvNYAgyGdy8II7Dqte%2FPmxjQWzOydJiYlmTXqPJR30r3EMMLSJ1s4GOqUB%2Fs6oKjceZ7sTBhtO9%2FwvgOTRZLRdOWBO42IIkKEtgKZkbXfoHjis7MzWb6ha7ztK9ugfGQCyZ6sfzj0Se4rLOr11Jy%2FbptTUu8zyKXgJ520kixv8re%2Bbc6sQicfJhcSxuEMvTI%2FVPCx9p3xHMRgAEPmTB3wvMKf4vpgrQwaWHrXKwqn2bBvTyXx17XFX2Cl7idDO3v%2FjlAujuo6PmpO4oRdQucFl&X-Amz-Signature=fa2f937cbd1660b39cabdfa259d902343ae5351f563629d5767fc4a96d3dc8ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

