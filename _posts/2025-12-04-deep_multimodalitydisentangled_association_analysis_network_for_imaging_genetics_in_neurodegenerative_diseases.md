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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI46XGJJ%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJGMEQCIGVvdBz12fYTkyI8qUjAeiA4xa1OwOGBFiLo%2BKRKoIqgAiA8vdik0JrVrS6w0CoTVQt%2F2rWooymxIIQnGH3rLlh5KiqIBAje%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMiDeUFbYk8GiFEmPEKtwDY9HVF7nTjRVX0jX7o2z%2FTvq5y0w4vtIiEbsTHF7MMgrRLXS4ZcZGfsg1y6Ah0Q%2B8GEC9zHFsO3P2PtwvG9D4smWsRh21JsYXiLo5EnZXyM3NowMs6pZjvGgXJGqIsblBHvgXBwPas2sxMn7XJ6KLSU0Nv9OoHwxdesOZeCpcAIVkinQqxp79Kyf5GbAhoP8Xc7Z%2BeVdr%2F7Tz9IA5ByDHIl5YvETG10pBvJPU1EBDZdmDrZmZMNLGEOywB21BUXJD1iBzB2bk1N8rJ4TKQ0YuVumi4ZqGTZlE3yD4%2BTDNZ1%2BT%2FgMyxOobp5rCgorsyBlUPJa1%2Fb7n3As27tszHuPY7I4c8L1srvfbLiguNG0%2FjFoym%2FDkarTgAKJPMwRkqt%2Faf6C0Nb4p2f0cSpd7bJPL0E0FM%2FzNMpQvzuuglsQjHn%2BDISbeSrvRx3pWG%2BvYT%2BwZ4cDXI2DD%2FT8Le25JxBJRXz19hnEeOk3WG%2FZV590EUFoKG3nv%2BXvtM21hqDy1lmfayGuLMhywKvUFUQ62hrfwQeXtdH2daU2j%2BgCRtrJBBrzZ9%2BLPfTqCsE04%2FW83mEd%2FbU4pTzKy6XcjT0RGAku8rnU8v86DPbUz9Qtu1CVDevB3h4c0yNN1xEWgSPMw0eDhzQY6pgFXgAm6WfXMFxGtZJSB28xtAf5%2B%2B2W5oDg2MNf7ldebgnZ9zGXuqeKbd0dKS3OAvRe9GaTloXQmOLx5AsYx5mhjwqN65xtunKVC6tLtjnDVj7%2Fa17Fv74HT%2BVWmmD0gKVUj6cmkEbaj1ceu%2FcgKSE04Uj2hA7U%2Fs7wpW6wdJfuCTXpO4Z%2FXOPP1gmE%2Ffwa%2BRcoVbLd%2F4Wx7ZVtIhCDKsKc0O36u7pTm&X-Amz-Signature=72d2edf6b9ec8f15c83c5a3e536446596603f4f0d108dff04cae53ba17d9444c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI46XGJJ%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJGMEQCIGVvdBz12fYTkyI8qUjAeiA4xa1OwOGBFiLo%2BKRKoIqgAiA8vdik0JrVrS6w0CoTVQt%2F2rWooymxIIQnGH3rLlh5KiqIBAje%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMiDeUFbYk8GiFEmPEKtwDY9HVF7nTjRVX0jX7o2z%2FTvq5y0w4vtIiEbsTHF7MMgrRLXS4ZcZGfsg1y6Ah0Q%2B8GEC9zHFsO3P2PtwvG9D4smWsRh21JsYXiLo5EnZXyM3NowMs6pZjvGgXJGqIsblBHvgXBwPas2sxMn7XJ6KLSU0Nv9OoHwxdesOZeCpcAIVkinQqxp79Kyf5GbAhoP8Xc7Z%2BeVdr%2F7Tz9IA5ByDHIl5YvETG10pBvJPU1EBDZdmDrZmZMNLGEOywB21BUXJD1iBzB2bk1N8rJ4TKQ0YuVumi4ZqGTZlE3yD4%2BTDNZ1%2BT%2FgMyxOobp5rCgorsyBlUPJa1%2Fb7n3As27tszHuPY7I4c8L1srvfbLiguNG0%2FjFoym%2FDkarTgAKJPMwRkqt%2Faf6C0Nb4p2f0cSpd7bJPL0E0FM%2FzNMpQvzuuglsQjHn%2BDISbeSrvRx3pWG%2BvYT%2BwZ4cDXI2DD%2FT8Le25JxBJRXz19hnEeOk3WG%2FZV590EUFoKG3nv%2BXvtM21hqDy1lmfayGuLMhywKvUFUQ62hrfwQeXtdH2daU2j%2BgCRtrJBBrzZ9%2BLPfTqCsE04%2FW83mEd%2FbU4pTzKy6XcjT0RGAku8rnU8v86DPbUz9Qtu1CVDevB3h4c0yNN1xEWgSPMw0eDhzQY6pgFXgAm6WfXMFxGtZJSB28xtAf5%2B%2B2W5oDg2MNf7ldebgnZ9zGXuqeKbd0dKS3OAvRe9GaTloXQmOLx5AsYx5mhjwqN65xtunKVC6tLtjnDVj7%2Fa17Fv74HT%2BVWmmD0gKVUj6cmkEbaj1ceu%2FcgKSE04Uj2hA7U%2Fs7wpW6wdJfuCTXpO4Z%2FXOPP1gmE%2Ffwa%2BRcoVbLd%2F4Wx7ZVtIhCDKsKc0O36u7pTm&X-Amz-Signature=72d2edf6b9ec8f15c83c5a3e536446596603f4f0d108dff04cae53ba17d9444c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XAWZB2U%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIQC0o%2FggcVPtzEQmrMRgD1ToYB6RLobSsdrmVLg129YvoQIgT%2BYFutSdYGCD0r1U3G8pMUjSgEjETKeYMrJhRkU3LaMqiAQI3v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN8h22g1NBLJODqg%2FyrcAxiqL%2Be0iBWm0quGu0TXR9VECH%2FeniPzFSjnp7VibFTQ%2FlQbcdDxppht%2FVHNBb52IBR2JQBrp%2FF0wQY1M9k18a4wKnoSrnKKwHdiuB6hbuzrFMRS4dCR8%2BaQISoQOA0mQLLx4VVywIxpcGHsMQj6k43inx%2FVCK3dstK95VrSYFCGQ0EgHMB6lZU2vvb9Rg5wL8SK%2BCBe8bGK599i%2FUG%2Bjx8gP7x2g1tJDiBfLHvdCd7k0ZvsxlyG7aA1PPd3pohxnMYjNdy63xUutR5zQjzP%2Ff3j8RnWyde8fGIccRYH68825UCLofvrtUTFMR9tTl8CeK6Fp05rivCehVqxRo0DIRWu3%2BwJYSb7J%2FlOQ4CBjwliN%2BHriEBlRu2xnKKz1Kqja52osSk%2FTDKF%2F5IPT%2BEa%2Bl%2BkClMeUYkjRNhfnmWBE9vKwDZmjj%2BoS1jHyKWesE1uzC0m7bbXtF49WMWmzFxxKy%2F5RtlJmqBP3MFGSXvwOteY3Rd2KVPWn%2BBJ2qXABC1%2BwrWFo8aEetFXvSEAz%2FXf4elDzpNzlF7QQB73DhN7h59lWRAK9qO7Fc61gscSOd5j8pKpsc2bcpvgiqww%2BHcmtNkzJgTuYD7X2GTRQzwbw8Hw3LwMozKmWejErNqRMJTh4c0GOqUBPubPCh6XfzC1gSNlwJ6kdkTI7uV5DEiQX6VYZa0g9oFQj93gmKqhWHft70pzKxI1XWxFAwUPy8LEL9561ZrxXlw6cTYj6heHJCTngP3ncsVUNPrNgMf04IRWkTaTs0ArL8b4KwrMZXdToUmvDaDsVnE2DFQZkzAulXOEUO3jGvImN7P5ADEoViZPQZ%2BN9H6ChDJq5sopts74UR840RiYAInv6i9%2B&X-Amz-Signature=ce9ee74ffb529295f85e70cbdbafc23f84310ae806d0b24414522099b5dc9bba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQLHK6SI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJGMEQCICj8gn3EhdbFayqT06yUxUJsbCWExAgZEF0UK9fJWjhkAiBfQ0E7FJd%2FH8XwlwB0oqiY%2FE3YMFrecK6BSyKpwSxAQyqIBAje%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwP%2B0ZEGtzp8vnpxVKtwDqGmIWvBS1w0DlIkCoXXbKvdQZWdcYDOnp13ZY2kFMkneGNu6vMx%2Bz%2B0xw5cZlNx1Uf3oYuU6TRGR%2BH0edJPp1SO96N7LZmKvZLgmP4blFHXyfWimUmEwIKWqLxIOH8MJx%2BDipwSYHehfSoGVyEqcuzVMXk7FDjXdvS1%2FHoTBVkTeziiIpAiYCwUe2Gv8jfAIkgSNQiPT7bbqso%2BHb5mclLVEUll%2BK6vLb6uSV0osGlcjCvP92qBIlrCzvs0U9l2%2B2sGzDu0o%2FGck6zNbZ174XKjMvXTEKwhVJHPoBB14oisR5xg8QgAvYg%2FcG7%2BEl5k2fPfjgGv2wmK5HfYGZkzIYLbAv4iw96oMoCiXbsRfB9yr6%2FtPNIEiWd4s39tyG1ElBsfceB32XwGrKxkvgJbKr7MLyEhWQ%2Bbs%2FjwYq2mnof%2B8Z5GiyagGShZZV%2FZhKlb4Dz%2FMi37TbLEVF2x2byGhAzt%2Fplkt8YhXobVhgNaQMlGm8PhrsN6BSKvD%2BDn2Trf5LfTTqfSC2SjnX0Nw%2Flhi3trz1fdhPRuKAZD3nFHaPpuDeAc5moSO1W69k0XmCAPXmBkAJN%2FZiCpquoYoEqj725DfrzizukaBVIOjO%2BkvQcW0Mx8xltkNhyNr9MMwjeHhzQY6pgGhElVYki8sN4n7%2Fpzw5LJTUkL0hHYpOpV7GpF98QYkK4L1R4sU1g0vnFJ%2BochXzpRbUuLXy2GfApECBLj%2F%2F%2B%2BbjgpTNZIynqVeTCEI35Puqspx%2BgFfoKK91lvCMb%2FFfcj%2BFMRgFv3%2BCmGkowgtWDW4awa3yWyzQAeKvDVPp3NLjzbUxi5XbW5KYjXaCV%2FgI4Vw%2FDia%2By2PSC4918nymFLSfbvuXNWa&X-Amz-Signature=41d67cf244ee2f42da739986f10701401e9a085ac8c91427d478a1984d034404&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQLHK6SI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJGMEQCICj8gn3EhdbFayqT06yUxUJsbCWExAgZEF0UK9fJWjhkAiBfQ0E7FJd%2FH8XwlwB0oqiY%2FE3YMFrecK6BSyKpwSxAQyqIBAje%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwP%2B0ZEGtzp8vnpxVKtwDqGmIWvBS1w0DlIkCoXXbKvdQZWdcYDOnp13ZY2kFMkneGNu6vMx%2Bz%2B0xw5cZlNx1Uf3oYuU6TRGR%2BH0edJPp1SO96N7LZmKvZLgmP4blFHXyfWimUmEwIKWqLxIOH8MJx%2BDipwSYHehfSoGVyEqcuzVMXk7FDjXdvS1%2FHoTBVkTeziiIpAiYCwUe2Gv8jfAIkgSNQiPT7bbqso%2BHb5mclLVEUll%2BK6vLb6uSV0osGlcjCvP92qBIlrCzvs0U9l2%2B2sGzDu0o%2FGck6zNbZ174XKjMvXTEKwhVJHPoBB14oisR5xg8QgAvYg%2FcG7%2BEl5k2fPfjgGv2wmK5HfYGZkzIYLbAv4iw96oMoCiXbsRfB9yr6%2FtPNIEiWd4s39tyG1ElBsfceB32XwGrKxkvgJbKr7MLyEhWQ%2Bbs%2FjwYq2mnof%2B8Z5GiyagGShZZV%2FZhKlb4Dz%2FMi37TbLEVF2x2byGhAzt%2Fplkt8YhXobVhgNaQMlGm8PhrsN6BSKvD%2BDn2Trf5LfTTqfSC2SjnX0Nw%2Flhi3trz1fdhPRuKAZD3nFHaPpuDeAc5moSO1W69k0XmCAPXmBkAJN%2FZiCpquoYoEqj725DfrzizukaBVIOjO%2BkvQcW0Mx8xltkNhyNr9MMwjeHhzQY6pgGhElVYki8sN4n7%2Fpzw5LJTUkL0hHYpOpV7GpF98QYkK4L1R4sU1g0vnFJ%2BochXzpRbUuLXy2GfApECBLj%2F%2F%2B%2BbjgpTNZIynqVeTCEI35Puqspx%2BgFfoKK91lvCMb%2FFfcj%2BFMRgFv3%2BCmGkowgtWDW4awa3yWyzQAeKvDVPp3NLjzbUxi5XbW5KYjXaCV%2FgI4Vw%2FDia%2By2PSC4918nymFLSfbvuXNWa&X-Amz-Signature=5377494ee7591f3dd060c823005ef91ad8c9980dd2aece75278503af8820dfe6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632XOMFEX%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJGMEQCIQDMrcGAb7Axcccg%2FfJLDAb8YDAOF%2F4G1byc%2FWl9qNMZ7gIfLck%2Fc%2B9Nm9Ac0ukkPlmkKqs0d5JohXczSoB5Pvb51CqIBAje%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2gCRCi%2BhDHZRfOyoKtwD9VQbI8SPefXoxgn%2BHATjbEOUEN%2BvRoqpg0nkilpZp3y0FOJCQz%2FiU3IJ%2F%2Fminl2X7GDNYMwkywGdE7nyv43EHLTyhF%2FamqXhwamNgBQj7qqVK2PIAhyI9zEYaYrpE8rFQhNDbt0LpRzGlzzlPI0h2QGJUy32mkuCvrd3lfHJ%2FNl3HZTzqdaTsrK3wLpGqfXqMbc3Hj2NMaPZHmTZ6a9iTjB1HBMgsGmbnIbkZ0s3fSJQU%2FiPjj4wuht5JRiqi9NFeZn2pWm%2BKwFV8K7ltzJOu3%2FFY6pM7FQq0ek4rJaZxxLhpFWSUFg6GejE80b2EmIt74KnYF0stjxhMqivjntufNAXM66apHsRZni8n9HfBekG5oGo0%2BE%2BBXwxe6Aa9dKr%2F%2BqPCkeSSbdlZ4PtrvexVCBYjznR6E3bXNU3udR4Ho%2FYIl%2Bm0mcF71UEBnM3awLxqxyDKDUpCQ9U2mRPQrKdRRv%2FBHUIasdq2G2MiIm9gNR%2B8WY%2BzoSc3vuK79IXRlIu5fr78JnR%2F9uhrpZfEP7y3TGxedASgXCYYGcorps3gwIbyVMWZ2xf1pwjgzuYTuwzr6HW5Sazho0r3c7FPCQqCiyKSG3IYYGhvzs9pjXXSrwmZOK0udhbbrEJOM8wiODhzQY6pgHph9b1i2UOGI%2FenehIRcOToRZxIw3qcI%2F3Bv10rtWSczM%2BBafFI8wN0Iin0U4ZnwayPh02KztPSKSjqnyGNAeA3zgFW%2FsS2WGfV2Ldtxs6TdwRzmteLHcItgP52CFtuWpOUG8xAmM9UgXnK000KifCJx3LUujsCFOa%2BJIeCKTRFc1Gz15Zd99jLL%2F6OrBcnLPwJyyu6ZUxQgrDrCdasdd3nw3IQn1y&X-Amz-Signature=c31d07aba47216ed3cf7ffa7047fd19c5b9e95639afb5977ee45147c7d1beb08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EQCIOOK%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCICFEjQ9C%2Bm1fakEUbla6bSRWAB5VIEIPtK8d9k9Fbl%2B7AiEA72ijU7uy%2BsnKbR%2BdZpof29EDcq46sONJyhtKLpLUPNQqiAQI3v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIPN%2BuqLznEVpaxF1CrcA5owuhrdiLS4ndeHO7TVSxSBAJyobR3Z1y8o7WJv3wzdxwbizVV%2Flcff%2BI95AHB%2BWW0u5ZvfAF1Dku%2FAr1BdWw6PRViVpliSsKs4shxjxSoMUm70vPU5KNOaNF%2F46YriqGM94%2Fa%2FU9i9vlp08QT3UpvCHp3QoDRqD2jmtIndJdBScL8qIfbwh0eGYn3a%2BdKstw4vm9V6T7myFbTEnWxiO1vli7Wnge8%2Fe5YAWBgC441D710Djk3n1UqeS0oypWqtFVHaGQ5Wlu%2Fms%2BgSyjGMq5d8vcZQZxZ%2FFq7UHbntpyWDAP0S2sm2VilbW1tDhDnhPGONWvZkRFCZgnUC6sZPIm4F4Z76f534zzFxzp6TErxH720lOHyBSS8jBcfs5%2FitjahkysurNWhri5FCY5myE1xR5X2qDObUuvQOCZbqyYTl00i6wHD5Ktbe4hBA93GFvBtFfVtezEbK29jsK8EO%2FltRnlpJs4cy6jPxr2a4zMHuQfJruKGECP%2F5rtAJZDyObS5Wm2oShTZcyH8lUWL6tWsKAKM6Ybt%2FQu8KkWVKJ753hAWWpHuYmuPI4qL2%2BOQI5L6sLM1LHOiycP0um4NAuGtuU9o%2FDgwvN5zH1oXbWCrRllmInYL3NP9QKFVvMJXi4c0GOqUBYYuI%2F%2B3scxvHniPCY3o1CMbFnyk%2FfRYHgJkIoUwxiyix1W5OeKcP7TgQvJEYBsBKHs%2FzXFmN169rksovovkoj7eP1nbwXQZPp8AjofdsZe25UWe9wfC6ufH3ODXO%2Fsm40ibdgVGMBs%2B4Dcx2DlbyZoeY7utHXFVZH5FXEhyPkAlN%2F%2BulmSHwO2ae95cD%2BGWDLh5mCkCTwRNcjUHoPpgNIA%2FKZP2P&X-Amz-Signature=cdfc729527fbf88bf341fa9ae03b23d3af6ff255567b4b8938f7f158bbffe1bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VMUKMBH%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIQCnie4QKnTtgNmEQha2yiQiAUzGci746Y8GxZLnS5WG9AIgfMe8dYfZCVOF0WMkmDMcR8%2BwSx4m6YkfFtKXr6ct18cqiAQI3v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDCeCf7lfYKKtju4JyrcAx%2BdBNd8cs8%2BZCHX3p6hy3faL5TmL5%2B9ijLEKJ3ys0THFtuDPlY9HNsJeZc%2Bi1JxUJuyVaa42cCStlKGiF5FV%2B9vuKk8j16r%2F6h9ZU2pzrhj4ONr3WYp3u037OzWrXCyxbF8J32bV7hkROZMBSCFxKqEG9f5hAzK9jas0D8pDD8MEyu252skHyN%2F0TDRR9GUS673NcrPlF9PKk1OLU0agnpjKXxexi0ROKPC67oDRzuh%2BEs7eCAXXZ%2FbrUsyyCjSA3BvErpEeB1vI1Uhn83nP6zsNVQljXunLYQaGgOxv23mFkUcrodAZ1%2BoqpYlvcspFgpicXEj4EY42Rek8RGirQXsFMsTzR%2FCsRwxormhlVnMt703l4psjIhugPc3Qi%2Fyr1U3bqkMDwbQO3UAbMgJLnaPfxj18ngMm62ER2bWq8wY5bnda0nTXyLvb1E6jOZRK3UhJumitBmN1cNZHPhyv6tPuSQCoEJBxdYB33mDnjVcMH2xv1pqRaq0rfDueavb8QEbp8ZCpx49uvIQuBOrA3qQVkjxHTo5EkrjhptX0kUgBX2uYodScIiCXjIaWrLjED7c4JsvUgZb7MqicolQTOmOgIiAAKZvFQMFVzIp9ewoLqGJZOfLjZj4pgc7MKHg4c0GOqUBb8rLsMn7x49cAx6orOUZqe%2BNiL05MYU%2BYSKzbI14YFcwtzvPgdHQ1HQcoLVFSmjTrkgMy0Clb8Sbvf58dtoaOEjWhODHCBBRClXkrOSEoULIaEr3ciW8bRcbcfpy78%2BTxjdGU9w67pMGdvrSYlYUhVP6Cvt63kTegRLpI9XG7%2FpSxEZ49Y3UCs2QDA5iyyY7oh6WA80aaszMACqSnrsaoF%2Fxrq0k&X-Amz-Signature=4a393054a659ab14ee7ac1c98b403391e8c601f1b5e41e1556a51a6d2cb199bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2F6ASEI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJGMEQCIAgwCBLSnoZ2CfXfd%2BBATKiaSPJA7zq4QY9qLl1PuLwQAiBvFNzkvsm5aH7KCqN%2BTnWPpA%2Bqk1HB%2B07nK91M98PXKiqIBAje%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMR%2B4%2BYH%2FNzC0OBshJKtwD5gcQlntSj%2FsDJF3ZnvoMUU%2FWUoyC0HNXoyEjeDL5%2BaBeSr5xE%2B316HSLnvCfS2xIy031bJB6VUZXLICm%2B0xXMIeq%2F2nEVbZT6HdHf1RPrEL3fKSw0KGuEHGZWSobl9uO71eZdVJwUH7%2B2j%2FOLO1SUjClefbqwzZpFAJzUprZWcT5BNrAJEylhcNIFb9EF3ZxdoRKBCOiZHTORDiNAXsgDg4%2FQUN2cf9SotOioKXBG%2FyELBumgIwPuDrAQ9pteZsZgxc1SAqlk0wuAhHXTizGVXqxIiDSaSzu%2BiNN5KyT5t6Aq1Sh4eFUhXhq91hzhmVQhGsXNR2xI2eo8gnyC6B2BeJc6tpmMMWtIFvUnaWOBIi%2BwdTW14Tw9OBK6eUTFlblVUI8dYjn3w1rXPK9q7zEA8Idhir6%2FI3%2BzexgtqLz6blU8xmNNrbnxd0yzwZkCZlQcGzKdVKrz4UxQaxyF7haVUvcFNdRWf2uWMPvbRgwSKV%2BHBAMvUaSs3t2jHJQiYPUOG7Yill8wXC6xPt1HbWoufGjNjJnmCBnO4MEwUhJ6UFamg5bez4H4vSjEb8cfAKBCRA6Icw9DtDIqnVMls8taPUEzz53eziu%2BxXswxoIRndH%2F3MYrOee5OiN%2BEUw5%2BHhzQY6pgEusCXSUGH%2FLXta2wUEVPFSranxK5EARRRhI%2BSRmAmSotCAecDZjEgSR5oOtnlqIStPohTJtnDUyo3tDc9oez9JgacQEYY%2B1TNI7QMLpKiW%2BMF%2BOsMVtYyzSqn6zKDOWYwMJdfKMlHYSyVjy3NYWH3OIuZbyZdDgoGG3AA00hK8bfAmW4JEr2N4TJyGl0WxrRFbOTxOb26dNJPVu03ZLg6j30t7Ljsv&X-Amz-Signature=f27cf8a23f5ef7e52f38618b05e5803031feb71a39ef520da6c890c86d988402&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2F6ASEI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJGMEQCIAgwCBLSnoZ2CfXfd%2BBATKiaSPJA7zq4QY9qLl1PuLwQAiBvFNzkvsm5aH7KCqN%2BTnWPpA%2Bqk1HB%2B07nK91M98PXKiqIBAje%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMR%2B4%2BYH%2FNzC0OBshJKtwD5gcQlntSj%2FsDJF3ZnvoMUU%2FWUoyC0HNXoyEjeDL5%2BaBeSr5xE%2B316HSLnvCfS2xIy031bJB6VUZXLICm%2B0xXMIeq%2F2nEVbZT6HdHf1RPrEL3fKSw0KGuEHGZWSobl9uO71eZdVJwUH7%2B2j%2FOLO1SUjClefbqwzZpFAJzUprZWcT5BNrAJEylhcNIFb9EF3ZxdoRKBCOiZHTORDiNAXsgDg4%2FQUN2cf9SotOioKXBG%2FyELBumgIwPuDrAQ9pteZsZgxc1SAqlk0wuAhHXTizGVXqxIiDSaSzu%2BiNN5KyT5t6Aq1Sh4eFUhXhq91hzhmVQhGsXNR2xI2eo8gnyC6B2BeJc6tpmMMWtIFvUnaWOBIi%2BwdTW14Tw9OBK6eUTFlblVUI8dYjn3w1rXPK9q7zEA8Idhir6%2FI3%2BzexgtqLz6blU8xmNNrbnxd0yzwZkCZlQcGzKdVKrz4UxQaxyF7haVUvcFNdRWf2uWMPvbRgwSKV%2BHBAMvUaSs3t2jHJQiYPUOG7Yill8wXC6xPt1HbWoufGjNjJnmCBnO4MEwUhJ6UFamg5bez4H4vSjEb8cfAKBCRA6Icw9DtDIqnVMls8taPUEzz53eziu%2BxXswxoIRndH%2F3MYrOee5OiN%2BEUw5%2BHhzQY6pgEusCXSUGH%2FLXta2wUEVPFSranxK5EARRRhI%2BSRmAmSotCAecDZjEgSR5oOtnlqIStPohTJtnDUyo3tDc9oez9JgacQEYY%2B1TNI7QMLpKiW%2BMF%2BOsMVtYyzSqn6zKDOWYwMJdfKMlHYSyVjy3NYWH3OIuZbyZdDgoGG3AA00hK8bfAmW4JEr2N4TJyGl0WxrRFbOTxOb26dNJPVu03ZLg6j30t7Ljsv&X-Amz-Signature=0f7212168eaced3370ee1bf499b953e507aaba20d18c5c9de4339e32a7e1bbbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JUTR27S%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJIMEYCIQCbC5aXm01Qb4sfo50gzmkJg9m8yyAfGLOLcBGp4Z8rOQIhAKY3wCds8SEAaXnI7Y0byg3Y%2Bw28gs3fejGLtGwMgko0KogECN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIKu0Rfo%2FvhV6%2BoUMq3AOl6Q%2B%2BS%2FOM3Gz6lU9WgRT7r67TZVMVR41%2BQbEhaqO8%2Bo%2FZp55IO9fgz21X1BiurLRTek74Hff2A%2F%2BLEz2zB8wZ66V2lpvRLmVG8o6ZxUKZ7YgNYQZZuHltAoXgdWtwzmhE%2B6%2FHziECGtfET2AI1l1S8hx4%2BvTAceikRT%2FKvyg8kYycr%2B9xEN%2F4l6xtIOESMZB9v41NbdG%2BHma4slMm5k0vjTHGoTXIMn9VHvNNj9%2BSeJSspfngb91GEso%2FOrYdVobMDxdK%2B6tg%2FGAV2hZmm7UTGxheKt4HLGDwZYSwCcb1aoSnS4rdgzbLaZTt32jn2opxyJ6MoL5tj09uqUHtCJLqMVHtjkyeo6kUlsKL6auH45dUupgt6PsoSj0bLLJQ%2FnQHT7NQa6pxDmLupWvgTAzNa7TNz3O7pb6YNcPcDF8ABzTUHK436o8lJb4rAYWPMFFLDWI8knDHbM60rtbC9l7CCjeVEEC6DH%2Bxc0B%2FvIaZNXai4cHwWpm%2FGlHrM8VA1SBBqNrGAjVjONROx4WnvlXJ4HlORD%2BCKXoVAG%2BqxY8zvOPhG%2B8lnaEvBNpg9e0bu9Ehn9rfUOY4U2dlMP%2FPFpKvmR9cy%2BDK0B9x1OZbi3CTZR7cIPNzjrb9cHX3PjCP4uHNBjqkAYO5C%2BSEVrrb9wXZ4sdY9l9ONjpiYyrrLEARO15KLCaQWu5pZEGiExel643z4Smr13UCYczm8knT6wC2Su1VU%2F%2FmaFPtLvfjmb0r1ufyvUYDAvqNKWteFpxcoz0%2FYeMqs%2BhOVn%2BryJ3pCeuDYcLH8aPARLtmZOlZifXXwP2U7GvWwrURHFj1I4y3rxYnVOBQ3Jb3WpDiSRam4Rh2Q6PGZMbbz515&X-Amz-Signature=97c8f1876c43ed462f22f3de570396acc6b9ea5bd9535303fe5cb24d143bbfc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEVJ4PPO%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIGziIHq4D7k6j2UdG2vS77sTNh2LepKC5IDfxU%2FscXVCAiEAjiSuG%2FzVqP5gIgOCj6Nm5ACwRl3jxTEbD5uIP3oR3CwqiAQI3v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLTKZqyrba%2FYZR90qircAyvFzCtKCj26IY2hB8mh%2B0WNheQYOxOdWmi6yaU4SH%2B2ldJTYg6dh9uQTwdIRqrUkN3U%2BKPNCaArMK%2FUanNV5Ci%2B5ImtRBn8m7APjvVee2dN%2BAb5WGLLSD6f5V5tGsV2uLeqv2loIV5B20PmljyhLnIsQMdntkEXKKUtD1Q%2Bk7qF9hLPRzPBOcgXxCvxK0FX%2FgkpwglzJo7AuuFGPUJmphAo73ROW5AGaLKAGO6InjYBQz%2FNQAZQr%2F6iihh5IvUfVznVSQGCBzDlXoZnidmsAN1LEZSybE9x75GPFl0tAsJs%2BgaldVwkDeNfGsCdfq1rsesms8bEAkKp5YF5e3y439NMolPEFxnHG8BiXkheojyMDnlI3uiVETr2dHWKFhg8AKZ6cnFIqVrhDh%2FVgrMYbY7jAw5o2krL9%2F7axsWIV%2BdyR73ASP7%2B%2BqtnWzZcv1d2O5cv9wrIfgDGHZZQZ%2Fi4cMQF%2Fw8YggaCbP8djX%2FK%2B3DopB0QwuAPvFNzKpWigpwoWqwqSM%2F5tTZ%2FF2NqVDik1eZg1nVXp8RdFA9OpONuLz6YqxtxVoBoQ3XBA%2BXdZaDx0a86kDwN8YPVgi0CFx98nKbWWl3Lj2lyTE4UYSEFWPdJEygQLXdj%2FNeAgn9JMNHh4c0GOqUBOrYnvF65Woq3WpaihGVRqtdWsTo1XjdT%2By6qMXOdLSdntqXvB3EOnEX9KgGpeW0ZcaIFjBxSKnv6E1I4npKJ79vSr3DW9OlSd0zrqKSUrPWPwXexUEbdZj7x5Q3eONnAIrgOC9aK4IbOBEN0Jz%2F%2FaBlL4z%2BAKS%2B4Y3PJW2sMHNkWDGnffJxLlZv3ppnjq6IwOYz2Y4x6i6Oou3LBTqHGPNLiOXrE&X-Amz-Signature=6ba52f7d7c1d65cd038991f25494dd0b3b6b7a1b2f44127d7fb9dd344d6946ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEVJ4PPO%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIGziIHq4D7k6j2UdG2vS77sTNh2LepKC5IDfxU%2FscXVCAiEAjiSuG%2FzVqP5gIgOCj6Nm5ACwRl3jxTEbD5uIP3oR3CwqiAQI3v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLTKZqyrba%2FYZR90qircAyvFzCtKCj26IY2hB8mh%2B0WNheQYOxOdWmi6yaU4SH%2B2ldJTYg6dh9uQTwdIRqrUkN3U%2BKPNCaArMK%2FUanNV5Ci%2B5ImtRBn8m7APjvVee2dN%2BAb5WGLLSD6f5V5tGsV2uLeqv2loIV5B20PmljyhLnIsQMdntkEXKKUtD1Q%2Bk7qF9hLPRzPBOcgXxCvxK0FX%2FgkpwglzJo7AuuFGPUJmphAo73ROW5AGaLKAGO6InjYBQz%2FNQAZQr%2F6iihh5IvUfVznVSQGCBzDlXoZnidmsAN1LEZSybE9x75GPFl0tAsJs%2BgaldVwkDeNfGsCdfq1rsesms8bEAkKp5YF5e3y439NMolPEFxnHG8BiXkheojyMDnlI3uiVETr2dHWKFhg8AKZ6cnFIqVrhDh%2FVgrMYbY7jAw5o2krL9%2F7axsWIV%2BdyR73ASP7%2B%2BqtnWzZcv1d2O5cv9wrIfgDGHZZQZ%2Fi4cMQF%2Fw8YggaCbP8djX%2FK%2B3DopB0QwuAPvFNzKpWigpwoWqwqSM%2F5tTZ%2FF2NqVDik1eZg1nVXp8RdFA9OpONuLz6YqxtxVoBoQ3XBA%2BXdZaDx0a86kDwN8YPVgi0CFx98nKbWWl3Lj2lyTE4UYSEFWPdJEygQLXdj%2FNeAgn9JMNHh4c0GOqUBOrYnvF65Woq3WpaihGVRqtdWsTo1XjdT%2By6qMXOdLSdntqXvB3EOnEX9KgGpeW0ZcaIFjBxSKnv6E1I4npKJ79vSr3DW9OlSd0zrqKSUrPWPwXexUEbdZj7x5Q3eONnAIrgOC9aK4IbOBEN0Jz%2F%2FaBlL4z%2BAKS%2B4Y3PJW2sMHNkWDGnffJxLlZv3ppnjq6IwOYz2Y4x6i6Oou3LBTqHGPNLiOXrE&X-Amz-Signature=6ba52f7d7c1d65cd038991f25494dd0b3b6b7a1b2f44127d7fb9dd344d6946ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOPJAAUM%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T212544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIQD0K6AOicyHyqW8p1UUIYThEgtB8TExYKupDuea2532DwIgRhWeNianRnMoobvxC4L0IlHyAqYkGarJpt0ujb20CyoqiAQI3v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDANlmpDCxlQvGTjJdSrcAylgpPIt7hXuX3M1gCIlgmKKKebTICYd9cy9SIAgjG%2BmXhUstT%2BDoaZHqgbqvnzAovsA%2F0cqYB%2BhrdLEEkhDNU5Np%2Fk9XAFB9qgwidIIzmM6MNoHqdKaFxD9odzsEbnXgUJmRqd%2F30xMNtqbHPrAhMzDQT%2BO4OeQDyuDWRK4EkLdXz5UDJXoVCa8a4%2BTbKv6TruIbLMgO1ZgRq%2F9DPExpJbzcDfV8dk57Uek42DxBAqStoyYrMWZf6MmwOdmfBvRSLGXdKq4iQSatjc2jFFVBD5L%2BAV2AJsQnbNUVxCe6qn3OGlabQJsMWFlkLDbGCOBcb%2FRVmIoJMOEEgGGAtEuB7H3Lc8nl0isVAdLlFgEiu2Y2thbj5pzhMzJ%2BUk0X4pGWQhHRh0KQXDelVq2uggiQwiZHWO2jvUehi7yppZ1LmjtAH2tT9NEFI%2B2Rs3sWTEF333tU5ovGlukTPwe8TDTwBmWM6OZ6X8m9XOOCA8znMMA%2B5wNLl%2BdL8sFS%2FW4WCpaNSv2auDJOa2GyfGXoPwXFOhEeijhXtTxTfq1P3wDfG%2BUSg7j2ZKA1J%2B%2B0owQmExBxAdWf1tUwBBnVvDouorg7orZp5hKyM%2Fmbr%2B3yovVJ4z3RxnBQp8jE4kjwg%2BTMJ3g4c0GOqUB7IvhnPqxF6yJVU%2FdzzBZQlstoc%2FfL4991ROjC%2B4vw%2BjHTXlwwYWWCfYVc6BrG%2BH71aKpQxtmjuMtw%2B%2FIdiey9xXZkrqW6dV%2BwlNuNib2Ply2qlZvrBxx5uj9hoJp8dKbWSGKA%2FYtO6J8QMG8Jyt1jngrLEeEh10nLTnd8vWv9hCB1s2ZLzvaV5WOobSUwkCe48u6JT%2BSjNkZ4sx4anailGqrK0uF&X-Amz-Signature=b96e8e8cf966983db10e791ee522d9b5e2b82cc98b2c9473a91c7b4982fec867&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

