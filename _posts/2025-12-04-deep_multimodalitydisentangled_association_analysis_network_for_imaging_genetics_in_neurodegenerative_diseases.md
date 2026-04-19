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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XRFPURK%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQCrzRGlIkJK2vUwWhrqPJmTEPc0dfMFl3bkvD7tTsXp4wIgHye1aDKONz8hlvL8oYbId%2BNfAJiydaHJ7n02a7e8%2B%2Fwq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDGuK5Et7iZK9x2iOIircAzKhYB4laxyqZv%2FwHClU%2F8UWwl1VmihOq4Ump7QHRql6Xpo04HEx2nbq45A3kfTjIOnEoLhgKzDUhw2DurVUh5AgD91nPQXPBo6VAJYdsqUyfo2FmVh45he%2FOaPcWkNeWMqFo17A%2BuQDrqiYv0m7IetMU6NtKovPwBklvThp5JU%2BFC8IYF%2BRhzeZC2I9Te2KzIxrnI%2FXRe8JcA7Fks6txbC%2FTtji%2FbvzUu8Eg995z3bgYmDb9%2Bb9K1pHz3dmbg9ngJqrAF1k7YJIqQnIwCsXLipRwAo4NtXUb1FVad6iLuK425BvVIBRm3gQM%2FIyMJ0ms94D2eYOwQocF5QyJmwFfX6TvmjnD5LA4hDJBhfg0e%2FmuRE8GadXpJC5uRR8%2FmgtLYXmgCkpqaUNAKI%2BGH4oFRoopXuHNMTxBW8ZWpmafOyhj%2BS90RtnMsvCOan4A5cztqKjVesp75CCl1zJlTB4HRxkrLaGjFcoKS5l6RqMiZbrsL6EEyweJvSZTR0RoOpgOM2dB8Wp3u3hSD8RL00nb37DoH%2FLQOomq5NLoBWtlEAVa9AVoVvRQDl5il7NrmCvZqfYO%2BpfIJuPa3OF65GbTMp%2BE5w1KaJrVsiUKV4lLqfOc0gmOCuH%2By4Pf5U0MMSrlc8GOqUBY1OwCmcNpYFznrGcgTJxq1vuZKNvciBCUS9YbH%2Bft0ygvqrF5LYUv846q0TukzM4AhKJmi1BywOMD7uBVXXvJ3yEuoWIIjGLSiPI4CQTiLFrhSCDLo5XNPFCDRRCNJBL1PxpkrRyVURMxXTGaPRc6DJHGxEzoo4wy4ARMQe4nuU1pA0aFi3QXqy4vG7UbHC%2BEgeMH0ldl3UGQZWhHE8H4CCP31RV&X-Amz-Signature=bb0306d2ddf8f3b07d5727f0054f4bda0b2e42a7a0acc07f2062026114b3667a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XRFPURK%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQCrzRGlIkJK2vUwWhrqPJmTEPc0dfMFl3bkvD7tTsXp4wIgHye1aDKONz8hlvL8oYbId%2BNfAJiydaHJ7n02a7e8%2B%2Fwq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDGuK5Et7iZK9x2iOIircAzKhYB4laxyqZv%2FwHClU%2F8UWwl1VmihOq4Ump7QHRql6Xpo04HEx2nbq45A3kfTjIOnEoLhgKzDUhw2DurVUh5AgD91nPQXPBo6VAJYdsqUyfo2FmVh45he%2FOaPcWkNeWMqFo17A%2BuQDrqiYv0m7IetMU6NtKovPwBklvThp5JU%2BFC8IYF%2BRhzeZC2I9Te2KzIxrnI%2FXRe8JcA7Fks6txbC%2FTtji%2FbvzUu8Eg995z3bgYmDb9%2Bb9K1pHz3dmbg9ngJqrAF1k7YJIqQnIwCsXLipRwAo4NtXUb1FVad6iLuK425BvVIBRm3gQM%2FIyMJ0ms94D2eYOwQocF5QyJmwFfX6TvmjnD5LA4hDJBhfg0e%2FmuRE8GadXpJC5uRR8%2FmgtLYXmgCkpqaUNAKI%2BGH4oFRoopXuHNMTxBW8ZWpmafOyhj%2BS90RtnMsvCOan4A5cztqKjVesp75CCl1zJlTB4HRxkrLaGjFcoKS5l6RqMiZbrsL6EEyweJvSZTR0RoOpgOM2dB8Wp3u3hSD8RL00nb37DoH%2FLQOomq5NLoBWtlEAVa9AVoVvRQDl5il7NrmCvZqfYO%2BpfIJuPa3OF65GbTMp%2BE5w1KaJrVsiUKV4lLqfOc0gmOCuH%2By4Pf5U0MMSrlc8GOqUBY1OwCmcNpYFznrGcgTJxq1vuZKNvciBCUS9YbH%2Bft0ygvqrF5LYUv846q0TukzM4AhKJmi1BywOMD7uBVXXvJ3yEuoWIIjGLSiPI4CQTiLFrhSCDLo5XNPFCDRRCNJBL1PxpkrRyVURMxXTGaPRc6DJHGxEzoo4wy4ARMQe4nuU1pA0aFi3QXqy4vG7UbHC%2BEgeMH0ldl3UGQZWhHE8H4CCP31RV&X-Amz-Signature=bb0306d2ddf8f3b07d5727f0054f4bda0b2e42a7a0acc07f2062026114b3667a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJ6LOAUM%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDUD7nDB0aBGYg9N2KaCasz%2Fyyyjos5GUFgSUdEEZ7STwIhAOmRS7fTApmHySf7pMIiXIHAEFgWweiIgzsWG5xI4GxOKv8DCA8QABoMNjM3NDIzMTgzODA1IgwGx%2FAEPdCrJSte9Z8q3APW5%2FMovJAsavQyADPlRK1SrG4fMhcLPEb8OA8c9V0RvjCu3SYXY57pG6GWjWeUA7hULE0oYEb0lXLTmFLJwWxo6kMJiff5r2OBw9wGPfj1Jf2qNdhnPntsxEj5RfPA2irljGnp9jfP2eJp8GuR0w5KqUNHlJwMnb30wWpb6S2KOXVwBk7sqvxadvVdz3LU0IO%2F3%2F0VJyl8f0QCrpnbhyJhpYCZrKT2sZ5BY1muQcXcj2Piv%2FxzQEbk5d%2FHorc46KjVQqUaIfTUiLtBd%2BgYH9%2FN%2BsSKzJN%2BWiGfm%2B6CaGEgq5fDt%2F9Wg%2FJzH1NEiT94j1HPrXld2bgQ084a81gw0PH9CygDqWybvKu6MgS%2BvIQQnw9PpqYtviyrUIeqovPRnHh%2BcUGadfWTwTqr2dfncd1brEHwrUsKEWHw9tOr%2BOjH6HAUsvWCkv%2FeQKDCpdieiVdOQHZAJMgOpWcea2r9nGJMaloMdjzpeK8bTFzKi0QEojs5NJX1zz713x5hvHcMq6uTjPt19cqIseRetZnLYX1W4gLwOPrZcZWuhXCC9zR0vwYoIcGukC7E8n%2BhtCzI0Euk75bccQr9J%2BAdWVFEYVL0gw9d%2FwicXnwDwMSAV1nACmnTT9joLd7uAh2DLzDJrZXPBjqkAYJ2YgeF7GSxv508soJ4LpJ6VB1z%2BrfslCzszDCG0hiPoZ62Lm%2Bbl1VxyHTYuJanm4YqB4DLm7S5z3o5fWwejwNU2g%2BWILrRNIN5PXVHr9kYFJaCo4LM6HLcAN%2Fz9oiz9uvx4nT2PHIweeRo8iSw9OEh4a0LJp3lNrJjNh9zVWuDPlZztWO3spfuC651v5aCyRykzGqmnjLZeKE1KRtX3AJcr5UK&X-Amz-Signature=dd6149745c1041a306e710fab50a4bb60eb741eb398be04611278e30d2e79dc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUIBA642%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIAIrXATZlGXSfLkwclb5lqdNwsytdPE2Ck%2BOYGgAW93sAiBjnupXKpAFeMqI0fkfqYK%2BlAvSScVu0%2Bfyp9I5NkSYNCr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMYQ8Hsa8438Pst3PtKtwDFrG4H%2BM8v1gt76YQcnl%2B0kQIWIo75byXws6GH0uPa%2Bozdp1bxbyBcms6I%2BKoE2Q%2FOVFalmhU0lrx8KVPsDAS8zzR1NeD14p4v65kmtzTWCnrIIhYCfJy0ZNzb%2FO6fzpe3vohDevOps2JxhKB3PpI417bHNLvNVvnkGdT2IUJbSWcY%2BlErPzW0PSBdio5abQy2QX4hUzlfkeAGEwIr4SwN0wXMwqK945Mapj6t0gsjSwW9zxgsxtCV%2FKtNZsXqX1qQ7sCPJCurpGiYjLfSYWyJapckhV9QLrJTqWS%2FxxTWc3Qxg4qq2EYlctF3%2FZgq4TgL%2F%2BpI6d2hqTaodYeWitdhMzZwH7a6q%2Bzmk1z0xmqecxTkp1dX6XCy8Lbif8RXkX288tSTTV4pBltov1jBXDI%2BCsBNtJJMYNsWYHL7YyfEM3xKgX%2Ff8VDwSd3F8X2rGYdBkdDeeoCDqK96gzmUgxHVRw25W3B3JSRDG%2B6OxlpdgKxs147MPKses76h7kfiwlHSVju%2BsU4c5umJivR5DU4Q6vxUMGvZrxkvw%2FSKJXil%2BCQogZqVmXpEJxta2Xt2a8htGQBpekxD7aR1JEXAFYBgGJAwqkuCv0dNKCIdzlAmEZdUAZJ7G7ZHMu5aEQwtauVzwY6pgHt%2BN28Hy%2FiIW1r3pm6%2BJ1LpUAvGPJPgrLlI7MEXJPmqo1Htos18HUQumqkmcjhTMnh1WzOPiyLOXHSmoiwnyk4CTIbLhkwb5gNFP19l0lSCTPqUtfj2HR8Lv8bldArmap%2Bemb2vM%2BBTiFWbC9D6C1K%2B62mlOroRU%2Fr1leDbMZNiuxNpvA5B7Oai7mTgSaAHTQdtjIxyyCFwHB5r%2FMCjy7qQ6IFPyx9&X-Amz-Signature=a3e88db0f5a9294df263d851aad612c37a6594f62de89d61dc86621e9701431d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUIBA642%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIAIrXATZlGXSfLkwclb5lqdNwsytdPE2Ck%2BOYGgAW93sAiBjnupXKpAFeMqI0fkfqYK%2BlAvSScVu0%2Bfyp9I5NkSYNCr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMYQ8Hsa8438Pst3PtKtwDFrG4H%2BM8v1gt76YQcnl%2B0kQIWIo75byXws6GH0uPa%2Bozdp1bxbyBcms6I%2BKoE2Q%2FOVFalmhU0lrx8KVPsDAS8zzR1NeD14p4v65kmtzTWCnrIIhYCfJy0ZNzb%2FO6fzpe3vohDevOps2JxhKB3PpI417bHNLvNVvnkGdT2IUJbSWcY%2BlErPzW0PSBdio5abQy2QX4hUzlfkeAGEwIr4SwN0wXMwqK945Mapj6t0gsjSwW9zxgsxtCV%2FKtNZsXqX1qQ7sCPJCurpGiYjLfSYWyJapckhV9QLrJTqWS%2FxxTWc3Qxg4qq2EYlctF3%2FZgq4TgL%2F%2BpI6d2hqTaodYeWitdhMzZwH7a6q%2Bzmk1z0xmqecxTkp1dX6XCy8Lbif8RXkX288tSTTV4pBltov1jBXDI%2BCsBNtJJMYNsWYHL7YyfEM3xKgX%2Ff8VDwSd3F8X2rGYdBkdDeeoCDqK96gzmUgxHVRw25W3B3JSRDG%2B6OxlpdgKxs147MPKses76h7kfiwlHSVju%2BsU4c5umJivR5DU4Q6vxUMGvZrxkvw%2FSKJXil%2BCQogZqVmXpEJxta2Xt2a8htGQBpekxD7aR1JEXAFYBgGJAwqkuCv0dNKCIdzlAmEZdUAZJ7G7ZHMu5aEQwtauVzwY6pgHt%2BN28Hy%2FiIW1r3pm6%2BJ1LpUAvGPJPgrLlI7MEXJPmqo1Htos18HUQumqkmcjhTMnh1WzOPiyLOXHSmoiwnyk4CTIbLhkwb5gNFP19l0lSCTPqUtfj2HR8Lv8bldArmap%2Bemb2vM%2BBTiFWbC9D6C1K%2B62mlOroRU%2Fr1leDbMZNiuxNpvA5B7Oai7mTgSaAHTQdtjIxyyCFwHB5r%2FMCjy7qQ6IFPyx9&X-Amz-Signature=dc894bdf99989b5a999255e17c4fdebb23c9a224651ae837699ff504439aa96e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DS3ZAV4%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIGLS56DqFn3DxHAV43aRFMH0fhglpGZfqNZTZ5%2B57zo6AiAlxarX2G2YjXznR6ZdCtVicZSpbr99nlF%2B7rB7FtToZSr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMkDUnQ8OJ2KAzNlMVKtwDnFq6xQWqM%2BAJ5Ni3LqK1sLP2fpIezD7eAbZsoWh%2FjDkgR%2FYSB86K09%2FlbqWjHAbJO9stCtBnOatW4hHEwjBhCO20Pl5G36Qy%2F2eKFssLRWEx1niEyptH9WERRfXfKC%2BW%2FsCQiXk8Gq0x88GM1uIuEtjDf1t4LHvxuMSKx7pP3l4y4rZ4lt5kOTQUeWRyviWbGTcMTNDU%2BuQyFGDqR08j%2FfAO5D6iDjbWcbMdoVOiyr9rUPOdZ9SJfUmd5ykmfzP7xdjMyh7%2FmkjoNT6LsiwAXCeoXnEsW7vskQ4ejaceVcL5m1eO4SUAV0dDnDaAet4s1BUINmhF2dY6AHSW5X7ns8YqzfAF%2FJ3yOK9cAccjw81d8EC1n%2BTfF6J5uwc5grQ7%2FQ0%2F8d4ZnJ5bpaSQpvahNy%2BnCUI6%2FLs4p1dBgom6nUmHuBwRpfq3z74WcbUUTZU0CdSfobZNhqYLhExI0dXn2nSW66kULTfbETc%2BWfWsVEi5qeihChgG2J%2FTNt8s2SVbsaODqFXc9UAq5HzO4AtApgolnMFc2SQJpzGEA85kWHU6U8HH4c%2BgGnh3Hb2K7NhMDBg%2FuRfRnfcgmpO1B47BeDBHtu0b6q6LCxwuU%2F%2FUSts4wRiy%2B0Qo086TyhowyquVzwY6pgGRH9jfUblhcUHtBXZzCeJBQkz5WsMORcI%2BT2d31UIc6vBLTS2HlR4zgQbSnYsvvm5eiYIWwHu5znIxsj0%2B5wbJQGyJaGQWffP%2FAam7Gj4N7XiD7%2F3OW5%2B%2F837J%2BBFejOA2FWmIlybq6wQdtTKSIH%2Fo4L8dl4pegU%2B3NbAaBjnl4%2BspgeuVI%2FEiZOL2aVwooKgy7PHi1ROt%2FcVC0XzvqUEnmFzmrBNh&X-Amz-Signature=a04fdfb0ca3f745c17604f7582814ac54aaae67eba1d51ce34d71370c1c2adce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633RCKXNJ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQDPBnbfG%2Ft7JyCaYNOHj9YZULsCGf1upP0UYQ6pe8s0MgIgVnkq3k2Bun%2FIJI2lVrSESoFdyTkk%2FNS%2B5wzmPTODSZYq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDOLq5SbIOds%2BZ49DtircA6gVhpHpqnTXZxOXCHMUsnHwvhsJMeaX5BVIkm7WidbxiZ8sdXXLeYBqrtWElVOciscBXK%2FGgy0U8%2BgqNe1r1j7sCeOATZ98NX%2Fv9%2BOjAdD%2BXOVtP1cEMOFlmuDI063i0R8GDQxdtcVzrd5AyW0xiof7IxcpzLcHqPIrOYY%2FFeX%2FpFyJcdgCrxdvIxdifYn1%2BnMGdB1PBPVr0%2FKxIAsS7lftLPAQ9JymMD%2FyIwBbntb%2BJZr4PgRi4IQkm65Yj1wGHC%2Bte9s8DI990Ff26nB3z3ywOxMSsTkZVE7%2Bw%2F0LlZyKpMku97h5C6oXVFTpeeFBQm4%2BP598UpU6itcO7PyTK%2FjMb2hMijDJ%2BzXTlMARASgouwohg8WEcfak1BTpUcboKdqYG0LW%2BgIOFq2tFeiVH6Aoxsg3cnRx5mJ9M%2BWjBxjjL1OS%2FMPZMbn8bjuSlxOxM2KhGxcx2R25sanncUhe%2B0%2BIBPG3U98QbJuXRqBkZ3%2Fi6nJ1drpDwMueQ%2Fo25YHZEf7wIy%2BG95ZbSVXEGYW5q1GmG7vT65v55nU8Xg%2Ftuk8wZ3gsmgu0IxCc7cR08PNUnC3D%2FlU5niEdqT7nC5yyqPEtK3f76pRCZPk%2BucMdlWaxbjDhabMjb%2Bona3vSMNirlc8GOqUBFvfJUB%2ByOOduu2tsSB2WbwkqEn4B47y7J5H%2Bstii11awobcF3Xy9JwgRpK6bpui3yzhzPoyV4RGW3uPIRZqj3yEiOjStse1pJb5%2FPktyTXrX2AlOLwimaMXp9roBgtRi3qS49CH7zTWYLwSxv2RTu2ArEviCmMOJtdj9jcMxT%2BGGDbpGROHFkSgQBqfSRtDDUAbsvFo4XNRh9Os39Zo47N2tj9kF&X-Amz-Signature=42d0b4f8e3e4426acfb6bb22bff6ec7d2bc94dc7ee95dd164e6eeec879ff26d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HQXPBLU%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIEwfnyEbbSSC17AVfc1TtMDQ4Iaw0uqte3GVHIbCks7BAiBMW%2BjX4uubV7aLpTuJVTRim3Vtu9Tq58BkrSrxxPd0Wyr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMc2h2CWqtMaoBQW8jKtwDM%2BAP0dATw5T8yIqjG4%2BYk8mFL4JJCAKTPxO%2F0t48tUsZHMk0NuOhLrCg3gDz7aEfRgQY83qi72xk0FFuSYcrz0N1vDGtqPmastKTjZuAk%2BgAgAJZcu8RKSQI1FIcFVDGL10ziGSQ%2Fq0e%2BntYKibbWSCCQxUj4s%2Bvry6X%2FuJAtMX%2Fbip8FM5uw2EIbJI7ZbdnDXg5Hl2%2FvyuR6ps%2FdIFo5oca7PuXaMINeDqMOwCOejhKtsakFnGA6ZaMWNhkn1gHhvAsd2rMAuTs3uCdqvnRmC%2Bp91PlblFV1q4Z8w8W7hWYk8zg4zJnKvHnMjME6s6s1%2B4UKLyxnf%2F3K1I8uYLSzYaq8Oai%2B3UMEU%2F3XQghAlWjs5AOhZyaxI5zBraXxlU87RY00EQBGRWRG6ctpB5Yt1TPieEOHgwUZv%2Fy6KBRjttNwm9DmMrxvK8Y6Pk4YVKAswKV2Y%2F1qmPbV248OSQavD3zhCFeuVDgESBSWoS6q7lNPx09VPSD3UduDNopFZBU4MAoLhaekSce%2FxdXELonVA6k%2BQ%2F3YgtO6qgcnn3B6Pi%2Bh3g0rfUzhBr9i0%2FHhkWmX5tLm%2FgBWjb%2BpOXAsqUeThcFoUCZb%2Ba6%2FlT3RhZOYqD7v7I6%2BOmatRTK%2BEow0KuVzwY6pgGJB87Ufu3RNqmoEVS6jMeQDgPZWNzMNDig5uGHXZAkY7ZjBEJLuGoTXZxeDkM6mB3%2FlBbm3TssDzBZ%2Bp1UpDGkJc3soUDifXw2Do%2BIojbYDkKQqJhN2AZDSnMwHWt8Gri2%2BuRedFXy3b5Ao191z8%2B0jmfUZosqTHz83jl5OQvfEnOLhedenYlKzaXGxqwu1%2FCHYBiXJaRJrgMykAv21viYMdQY5tc9&X-Amz-Signature=35192c88e5e825054362d7ec5787176d45d0df58433c276f4244b66b0ee45508&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PVABY5A%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIFafxqk89c3vsTviFfM9YKZ6EqlkN5e9PdtV%2FHWjpr%2B0AiEAwOBYIcz70ST3VyvrC3nTG2SVUMP3t1e3S0JqOPWCxRcq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDF%2F9IoZ9ZZuMu9wYUyrcAxWabQvbxilOUF7PBGeZIKezvuRa1ISRHEohoWRag%2B9FzQk%2Bspnbyi9tgL1o%2FV6oos2ad8jDD9Q%2BbB%2FOHp4vZtkNrN%2B%2FqOI06EhYKRMuE%2B%2FEThRp1THcU7c%2FkjclnCm%2B5OV4%2FX3%2BcJnYFG7BJCgjJK3kSDqDxgIUL0PK%2B6oTBHIG0PPY628TBc63A1%2ButiDRjL%2F5Kqa1Ji9n7sGzFAe3JF7oG4WuBpHcXzV7CIfT3C6UvnMNVXjsXtUavQ0GWEsk6PDjyiuCmkK1sONEgXFe8Gouc7z%2FsOUnyfFJeC0swpJ55UpEO1zWPG%2FGeht9koiuGKBlwziUAJ5RBFBPl84bMhOPSQgKGYrCkKOrkv77lC%2BMQnw875GSpGcX9J%2FeY4jbEeDZj733Yp3Vtgt%2FLtAhAcTSWNQ%2FIZ95XWDKP8m6P1O7WNP5lqLwp56KKtmP7oN4IrtJicJXubWAY7T4wu4%2F6HCReEjEJwqGGrH4CeNalYHvOY180g4QPs9ot7tmsCbwa9GmL0%2F9FW5Q3SAdW3THtjEYZiO47yOtfR%2F13k7AO9zlFf9YvkFnmYpWzGAyB7%2FjGLfuF12KAG%2Be3mZmSLfyw%2BDj%2FUsvYI%2BhdylzvVawhS68gUx1xyHw%2BdoxfaWEMLaulc8GOqUBCaLWMWNnVdkbsBeeDHjqxkQNrQbnDEOoWykSA7rUwX20ffeSvJOmOSx%2Bsegst33T1%2BBBWVNUkZix4Xcmd60VJYAowAJTy2GBksPC6Mo59NZ%2BC1G52XZD8fAvLeLM2c70g1LuJg%2BbGUs%2BejCT5i7BBEi%2F88MsITMLow3Ro1v%2Bq0Py6weuNKbum3pSPbikuqHW8yBnkh%2BAQj7F9oiOdSImj%2BiC9hbi&X-Amz-Signature=44c0705ac43008ebd951bf19e6b110916eb10385e1478fa2a6852037229431f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PVABY5A%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIFafxqk89c3vsTviFfM9YKZ6EqlkN5e9PdtV%2FHWjpr%2B0AiEAwOBYIcz70ST3VyvrC3nTG2SVUMP3t1e3S0JqOPWCxRcq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDF%2F9IoZ9ZZuMu9wYUyrcAxWabQvbxilOUF7PBGeZIKezvuRa1ISRHEohoWRag%2B9FzQk%2Bspnbyi9tgL1o%2FV6oos2ad8jDD9Q%2BbB%2FOHp4vZtkNrN%2B%2FqOI06EhYKRMuE%2B%2FEThRp1THcU7c%2FkjclnCm%2B5OV4%2FX3%2BcJnYFG7BJCgjJK3kSDqDxgIUL0PK%2B6oTBHIG0PPY628TBc63A1%2ButiDRjL%2F5Kqa1Ji9n7sGzFAe3JF7oG4WuBpHcXzV7CIfT3C6UvnMNVXjsXtUavQ0GWEsk6PDjyiuCmkK1sONEgXFe8Gouc7z%2FsOUnyfFJeC0swpJ55UpEO1zWPG%2FGeht9koiuGKBlwziUAJ5RBFBPl84bMhOPSQgKGYrCkKOrkv77lC%2BMQnw875GSpGcX9J%2FeY4jbEeDZj733Yp3Vtgt%2FLtAhAcTSWNQ%2FIZ95XWDKP8m6P1O7WNP5lqLwp56KKtmP7oN4IrtJicJXubWAY7T4wu4%2F6HCReEjEJwqGGrH4CeNalYHvOY180g4QPs9ot7tmsCbwa9GmL0%2F9FW5Q3SAdW3THtjEYZiO47yOtfR%2F13k7AO9zlFf9YvkFnmYpWzGAyB7%2FjGLfuF12KAG%2Be3mZmSLfyw%2BDj%2FUsvYI%2BhdylzvVawhS68gUx1xyHw%2BdoxfaWEMLaulc8GOqUBCaLWMWNnVdkbsBeeDHjqxkQNrQbnDEOoWykSA7rUwX20ffeSvJOmOSx%2Bsegst33T1%2BBBWVNUkZix4Xcmd60VJYAowAJTy2GBksPC6Mo59NZ%2BC1G52XZD8fAvLeLM2c70g1LuJg%2BbGUs%2BejCT5i7BBEi%2F88MsITMLow3Ro1v%2Bq0Py6weuNKbum3pSPbikuqHW8yBnkh%2BAQj7F9oiOdSImj%2BiC9hbi&X-Amz-Signature=8cb0e2c1125370886c97382eb3f2664220fd2e26bb3c302b4a79c851116eb2b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466632HJTRY%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIFQqQq5XdnJ83Ykb42mF5GjvN86s%2BustgZSzg7VPT27LAiBdjSXopUpSjn1tsnD1wT2O7mQsJaRq4eaUOSByyScywSr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMM%2FOzJdNk%2FO2m9f35KtwDzOdzGZ4ZwOKQ6VWulqIdVm3%2BCPFq%2Fv%2FYlNl2o5hhutp7nKIuM2unmHA3CbmsIFk7wLfue9hykXe6pLR95YTY0u15PfrbBkrpXmzEWV6fk635LNJnwyQ1sIYiEIRUa2bdviAz6a26qeI7zSGwC%2BX04yDBAHJm4U%2FX2R8w8XwlUpXtcgP%2BZ42ZeTlKgOhizl%2FFp1iHMSSxKkrqzHx%2FtrM0n22ZJEhSdpFJy7qb3Yu1U87cFic7GBVmlHaKcEkLw8FDU%2BfWU11%2B1c6VO5hY9%2F4gH%2B4gPSXtkhQ6p%2B1nBRwKtZWnH64WKVUaLNoOJrDevDGvd4vx6SF7jfQ3Wu2mnu4y5WtEjdUybY7htDodGasnZ%2BUWQxmIUNASZtj7mWbL9pRBjv4neVQf9k2YXYnVDWi84gX3Cfxqze8J6MLRNR%2BlZSsrCOTNN3sxQCTOZ%2Fyx4EpI9bd0nv4ZUMeeckYxSzMzOI1KR0PTAeuMEA%2FSuTHdIqP93gG%2Bdcn2ezfBlYCoOCWZ9PzXCBRFhV8fDYXmQBeJBTfyjZ9NydYI38J%2FeGQLYI7n6kZdVVr3TyV4CWTj%2BkNdcQ6FffF04Y2RXy1vVBq%2Fa2X%2BMQ63L%2FSaiG7jOYUHpxRmWsrK%2Fio9FRecC2gw3q2VzwY6pgFWns%2FjC1lMYq8vzO94ogHp7jmZMQEPA7Ep4%2B4epZf%2Fxr4LsO7riajK0ul96GBgF%2FVCTgDEBwj121LFv63f9BurhTyQNXXfnd8JHbctrazMoq51uMRjAf%2BJFyjWXfh46bP%2FvIV0r9cqgK1VyVzfv3qKaEnzUrqsWo4MXDCUnAIRZlcCdjRY0bF0AZ6Hjb%2BZnHSmf9hfWDlljZtfjDhgQmSDbMcUFDY%2B&X-Amz-Signature=72ca5601c240a42bf25e8a1646e889586713b650195d01cf00f4c5cfa1c9495d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMV35B2M%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIBnKFTEyQTFnkcfgyH5KPf1MwwPR0O%2Fs2XnTknsD8j3EAiEAzWnzQu8fKsaC79cdX88gE9%2FmabY18IVtw2izS7xJFd0q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDJEMHivrHExnUG%2BhSyrcA21ukjlVSSOxiLRFqIr2o3MEERinTF3uEbx7RH5Z2OemPLGqsJYZwQgw8XDpqgTNhV%2B8yTkTdYLckr0i0h2zmg%2FU9%2Bfbgfy5aT9pUm38nJRUXwAm%2F0KLOQJ7fgw9eIWn9lUVZwq1VelB2KdkNzO%2BqGrG3Bzbff9p71YLJk6dxHvkOWEcJ1PXdxlnnnTbVKGuszP5Ve7P%2BeftR9FDnxIeolgu4%2FiILiCqBu8c32OvXqphnBfYYsFl5nHTTXsop3CbpCvAYV0t%2Bli8Ij%2FHimrgXKVd1PhcYYi2AOuK3VavAA7iHuuSa%2FIZGVWhT3Dr9owU724R8ZCTw25jDALMK4O05UrZ27e3mh8qT0zGKZw3AmB41xKmD8shjs%2FYlJWRbRAO24MjVVxA3PzmLB2gAIG6kddsVOEtTAT9i82oO0KorgVxrpNDdoiwTNQGZBFrnQ3I%2BC%2FKnfYjSVUvlA41MiBHNKet0p1Q0Q7V4Lleszjn0e0f%2FR5Z%2BVj6%2FIQb027QEltAOW0EdGWlT8fpzSVb%2FlcEhrOIu7VzX%2FW0uRJQCkXC5p6jQa9UEPyVmw8PAzC%2BKslx0rqnXmri12fFAnamR%2B%2B4RoMRUaerwg1ohTo3E6piMWQHVfLLR4BZUdqaQBwWMJmrlc8GOqUBcKOrpyS8emqDNXvY1uloTBLDp7lqsDVGs07A3j5SmkJBDX1D1Ly2sIEDiTDEE3l7X83Mj2Aq1%2F5H290suNnVHL4zTpwnmDaWPgTwGEoEb%2FmjStT0ufvgmHiLD1yd1BCdgBzyJpbYblZ21UJWp0wjdhuwsYENpVeX29CEUk%2Bla%2Fw24CJ6eSIx%2BxX9aNcyIOX6K8VTtYFNwFTtfn3yN%2BlEfWN7AGhG&X-Amz-Signature=f6cd3cc2e738bc89820dcc20360bf8e9f987c144c559cecfd49e1c88946bc6bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMV35B2M%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIBnKFTEyQTFnkcfgyH5KPf1MwwPR0O%2Fs2XnTknsD8j3EAiEAzWnzQu8fKsaC79cdX88gE9%2FmabY18IVtw2izS7xJFd0q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDJEMHivrHExnUG%2BhSyrcA21ukjlVSSOxiLRFqIr2o3MEERinTF3uEbx7RH5Z2OemPLGqsJYZwQgw8XDpqgTNhV%2B8yTkTdYLckr0i0h2zmg%2FU9%2Bfbgfy5aT9pUm38nJRUXwAm%2F0KLOQJ7fgw9eIWn9lUVZwq1VelB2KdkNzO%2BqGrG3Bzbff9p71YLJk6dxHvkOWEcJ1PXdxlnnnTbVKGuszP5Ve7P%2BeftR9FDnxIeolgu4%2FiILiCqBu8c32OvXqphnBfYYsFl5nHTTXsop3CbpCvAYV0t%2Bli8Ij%2FHimrgXKVd1PhcYYi2AOuK3VavAA7iHuuSa%2FIZGVWhT3Dr9owU724R8ZCTw25jDALMK4O05UrZ27e3mh8qT0zGKZw3AmB41xKmD8shjs%2FYlJWRbRAO24MjVVxA3PzmLB2gAIG6kddsVOEtTAT9i82oO0KorgVxrpNDdoiwTNQGZBFrnQ3I%2BC%2FKnfYjSVUvlA41MiBHNKet0p1Q0Q7V4Lleszjn0e0f%2FR5Z%2BVj6%2FIQb027QEltAOW0EdGWlT8fpzSVb%2FlcEhrOIu7VzX%2FW0uRJQCkXC5p6jQa9UEPyVmw8PAzC%2BKslx0rqnXmri12fFAnamR%2B%2B4RoMRUaerwg1ohTo3E6piMWQHVfLLR4BZUdqaQBwWMJmrlc8GOqUBcKOrpyS8emqDNXvY1uloTBLDp7lqsDVGs07A3j5SmkJBDX1D1Ly2sIEDiTDEE3l7X83Mj2Aq1%2F5H290suNnVHL4zTpwnmDaWPgTwGEoEb%2FmjStT0ufvgmHiLD1yd1BCdgBzyJpbYblZ21UJWp0wjdhuwsYENpVeX29CEUk%2Bla%2Fw24CJ6eSIx%2BxX9aNcyIOX6K8VTtYFNwFTtfn3yN%2BlEfWN7AGhG&X-Amz-Signature=f6cd3cc2e738bc89820dcc20360bf8e9f987c144c559cecfd49e1c88946bc6bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZO623ARA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T232350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIERPasnif%2BtrDFCuopetSxSaHlmD74BSW8x4OYEQoKKJAiBuszHE4s%2FWjGkSYqdZmhVQP9a82ann6x6xoHAbIkGPWSr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMG6%2FKZ4J3kaov7yQRKtwDPautpe0EZ6nNEoXMwgElma8O5805c7nejuat0W8dTmXgiWgXGQ0lbmGUKWPeJ4%2FlrrtMq5vRFHLjR4IBsA3PsFt%2BatP4OTXmE6BZo9ot%2FAw5%2BYdVc91fJdRNHFYH9b32aG%2BxhD7tdPRuc%2B7IbuFcYwKgjo3gOhmccCDDUxOC2RD2ZRZgkMFhJkUVE7WSqW82RqV2pCg3%2Fnl6lHJLkTolrdyLJuJBPGsULcISor%2FP%2FlWhLXbfpFNbmeAVSIy%2F6DnTdENc29HBcAzVXzjdULHDcMn4BsGQTldEZc466xFHCNU2MUcXHYmlZQKL06VQvYWRKq%2FcEpE%2BGYyqyf5sUj%2FWH5yTzn1GSy0mwI0FMjso0nNvbE6L39c0Cr0NdKUyajzH2Dic5JedQUAigREfRhavv2ZWIGx1aUHJJWIPP2keHBIvzg%2FavmHYOO0fX%2BDCRGSdXVGOJR4D7q8flHeVvVhmJIBS3Qtha3vd0qWraPMHhfDqCyrBFZGJfYKAwI33CjFEcAmciJtAE07TZHM3hlwCRrG7k%2FYMdnQY0UboLfY%2FuEOYDJtHV%2FmFmDBYpvyDLpsJNbJVP1gqwjXSxXwlazZ%2Ba0oAsbUPnZmLrbBvVawvBk83pYdblps%2B985inUgw9aqVzwY6pgHHppcXNw1bsDzbsE60fog%2FMv%2FL7UvOH8mt3kopvlKm9SkRLd6J6KIhu4ccS54o7nIuf6deWm86oH9Uon7mz8mFGtSjrCb2YgWy5cCqIIDVaoFwNythxZki4oiUzC%2FW%2BoN4BfmMJUf%2B0qOPtKTr02i3HUVCMbjc%2B4nsBbWbM0563sheV3HfdNAsQfgomznwOGJQpqaE%2F%2BixcGYrodXOtnS8lyN6FPNp&X-Amz-Signature=43ffc6b39c972b25a4d14fc5d2cfbefec05d0892ee86fa5a7f75a49b88588a9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

