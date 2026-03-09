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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SB7X5FYR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIAwUaLCehqM%2B5K9LIW0IsddLfaBXXtAyBMDg5%2FBMPOkMAiBzooNXS%2BMJ4obzqhzXIldw7Y2QqvGqOEzYqTvI0Wx0xir%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMbPI8Ccb3LXUNL9LSKtwDrdUa4T5kyEzvLm%2B7%2BBxahsxsA6zHWZ8DPoaZomL1TEi9oY8Forj9c%2FVOnPLYQFasBir1QrcnxzRs953IK2OGgJEtg%2FqVAXYlN9evqlzJyWvse4ZDEV4A5x%2FkZncEhD9p69bMeR47whF3y%2F84PcpXnuvRQ93drU7Fpku%2FfMMQWr3M2K4fd3BvlxvAFwBWufe17YnWr0FRcOk5Z5Q6wuqs%2F1STH6ZDDy2MmAFjcfEnoiKxzBbVyndzradRfJhwJUM9%2B1XcrYMbjGgnswIdChCL6oKbHK3V%2FLCnJouOW7xwgdRggeisz9nk7Hf55zzhcQZeJUjoHXvrQbWzuV77iULNhw%2F%2Fn99fKWDEKh3hYivNdIEyeFXw4u49pVM8xeXaTABi1Xy71C5DYG0EzYGwEZy1okCbCvEjeqUl3ORGjCZuOTpiWxt%2FxaszXQwyNblmIpZnCftUzBVz2UqqTn3dyfiS7XJqetEFO0lAJLx9QKnlAQGeSCg0h3ol0Fn8hCNEkQr5eZFHc0W6M1qsIsr9SsjlXyuKkiBTvPq9M78FJtFjhdR%2B7%2BMxkTOwus5pW1EjOr4rRVWdc6r2vpB8KFevQ5bveqBgwYLYjjjd6q9pdmGmzPqipB3O9rjYWXetytgwv4G6zQY6pgFEjjpnb2EurNiAsTjNcdBASy85L%2FZoU7SuqE8SO%2F%2FGy8Pm2OPS7II13t82ueQX5YDEHKegfb67kMv1OvrsHZTFRw9bzdgbsEtHvn1mvSnG7GhgMGiCXMlQWZ%2FkwYoLw7H6wzZDQcZeLLAkBH3NxXVUK0QY5xEawzDc0aAtdLHGJEJMfSLrHNdoQPHA07r5mjgNg8NBAVqwN8C44JMr6qCUxprJ0cEH&X-Amz-Signature=7353e158a3ebea9b8bf99ece3058b959d9fbb5bb6dc43ba9d932e9874d651c13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SB7X5FYR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIAwUaLCehqM%2B5K9LIW0IsddLfaBXXtAyBMDg5%2FBMPOkMAiBzooNXS%2BMJ4obzqhzXIldw7Y2QqvGqOEzYqTvI0Wx0xir%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMbPI8Ccb3LXUNL9LSKtwDrdUa4T5kyEzvLm%2B7%2BBxahsxsA6zHWZ8DPoaZomL1TEi9oY8Forj9c%2FVOnPLYQFasBir1QrcnxzRs953IK2OGgJEtg%2FqVAXYlN9evqlzJyWvse4ZDEV4A5x%2FkZncEhD9p69bMeR47whF3y%2F84PcpXnuvRQ93drU7Fpku%2FfMMQWr3M2K4fd3BvlxvAFwBWufe17YnWr0FRcOk5Z5Q6wuqs%2F1STH6ZDDy2MmAFjcfEnoiKxzBbVyndzradRfJhwJUM9%2B1XcrYMbjGgnswIdChCL6oKbHK3V%2FLCnJouOW7xwgdRggeisz9nk7Hf55zzhcQZeJUjoHXvrQbWzuV77iULNhw%2F%2Fn99fKWDEKh3hYivNdIEyeFXw4u49pVM8xeXaTABi1Xy71C5DYG0EzYGwEZy1okCbCvEjeqUl3ORGjCZuOTpiWxt%2FxaszXQwyNblmIpZnCftUzBVz2UqqTn3dyfiS7XJqetEFO0lAJLx9QKnlAQGeSCg0h3ol0Fn8hCNEkQr5eZFHc0W6M1qsIsr9SsjlXyuKkiBTvPq9M78FJtFjhdR%2B7%2BMxkTOwus5pW1EjOr4rRVWdc6r2vpB8KFevQ5bveqBgwYLYjjjd6q9pdmGmzPqipB3O9rjYWXetytgwv4G6zQY6pgFEjjpnb2EurNiAsTjNcdBASy85L%2FZoU7SuqE8SO%2F%2FGy8Pm2OPS7II13t82ueQX5YDEHKegfb67kMv1OvrsHZTFRw9bzdgbsEtHvn1mvSnG7GhgMGiCXMlQWZ%2FkwYoLw7H6wzZDQcZeLLAkBH3NxXVUK0QY5xEawzDc0aAtdLHGJEJMfSLrHNdoQPHA07r5mjgNg8NBAVqwN8C44JMr6qCUxprJ0cEH&X-Amz-Signature=7353e158a3ebea9b8bf99ece3058b959d9fbb5bb6dc43ba9d932e9874d651c13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XRHAW6X%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCICHfvQLDjGRcL7YhmQXJk%2FV5USl5R%2BNqXqlwmpMeUZJKAiAhVrYz4IRnG2wJeIWJBrEFtPaLk%2FRw20DotCbqElVoXCr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMTGs8aRZLSkkFXRNcKtwDzneY1%2FP6pXn4GhsyavfvALwBqr2sXLdM0IXfQ5kZ83WynP7hMf%2BbVq7gAJmSfh3xjSkj%2BYYKG4mWsX1tFGB8LG3S7vULx6mjvf%2BcfjizRNpgZ%2F6W%2FbRKloMvaq3Ula7Faprf%2Fn3rYkKWikj75v1GHjVj83ZnyIXG8cpELlG9OMRfN9OZg0daB5%2FpIZzlouv7ymFKOkEkNoIKRSsOVHlPmazKw11DVj%2Fw5O4HGVLlhUwIw0MeM5bdPhJwf%2BN6OrCTbYJUkO3YW0WDTpj6qR6EqaYRrpzB6WG6X9HRV%2BDzQBuFMxgGHbBW8cm3mX9nafIBBXNG1DuAbMX0mfs57gy3dawwN2FIXrLFIPqj%2FWE%2BfQcnofVF9Udyr0uGvIL5XF2atL1STx6NQ4y%2FDJgNbG1fiIOVuiF9eSoxY6bTtRYfOa%2BufAPn6UTlt0OVMXur%2Bx%2F3P4ngfqqiGKoNL7WJzBjlRL5m%2Fqwvt8CsWQHgxIBsi5YpRD1dPj%2B9q1VoypHnsyYcQNc3v76fOHelsHZ%2FsZ%2BPQ3BaVTTnIQ%2BKJX8jqd8nO6Np3fXs1nhs6RJYD6KkmwVFKYP8TWXZTpnI1wNGbAw8WkheYPAcW2a8ltSYkWShEqyxTfHTta0y3PT1pQww2oK6zQY6pgGXPm8I1IH%2FZX5ofHYT8MZBJfdaSnpieCBSzRu0Qg9UMHsohXNW9464ANJtPR4ILgfbEO6%2FLNNahfsIFDbGp2vgq7%2B3uf0HVRCrCxTVfaRW3d9Gx1X3dm2JwjNW4%2FLWrz7XeCOdjRtmzJlbSK6jXXnchWihdix2VedHgVAhNyBqSM1G1UBV7ziHodYeKZrmb%2Flklc%2B0lwHImZqhdeYo5juRmcRVf6m9&X-Amz-Signature=750fd26c3c7c8237cd4577e40124591e4d3df4b1c818e479307cb312c8a9aaee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLBNSUJZ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCJD6FdrRidcecDuYMIn%2BnX7pJ9KEQr0JFV%2FesT4c9J7QIgP%2B2aUKItvcodtHHJ5hnBzzawQMCT51bQ%2Bge9cSHtkU8q%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDMWQwednZU5vE8u%2F%2BCrcA7whCDhXrIJ1sKHl%2BqD9sqfu2YsWKduiDnTthAlLLYEfDu4IAGEqSNZt2ebDs0sfHiL%2B8YSZHRlH0o%2B95DUTCnyUaxZPOGffMhI6pxiVB%2B1qBwQ2%2FkoBXeg1w0EP9TkA3kgl%2BCXIAXOPx8uBjSj7%2F7Dd%2FtDsBqZeem9HWWKyJA1spW0kYUB64hCQELI85niqG4ey%2FZ%2BMU6bnw8UpoQfgK2EShxhZGXwwpkFFOyGKoPMLLwiVagSJX4%2FH2lbmKiUGxAd52nuAhHH0ismatvC5hKhPHXK080nt%2F5oLy1N403PzLEAXjc6HgnQfbo5fTzqU%2BoDNI11uTzBYYvbSW4LwRSprB%2BxRd3VvNAx6P5BeGroCYDgG%2B2xLASyNE3oY7ZW6051PT%2Bg1MgFg3F8jM9Zo12nnei7PtzAlvol8EGdcdtKuz3A3ecOqDLdzAsGuqdqfC2yhTdpA4kGyJ1p5wHZF%2Fmn174FsRdA3GoyXPm0uNOaTj5ONivV7B9UvWGu3uf%2BI9M%2Fjuhbwt2%2FGK%2F4l5nrXbmWnt7tF7CrKrDMV%2BNHBON4lcouoq6kS83HKuO%2FlUDydwmGbXuw%2FyFJTSajWluFXaq8rsUTi4%2Fd80%2B8z02JJp63%2FXHGTXYUGb7mguXkEMIWBus0GOqUBmvsljX8cjScUg1xf5s8LEnalUj74oGrq2pIp2iSmtkiDnRCvfQsIinLjWHAI%2Fv0b51eFshobHu6tGb0445zZFQbCWb%2BYN6IYNPG5WZmjLBtp19Awfb3ofz2mzThbNMPGJAtnS1YyhPGm2t%2Br2d1m27unxG2CccXyn8eWmvVc3zEHlqx2KhUGhuz3jXqsU0gQkz82VSupKxhOM%2B1KoFiuVpUgiqKI&X-Amz-Signature=eed86d55f26ebc158ae6e2688c5e5b3d4841a9a20af05b120ef25671fc865e7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLBNSUJZ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCJD6FdrRidcecDuYMIn%2BnX7pJ9KEQr0JFV%2FesT4c9J7QIgP%2B2aUKItvcodtHHJ5hnBzzawQMCT51bQ%2Bge9cSHtkU8q%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDMWQwednZU5vE8u%2F%2BCrcA7whCDhXrIJ1sKHl%2BqD9sqfu2YsWKduiDnTthAlLLYEfDu4IAGEqSNZt2ebDs0sfHiL%2B8YSZHRlH0o%2B95DUTCnyUaxZPOGffMhI6pxiVB%2B1qBwQ2%2FkoBXeg1w0EP9TkA3kgl%2BCXIAXOPx8uBjSj7%2F7Dd%2FtDsBqZeem9HWWKyJA1spW0kYUB64hCQELI85niqG4ey%2FZ%2BMU6bnw8UpoQfgK2EShxhZGXwwpkFFOyGKoPMLLwiVagSJX4%2FH2lbmKiUGxAd52nuAhHH0ismatvC5hKhPHXK080nt%2F5oLy1N403PzLEAXjc6HgnQfbo5fTzqU%2BoDNI11uTzBYYvbSW4LwRSprB%2BxRd3VvNAx6P5BeGroCYDgG%2B2xLASyNE3oY7ZW6051PT%2Bg1MgFg3F8jM9Zo12nnei7PtzAlvol8EGdcdtKuz3A3ecOqDLdzAsGuqdqfC2yhTdpA4kGyJ1p5wHZF%2Fmn174FsRdA3GoyXPm0uNOaTj5ONivV7B9UvWGu3uf%2BI9M%2Fjuhbwt2%2FGK%2F4l5nrXbmWnt7tF7CrKrDMV%2BNHBON4lcouoq6kS83HKuO%2FlUDydwmGbXuw%2FyFJTSajWluFXaq8rsUTi4%2Fd80%2B8z02JJp63%2FXHGTXYUGb7mguXkEMIWBus0GOqUBmvsljX8cjScUg1xf5s8LEnalUj74oGrq2pIp2iSmtkiDnRCvfQsIinLjWHAI%2Fv0b51eFshobHu6tGb0445zZFQbCWb%2BYN6IYNPG5WZmjLBtp19Awfb3ofz2mzThbNMPGJAtnS1YyhPGm2t%2Br2d1m27unxG2CccXyn8eWmvVc3zEHlqx2KhUGhuz3jXqsU0gQkz82VSupKxhOM%2B1KoFiuVpUgiqKI&X-Amz-Signature=c39e1f0202546e238556cfb2da73d1599f55b1b269b694cf394c27bb14e447e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTJ7GDRO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIGrquGUB8OWpYLkl2HjKb%2Bi952ImLk6IVdrLJ7G0HWLyAiBTe3Pw7NvcwidA05L0zno5721dTxlRMEncsdy48XXHnSr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMRA0wosxem4wY1Xh%2FKtwDjk%2FFE%2B88UYEl06ytHgQoWCIzjg9WVXmbroWOqf4cEqv8A%2FQmT9rNg9hMHZPu6bIh0e1yuv9Z%2FFylhFvVN0pG4NfeR%2FQElMCqydPZ%2BlqgCdrnr2S9AslC3AnAzk5P%2BUwy4NQAK8bIiRyak9xJ%2BBGk46xaAo9bNRSxcg4BkXADez%2B2%2BRzFVfVgOoXsqD8%2FBl%2B0cQ8GHWklTrn8v%2B7%2Bm6inEaDkKM6AHHFCUoFeT3GYY%2Bwp%2BVgjQdd4RvozOM7wo7t258dziSt47H2hzW6nwcV63EjP1jdhH%2B8cwkKsOXtanqkW9GqIngoNP2UPui%2Fa4hG6GlzGEmEbqIs0HPRTF0U7kD7riXZhTsbwMMgtF5cStUP7%2Fg6F2gov6Zpdf4mYGMqMPDFg2m6k%2FBGb%2FhwE6Tn9aa9eSh4CcBblj9jTgTbzk8Ih%2FfYP8m6GcOyIZPnOFDAUiulw6l92a6IO4wI25WmHe7jREaALwuLE3tonkZNk5ulz%2BLCRm0wFOyCfq5uWA2MXi3ovvlqaZatNE3ZpRt6PpWySpuBzr2A7YR88wXPF%2Fml6gsw673sB40kB0%2FCE3z7s96imW1vF%2Fpl2q1jvCiBdLgQaoMit6E%2BkpeicqIsWkkMDJoDyx6JD78kPtRcw3IK6zQY6pgGOgQcaUaaHB0YdSBcg1UMJObBcUh900YaAW8vV%2BtcQNKKyW%2FWyargXWL%2BGvgQGTue8KUo5zkfXXiJr0buCjNhbwajtJIuZr7ivrNVibz9IHx8zQWCf%2Bl6S1Gw2Q7vMHDaH5%2FJoG2A3MNSC6%2B35oYJTyMd025Uu3L07KNubacSNkDAb996Ux55nK%2BZKLUB43Y5RglUjibe56kijNKPSmNtB4tKQsF7n&X-Amz-Signature=3e9ec710dec3e64eb8dd915778c21998a687a90c0f26aa4f6d21421318d5a1cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QNKOMLM%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCICITf0L6IucL44KpoiVG%2Bn99xdJohGr3n0bfjxVmPs6eAiEAya%2BMG8LdttxXAraNlxKDYdneXvniZ0cqsSoK37FLwDcq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDJMXsHupCFmx90PtNSrcA5mIiTsdlKB57JuYA4boCseL4aVKI%2BEtLK8gyNY%2Bbrpaq5ajuJ9LO3R6XzqY1C4NSD6GMjOXjK8S7ATyvOHvyyzrireY1sOViTA%2FDEHsGNkNUlBQqofiukiJ1%2BzaQTJ4sVb2Z%2BAG0Fl8x7TGEDAoK2J9nUhdgkxfCEbvTBDkoncdVkxNhvh2c74BZAxVYtoarvinz9OiBgWPEN4vW4WD%2Bl69wo%2FHrWEq6daaXF1Auaev2cxbQUlex2kLo7HJpR1RQ6DTEZDmfUMJxMAVnhyOtPcQZrTxCs%2FksuL0aip5%2BJ8pL6HV%2FsVQVyNfrk%2B405wZxbTtYby23mdvW4hbT1QVJXpIL2uh9Q1JpziuE31tlXqL%2BDsR811PGQvBD3fQm2TFlUBtpcjMUADHRarZbA%2FKkHI0y5dRE1T8%2FtAs1lvXrCF39n2IGQAtzQEhnK30tGn0YpW7T3cw9jgwDtEhFIkuKfHk8Gla%2FBI2BoYjT4CqhMShe3TuEqeTrRFJyFtZ4j0kVzeu2SeqW%2BWtsN5WfNjDj0%2F%2B0UzN6H9VyRI0JPC51JPX8vmwnZkirJCcY0hNfqY5wC5Ymlua4NKntzvQMcjb8BWEVfOMAaajq29L1AmIvkSMvJoEEK88ARM5qfgRMJqCus0GOqUBS3GUxHg0YASrnTgfvJ99%2F0QGWqS%2BsWvH9QFbBolesLFRcTQzNhU8o0zmy1ryj4QOYttlzFJuP8YcSCD%2FBDr7eARKHj0msunuqdPKdTVmcST8fAGr7IPaDixenw4mF%2BTJ0FcDd%2B7h7UxssScps7VcwTdheJHSgnXZ4EKv2IV6NiV72Tnj8UFe0XNj13a1UrAaPswACF13Is%2Fxido8tsV5KFHvTkpN&X-Amz-Signature=badd5ea86381ee6606fe912fa882709c78bf16781146ac3c257b88bc8e435531&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSBJRZ4A%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIGsYhcsrXgWv4ZUjcfvjCf1kcMRK6ej%2FqrouLdxlFoRzAiEAtAKPPT%2Fp6fyuCvBiYzb2hYKkDNO5LGCr5qN%2F6d4hAHsq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDHp%2FH2J1mh52oEWc1SrcA9IAnbIkh72MXK9SU4CUbAApiKTGNsIRZji%2Bp1b27c%2FoIufxdJ7YY0Sul%2BXpzF0Mwh4FhvB7i8SmSw1hx2qnmp6B7f1TRZ4nqxlfFq1WH9NccAnbjeH01tyXrYqCWnKVA8Uk%2BUmlFD0kGhoAML%2FrKNx0jZhwy71drGpnh3z9q5%2B8Qwyi6H8K282Nc4L%2FQk%2FMAnOUAh0tzp9HUoxT%2Fjs0JB1uZNZoIwL2wPRGT9J6ChB%2Fbt2EYUD%2FWG7br406CBQhTZXtUBtJsF9Yn2ziMMroHkeG05MqBckHOhuxt4J7AknqjF%2BiSx3e%2BYH9OMbTeGBwh05zMGWmqWrLR6rBO7PgjsDVaHq2eQHKuigmAre3OKHwyB%2B8EXdzRoVIbyrE8vGofRzZQk2Q6xY0mfKAQisMg4Hwc6HJACoxauyKqB7ors8ILO6A5SaIFXI6nUufWlCie1leyGVGqIqPDfVDjGcPBlABSbQB76MGOuh0TtA5xEvO8zUIuXDCARACLdVoZ3bLf3seqTQB3Z%2BVyxpiiLmd3Ue6YH2T5Wo8%2BbgLlMD%2BsVNJBAuZC04bY%2FqyKpGctXtyXDcf%2Bl3UwwJOplFvZBdXcc4n19sOEw11r0RfiLRtr%2FXnQFI6Dg5uLzgkPX%2FQMNb%2Fuc0GOqUBIoRjt%2B57xJC1czxrqHtHpPTd1a6tY%2BEti27k5KqQJ8CGNVkkZXj81KrQ60BLfaTgo%2Feemsj86w%2B2tOJSlgUhTPh3V6NjMVXBF70%2B%2FKI%2BHWbHH%2FholtCQW%2BGm5Y0sSgneDv%2BAWas5aBFjhqLLNXnzc0Zvp1oZiBoioN8ZsPrHCvoide%2Fm%2FL9fQA3ueVwk7PPJ9Nn06pk%2Bxn7m%2FQL9svanscXdossr&X-Amz-Signature=edab9c04bcc66b5cc01e039f11c776ae342f7072fd3d1cc29dc6d9b4f527179d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625Y564MB%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDYEnzq40qgkXtzAUDLy0OpONJRIQU6pJsAgyfNKdkphQIhAPjWP4G%2B9FaTr2Um9H71HQW1DYir1C8nrL024vY%2FyRv%2FKv8DCCkQABoMNjM3NDIzMTgzODA1IgwnjubbZvyvW1bkVVQq3AMaQXvKktjp7pfR3F6NIsd5san9mSUbw10FHquVqEqoTJ5c98jvSMM8xtRt01wE7h6leZbc2LOXhpbrRzJMalnpgm0Bb9hZv%2FxJlEGXDU99OX0pxSA5mbiVTE5I%2Fhn6VjY5g93KSrur44Yl2xLvfWuH6zWf0uBToqY2zaBEWT0EvlFwlLi0KADnZHToD8Jfy5kZwOqtowVqMexdfA6BQ8LFaIrn2Z8REwC07T06HawKmCglfz%2FDZIOscrNHkp1sjjvSKMinFmk%2FtgDNea%2FlfHJO9OfGgyxb%2BaTVVyUsI1brvVJ1YPeOFiXITuku6BjJOWrzPneYkVTWqDFJKptHR9Np48ecfsroggKAu8dt%2B%2BsLIgu00En8P%2BwVDFPOE7C4mJKFx2eYXP76pQqX9NF6MiWrMEj0GnkRxZOxgbg20o1lEGZTBe5obGfCxso0CmwH9m0%2B7hR4%2B%2B4QWoPTtAp477r8MhTVYacz%2FGwM9xyrHELb6tefXv4AYiBBHnvWcVk3uj35ccRr%2BvfGtO7m%2FkTwXu5WzfWMKZDZ4REFWWCgxD3roXz6hJhzerAa4oAJPkpDwSrAwHqV%2BseOZFpAW7zOsllldE09rOgHYzN0W2mdCLBVRsgPCPJRr%2F5Gddau6zCUgbrNBjqkAdFWGv8VYQfc5%2FMXGAUh9%2B1ptiZP0TcRVlJoLPNH0hsmA2m75Td7jM6TVS9%2FIY8wZoK25u4NUV5TughHLCv6n2%2BYUmbrJRzOieLJALKWOLGeIi82k2Z4RsoG5KiMkLJBCldFbZvSHS6ckO8p9kwf9BZygcWPW4coisX5ssF%2BRvHUhXGbCEguHPKR0DERC2WmPS3D4swGsKhOC%2BxJg2jctJti9h3G&X-Amz-Signature=018b85ccb08fef32d5f6c127ab5ec9f6c6a73bf5265742be7fa770447d3e84e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625Y564MB%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDYEnzq40qgkXtzAUDLy0OpONJRIQU6pJsAgyfNKdkphQIhAPjWP4G%2B9FaTr2Um9H71HQW1DYir1C8nrL024vY%2FyRv%2FKv8DCCkQABoMNjM3NDIzMTgzODA1IgwnjubbZvyvW1bkVVQq3AMaQXvKktjp7pfR3F6NIsd5san9mSUbw10FHquVqEqoTJ5c98jvSMM8xtRt01wE7h6leZbc2LOXhpbrRzJMalnpgm0Bb9hZv%2FxJlEGXDU99OX0pxSA5mbiVTE5I%2Fhn6VjY5g93KSrur44Yl2xLvfWuH6zWf0uBToqY2zaBEWT0EvlFwlLi0KADnZHToD8Jfy5kZwOqtowVqMexdfA6BQ8LFaIrn2Z8REwC07T06HawKmCglfz%2FDZIOscrNHkp1sjjvSKMinFmk%2FtgDNea%2FlfHJO9OfGgyxb%2BaTVVyUsI1brvVJ1YPeOFiXITuku6BjJOWrzPneYkVTWqDFJKptHR9Np48ecfsroggKAu8dt%2B%2BsLIgu00En8P%2BwVDFPOE7C4mJKFx2eYXP76pQqX9NF6MiWrMEj0GnkRxZOxgbg20o1lEGZTBe5obGfCxso0CmwH9m0%2B7hR4%2B%2B4QWoPTtAp477r8MhTVYacz%2FGwM9xyrHELb6tefXv4AYiBBHnvWcVk3uj35ccRr%2BvfGtO7m%2FkTwXu5WzfWMKZDZ4REFWWCgxD3roXz6hJhzerAa4oAJPkpDwSrAwHqV%2BseOZFpAW7zOsllldE09rOgHYzN0W2mdCLBVRsgPCPJRr%2F5Gddau6zCUgbrNBjqkAdFWGv8VYQfc5%2FMXGAUh9%2B1ptiZP0TcRVlJoLPNH0hsmA2m75Td7jM6TVS9%2FIY8wZoK25u4NUV5TughHLCv6n2%2BYUmbrJRzOieLJALKWOLGeIi82k2Z4RsoG5KiMkLJBCldFbZvSHS6ckO8p9kwf9BZygcWPW4coisX5ssF%2BRvHUhXGbCEguHPKR0DERC2WmPS3D4swGsKhOC%2BxJg2jctJti9h3G&X-Amz-Signature=d64502b5bfcee104e11b04d944fb57dc6c56ca2b3594b36370457526f60edfd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644PZND6D%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIHtysT%2BOvswF0RQYbpLz6MKs65BhS9fIl70N%2FbfSx3raAiBV5aFcCtynNVHAxBaXK%2B2u61X6IoyTiva%2FIqTzetomdSr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMWS%2FXVuZd53UzxzolKtwDNx15HF%2F4sJgxVp4oad0EJMRFUjitzAEJxfAQ2eohgEiaHDpO%2FrsdtVTtl50Mo1zdKn9mnPewMgXvMRGU9cfmojVFtZCrj0AgbSYbcQ5ytzsBmHw6kqkCnBseUxHqdbuziawQ6aGjlk9vjtLe0XEEHjivQbkMdsZm09uVmFNykZX4hYEW9KOjdUPPqPfKRfFRfEP%2FRS3A3XUcoOFxVtJgVF3T%2Bg1Goa%2FcBqNUAyybnZ%2BhByPjtlRZhNMv7p%2FfO25KjZQjFE85TFg74w%2F9soipno4q2ItdRW1lBstLMXNgqeG8O5n5%2BDbpd5CGtDFvs0FzpbnryBQ2bET0oTG%2BTjeAH%2FXgWPwmhAPvp%2BP8BepMmmV4RI513CZfWiRstOEs1c77he6mFScQo%2BDjAzvYbnchvF%2BU2KzQbXUVE0h8Ud1jbeAjMaId%2F%2BHm5gJFw5se7RIzw8L6D7LXi%2Fogiadk4iQ82SjUiyLAqxKOKZ%2FtEZNSTlykKs8%2FdlU6GeMZSF4II%2BcldXRDpQS7tdDb62XHkzGSzTw5gbbFumCLbcfCUz4nppcSm9RykPc%2FXK8PLe5PqJls53U3mTaK6zlP2DMWUk%2Fkmuj%2FpFkAqEMtYzfzFqMW9H66IO7FC2%2BI2ZJZ7hIwwIG6zQY6pgEy1YwgSr0gZJk3zW4se5UaChmXDPEX29A91sT6L6YVigoudnkuMlQyripOXoklZPTTptKuOpth1jss0ycYmpU%2BSZHDxoJ9eO0mcl3kgou%2BVy2TBZrg2vn5O0mTkBFrkQlZ17iVykF4EcImzkwOwSu1uGti16G6g5lk9vGOJKWYeGun0EV4G%2FbTIkkTV8aQWyVNT%2FvG3bhswFwA1cABQW8ej75LaNZO&X-Amz-Signature=cad2eafaa97f8248165f349707dcf1828e3f6cced85c41ce0ec6d7d18c0e4412&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVW5A2RG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIFxX8F9w%2FxlrHsk8mWQZVEMlTexA7FspgluoH28RPaZCAiAI%2Bh7Te3OXfldx0sottRq4kYzK5yWwmsFOr4iKuuHV2Cr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMqMbRTeE3o9EnGum3KtwDDW9x5APcrwsgauJpm5i525dSi%2Bh2FMUCXnOacKLqM1hkeJ2eh%2BtXZIDJPEMoBU6Vg1YiVhEQytJeB0tykiQSuc949RwGHxkPIvdD4hgwjsjzPx%2FDywAgRSQaEE7WWiRmYVRJst19abPWdtKx94%2BM3sBdc1a8pgrQ%2BZrGRMekY%2F%2Bm4n5gHdMMyRgGRWVShPP%2FvzO5QyaKLz%2FDjQG8XW1%2Bjbx3PswGsIsrn8nJe3HHk5V41y2zhHFdrucrH5YT5Q7kkdMj6gKkOIPu63f4%2FmKDUf59jZ3CTExV1U5LUKaN9%2FAQ%2FVrI1UoP%2BfomvinNtUA1C9REDB163I%2BB0dT7bnTfb98NL%2B58eSK0XansAj7aWTh0UlvW%2BdNJJ23KM9VESAgAZBv3N50EAj8LllB7ty8bmUqDcuop1mTNFCBiGWW44CxNx7HgG4U4wwtVLpgkAGZ7j92ILN%2B9nhL1Skl9uK5BVf4DsxbK2WjahXmsCZncBijmhw4vbiz5ne%2BsKCoHQzGmjtMduhzICymm9X0pFq793kM9WFZGdItF0QrX9Wuc5nRLWiEWT896ll73WyXLJ4Ihbk5TCCqxDsvjx0mUydTGWzlWxGTFECSjS3kFezb0hYYiLnlrx9jmbc39q%2FQw1oG6zQY6pgEvsRCLww3UjxQDJPkLDSJjOdpfTxNhEaBUbaiGwzdBDNdmN6azo%2BbdVM0WUmDkwbyJN062N6xjU%2B572WuRr3H9HtIZSPVUx%2FL8a9tbPCa6QFehbwAoUJV9MSFLpfDGp%2BLgwwmLD1KrUOVGZzMFwFjahnrMTpcrWvuVWx4P4uWUC6XbHmSsqfCYjuhATaQD2KlSPKIkMbbcI62oXtABjc7RHBFuWF2J&X-Amz-Signature=2e36b9b27bdaf80b20cc8c2fed57ce521f42954b3af00b10545c56416cd549eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVW5A2RG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIFxX8F9w%2FxlrHsk8mWQZVEMlTexA7FspgluoH28RPaZCAiAI%2Bh7Te3OXfldx0sottRq4kYzK5yWwmsFOr4iKuuHV2Cr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMqMbRTeE3o9EnGum3KtwDDW9x5APcrwsgauJpm5i525dSi%2Bh2FMUCXnOacKLqM1hkeJ2eh%2BtXZIDJPEMoBU6Vg1YiVhEQytJeB0tykiQSuc949RwGHxkPIvdD4hgwjsjzPx%2FDywAgRSQaEE7WWiRmYVRJst19abPWdtKx94%2BM3sBdc1a8pgrQ%2BZrGRMekY%2F%2Bm4n5gHdMMyRgGRWVShPP%2FvzO5QyaKLz%2FDjQG8XW1%2Bjbx3PswGsIsrn8nJe3HHk5V41y2zhHFdrucrH5YT5Q7kkdMj6gKkOIPu63f4%2FmKDUf59jZ3CTExV1U5LUKaN9%2FAQ%2FVrI1UoP%2BfomvinNtUA1C9REDB163I%2BB0dT7bnTfb98NL%2B58eSK0XansAj7aWTh0UlvW%2BdNJJ23KM9VESAgAZBv3N50EAj8LllB7ty8bmUqDcuop1mTNFCBiGWW44CxNx7HgG4U4wwtVLpgkAGZ7j92ILN%2B9nhL1Skl9uK5BVf4DsxbK2WjahXmsCZncBijmhw4vbiz5ne%2BsKCoHQzGmjtMduhzICymm9X0pFq793kM9WFZGdItF0QrX9Wuc5nRLWiEWT896ll73WyXLJ4Ihbk5TCCqxDsvjx0mUydTGWzlWxGTFECSjS3kFezb0hYYiLnlrx9jmbc39q%2FQw1oG6zQY6pgEvsRCLww3UjxQDJPkLDSJjOdpfTxNhEaBUbaiGwzdBDNdmN6azo%2BbdVM0WUmDkwbyJN062N6xjU%2B572WuRr3H9HtIZSPVUx%2FL8a9tbPCa6QFehbwAoUJV9MSFLpfDGp%2BLgwwmLD1KrUOVGZzMFwFjahnrMTpcrWvuVWx4P4uWUC6XbHmSsqfCYjuhATaQD2KlSPKIkMbbcI62oXtABjc7RHBFuWF2J&X-Amz-Signature=2e36b9b27bdaf80b20cc8c2fed57ce521f42954b3af00b10545c56416cd549eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZX6NO3GT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T093410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCKTbQ1CofTs9iI9%2F%2F6otcr3%2FZMOWRSmdyEWZZs6E0w3wIgBUGbo%2FvmLsLaHdZDVvHGf6iukXdJsg2D1qyAKc8rGeQq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDM1EVtFQhsiHFJ5OKircA%2FcxGpG7gTKnsrC5kd9ucCGm4VN94S4kmWG%2F0HpRCuNE7lOfJ%2F4vWFMMy9fdTiOSsXpTWrJMRVwb3c%2Fd2Rp%2F9l39gKqy7N1ikHwQ6wM2HKeW%2BZ7x%2FQgdBPFgU5eOBOgg%2F0j3gcG%2FRBxRfAFWA6cMjFTvnKGgxATPCAjOH5Af4isR8bD1GSza9YLnyn3UbdXcp5AiALiT5uy7fuEKZq%2FjkmHslNjL5oTwdHLPZrE4sOw%2FUMNXWB6VPwkF8LXn5L73qGnL8rz0hRRZItWn4m7reYwikxt7Jaly43eetTotmhK8U3Bw47IidORVLBOoOmGASg1OQ0q1KcVSfEP88%2FlFbzMcKmtsgAqqVTLdmZ4jwMhWe2a8uXIik2QX6hX9Cj1brgHtUs4N%2F%2Fo7CE6ZzOnMSLJ72Iw29agElFa3TypqYmavkwUn60%2F97KPdoCRfT4VPbGvIUiPY4pV7yJfpUrpjbxepICdxzPsgT873tFBJBhaVGjXTOHvtQ2ReWhd6pB1uBdAzonOlJBBxgvJN%2BVFEJKZTEzt5wNTtVc0TzDuk7UNgOuMyBd5api7Pywc7H2RaUGr0siqBIglVkQ9Jygrfo%2FjrbsKIZZGoJHNagKmkMGMEibPd4kTwxIgf9YmpMOuBus0GOqUBLnFP6ulr720THBYwhFumlY3U2XC1jsl7cs3x%2FtWlEASqZo%2FV7GNoV7RwDSELtJn%2FrXIW%2BXRSguf9EMQYWJOxYt%2BRpAQvRHCy16hIXH%2BxcMWIQbhSWGuXhQVHPPzr3gAzbd6w3OF9NoK0WDiaKL%2F4dZVc09Eux86%2FKkc4ahIPBLEhFulbwUKcpARdtnpUGGWw8f0iVBGj6Zd1iL%2B0FqA7K7g7oXfz&X-Amz-Signature=b6960cb8ad1f27c054660d4de40f1b271a4a38930b306726c42f3d0ee0391816&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

