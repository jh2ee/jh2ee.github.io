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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGEQJHYZ%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHKUBDoF8eXEDTtgiXfCSZFd44ld%2B6Wuk0m5WmxZEcGYAiA8d280CcXpLUBishQiYY9%2FPKSYJ7IkWAkMisubEqyS5yqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfihkr8kSWP9ac7nsKtwD2Jc5m%2B%2FDy9W8zSeMZuybz82%2FLYKn0MrbiWrCH5l11s%2FIsA7QUs9Kpf5SZd7LrWrHtCDqjl2q%2By65%2FMDh76jBnp%2FsX8gFerSiju9lJJuX%2F5c9BBheKMzWC5bwJSA7Iv%2BWSejeI%2Bx1tn42pStVJh86j8QTMaTz0OUUj2tVOajNhpvQw%2Bx0OrsL14ZTyqWKHLGKMFI8M%2B%2FQVnfdb%2BS3PPkXp%2Bkn2zw0xAVvjkRIT8y49wgTVTOBtkVWS9UV5SGQIy%2Frb81LkEUFxbSNkugJlk4yA63fYVeJ%2FaDODhfChlymlCfKKNQqFOiU9lWsdp8GvossT96%2FgRquijrcZxPJD5YhFuyMhl1gv9OX9NXjA9ghfwPBbfpwy7iFPicTaU5aTy8ooeEfWdTX5D3u%2BPF%2BAwYaqpK4tqFg%2B5bGJDrv1%2FiqVQbvtBqD1I5tlHJZcuoI2H8Xd4HoYB3FVOcgdZ7aJM82X7Me4YiiuNbS5YTUd%2BVWsDhXm2tiYVIofXXiyVbNpd40lOr7aWKZW2TgEYT1SISXT6K4V75XAUPA6B9tAYNovPGB1qA1oTG1OC7McZKDaIWbnkHGpMPMiw6R9lhpQVnCL15A2tjsyQZMvVV1Cl%2FVPF6rV76avhVtNMrldtcwgoy9zwY6pgGqEUPWPQEsOhvMy6pDJyEIMwAfrWYn1HFy3mjKXKZt3I%2BufAwi%2BmZJp%2BVodWUsHdtT3qtDuMaYGPAgVESOZ7mir9x1ich0MkDHq6P5aJO5AIKPujwq6E%2BTxAymuMctHnMYWV1nB252prxlwKt%2Bh5emgt6WwgmGZY1BfiYoVzTlR%2FMpD9GqRh7%2F%2BWiYEbkmLCooR3Dpr%2F0csSVODWDyfhQUqr%2BPvsZQ&X-Amz-Signature=a30ed8b5a37f9410e9368ea2cf530f968cda59fd8a5cb8ef9cfd1491ecaa5836&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGEQJHYZ%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHKUBDoF8eXEDTtgiXfCSZFd44ld%2B6Wuk0m5WmxZEcGYAiA8d280CcXpLUBishQiYY9%2FPKSYJ7IkWAkMisubEqyS5yqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfihkr8kSWP9ac7nsKtwD2Jc5m%2B%2FDy9W8zSeMZuybz82%2FLYKn0MrbiWrCH5l11s%2FIsA7QUs9Kpf5SZd7LrWrHtCDqjl2q%2By65%2FMDh76jBnp%2FsX8gFerSiju9lJJuX%2F5c9BBheKMzWC5bwJSA7Iv%2BWSejeI%2Bx1tn42pStVJh86j8QTMaTz0OUUj2tVOajNhpvQw%2Bx0OrsL14ZTyqWKHLGKMFI8M%2B%2FQVnfdb%2BS3PPkXp%2Bkn2zw0xAVvjkRIT8y49wgTVTOBtkVWS9UV5SGQIy%2Frb81LkEUFxbSNkugJlk4yA63fYVeJ%2FaDODhfChlymlCfKKNQqFOiU9lWsdp8GvossT96%2FgRquijrcZxPJD5YhFuyMhl1gv9OX9NXjA9ghfwPBbfpwy7iFPicTaU5aTy8ooeEfWdTX5D3u%2BPF%2BAwYaqpK4tqFg%2B5bGJDrv1%2FiqVQbvtBqD1I5tlHJZcuoI2H8Xd4HoYB3FVOcgdZ7aJM82X7Me4YiiuNbS5YTUd%2BVWsDhXm2tiYVIofXXiyVbNpd40lOr7aWKZW2TgEYT1SISXT6K4V75XAUPA6B9tAYNovPGB1qA1oTG1OC7McZKDaIWbnkHGpMPMiw6R9lhpQVnCL15A2tjsyQZMvVV1Cl%2FVPF6rV76avhVtNMrldtcwgoy9zwY6pgGqEUPWPQEsOhvMy6pDJyEIMwAfrWYn1HFy3mjKXKZt3I%2BufAwi%2BmZJp%2BVodWUsHdtT3qtDuMaYGPAgVESOZ7mir9x1ich0MkDHq6P5aJO5AIKPujwq6E%2BTxAymuMctHnMYWV1nB252prxlwKt%2Bh5emgt6WwgmGZY1BfiYoVzTlR%2FMpD9GqRh7%2F%2BWiYEbkmLCooR3Dpr%2F0csSVODWDyfhQUqr%2BPvsZQ&X-Amz-Signature=a30ed8b5a37f9410e9368ea2cf530f968cda59fd8a5cb8ef9cfd1491ecaa5836&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMVETXFN%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDL%2FxLE9RagdX5%2BpNdYzwh4E5u6EWGMCuSx7XDyg6h0AAiEAw%2Fu7PRM%2BP6MDOgnLwLHhiQKPLRafVVUM7zkLmHptJQEqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHeVEOJo%2FJ2WZH1mCCrcA5tkSdM%2BImA5YLR5hxgdiOSJkMzDnHrvaiAvTdtQ87ovot5BG%2B4WwY%2FU96egIai%2FwEgTDYKKTU8OoZ%2B4PBgOniRVwcKmvFkNP%2BMVX6F0m6wuQ3oTWOK6lPCQ8R72UQMhIyOze3x4L%2BwBQ1Nmq6gJzbw9k2MJCboIjoSqI0BXV%2BzgrTA%2FYPk%2FkXGgMEB%2B9sarBegp10KEhSGb6mNz38OFd9PtViB4WhPPVzO2Gd2MD6Pj8akv2J1ZPbcUjomg0cXhU%2BtbDoaAP4Ahx2uYaqBL3OQ7rcQAKYRjzZ%2F8L%2FdR5mxHhzDULeJklZNVwDqG6PmkKjtKBspn%2Fn4K1R17c3eboyVFbLkj30eIl3olKOgI655dZmcoZswFOtyu7j%2F0qUzQSH3GPwux1EXP7adJKMMrEL%2FfqyuEPjlFH%2FP6K2jb71vy1MgbzZG7a7pFc7U2%2FfC%2BT0a3EkZ8yktXQ1QayPyhjQnUvZ1c9xzTP3ABZLmUUz63LeJhdbRWOByz1jxEDu8AdM7IyL8KgL3VZ5zWilzjw3XRqZprF3rE%2BmTxfamkiIk6HoPHEojK%2FRp2NV7%2F1Y5PkZaWrGLEkK5lSskeqk8HdlJf17RizkB9htCup%2Fwbhcs6L33cGfSkM4RkVk0SMOeLvc8GOqUBOw7wpNv6jR8C8q%2BRtOjNSR0ZAnAtp7zOPdryWW802v1opsx4L3wLTLS0JRMjUo6xc18sm6%2B%2Fv1OFpM7ck%2BkSqF0VCNjBdHNNY6wD98XxcIEvyJObDp%2BThFHjpsRIm2SvNrHgLAYI6%2Fuv%2FjLvAu5CB%2FQVAXoKIEIMuTMqS7C6M%2B3RDmPyk1%2FSdo1OohmtdcJHfx2oxn0aFrkunSwu5pvCgd2QM%2BzR&X-Amz-Signature=406215829f5e6f4ccf7715f35adc962bd2d3c2c4ccbcb603ddcb34f65819c372&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STEBXAMZ%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCShtcjpo%2FYo6%2Fr7YGW2DiGaM2jMsD6hiChW0iU6b8ZegIgcRwyl69U80ygswPW3KuoJvfFNkWGp733dY7movssIooqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAzPvSEiB9bV3CCdaCrcA54eaO7C2%2FO3FDBjJyUUR6RvnK%2FlaQld%2BUUi3sylHojofScGIUERpgItmrnWYWhAHSM9XNlI%2FDH9saJdmhww6%2B2eWdKBpCKUiBth3DPuwFCyJrD6H3LT74ejXd5eq6I52xt4JBgO%2FB3chdIlVWEKpOxSXjsSWS1rq7P200OWrSbkKkGYhRKd8d4DBeVMDnwNzKqCwW2zsd5oupXD4tPaxfbdPX6WFCL3EDAf6cSYzldY9QqumFG7hY2bK1AxytEGpY7CcpHy8wDfKgi45op7w9Zf%2Fg15AOraAq2OoimnEaZeY8SAES3z4uXN4H2LB45gRj9y3w4fe4E%2FV8GBop3VQk7NdIESNVPZAG9Bix38Ud4UB5RIoj3cG%2FYh%2F%2BfBwi5K5ZKgHssYR4J%2FZMCmcb5porDfjl1VQx1Je014U6g1ZTnV3USrraI4lb5%2F1ErzwSRxsuWkggiZqhyYNIu69250h%2FpI6Fh1OdNt0DOhhZ%2FuO1ZZ83P%2FKp1pzErxXY6v4OpyB8RXEhAD%2FNz1g4bxy6QHU2fzmKmFsn1DqA410FlK8KaCFjzf9%2Box3DbelYM2ReXoT3UKCzNhNP5MiDmZnAoF9TzajGk%2FSI9wENrJN9d6ULHIXBz%2BDOzWrTRRWqr6ML6Lvc8GOqUBVZ55V%2FxSXAHsWzcn5tea0sDWVvaltLBo%2FzGRAEkhNA1NJHh2QwZWxvoq6YT4ZZdzGNY1RQxUHIYWiwjuwiQXjNmbSwehzWAR6546uV3NGE3Zzqh6yjO8s%2BVP%2BEMUIZ5xy%2B2mfUoY4J1r1X8Jso2GO0vHwDMnjL%2F8G%2F5hbUvB2VhCIoXH85%2Fqw3lY7vW%2BZbe0lcXDwJ9cFgYsAyY%2FE5Ii8rbEJbx3&X-Amz-Signature=54c0cddb5cc9d061b742f17f4597bc0021195df7465a9ddf15b1130fc8d36929&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STEBXAMZ%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCShtcjpo%2FYo6%2Fr7YGW2DiGaM2jMsD6hiChW0iU6b8ZegIgcRwyl69U80ygswPW3KuoJvfFNkWGp733dY7movssIooqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAzPvSEiB9bV3CCdaCrcA54eaO7C2%2FO3FDBjJyUUR6RvnK%2FlaQld%2BUUi3sylHojofScGIUERpgItmrnWYWhAHSM9XNlI%2FDH9saJdmhww6%2B2eWdKBpCKUiBth3DPuwFCyJrD6H3LT74ejXd5eq6I52xt4JBgO%2FB3chdIlVWEKpOxSXjsSWS1rq7P200OWrSbkKkGYhRKd8d4DBeVMDnwNzKqCwW2zsd5oupXD4tPaxfbdPX6WFCL3EDAf6cSYzldY9QqumFG7hY2bK1AxytEGpY7CcpHy8wDfKgi45op7w9Zf%2Fg15AOraAq2OoimnEaZeY8SAES3z4uXN4H2LB45gRj9y3w4fe4E%2FV8GBop3VQk7NdIESNVPZAG9Bix38Ud4UB5RIoj3cG%2FYh%2F%2BfBwi5K5ZKgHssYR4J%2FZMCmcb5porDfjl1VQx1Je014U6g1ZTnV3USrraI4lb5%2F1ErzwSRxsuWkggiZqhyYNIu69250h%2FpI6Fh1OdNt0DOhhZ%2FuO1ZZ83P%2FKp1pzErxXY6v4OpyB8RXEhAD%2FNz1g4bxy6QHU2fzmKmFsn1DqA410FlK8KaCFjzf9%2Box3DbelYM2ReXoT3UKCzNhNP5MiDmZnAoF9TzajGk%2FSI9wENrJN9d6ULHIXBz%2BDOzWrTRRWqr6ML6Lvc8GOqUBVZ55V%2FxSXAHsWzcn5tea0sDWVvaltLBo%2FzGRAEkhNA1NJHh2QwZWxvoq6YT4ZZdzGNY1RQxUHIYWiwjuwiQXjNmbSwehzWAR6546uV3NGE3Zzqh6yjO8s%2BVP%2BEMUIZ5xy%2B2mfUoY4J1r1X8Jso2GO0vHwDMnjL%2F8G%2F5hbUvB2VhCIoXH85%2Fqw3lY7vW%2BZbe0lcXDwJ9cFgYsAyY%2FE5Ii8rbEJbx3&X-Amz-Signature=04a551692375a350533eab3f0a149051894c425b5d11c9d26255a823986393f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPCUTBOF%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqDtS0T2MvpijhGm7CICC8o7XEwu172%2FTmBGhQo6WiUgIgUqj0hqtTTsqVxiIbK2CLqWixkiUoSZXubfn0qqGlxqoqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEpunzzZGK6JWBNKdircA27bNirwyA1MM%2FAbaRSKVzN8gxzpor809%2BN3ajmz5gkVG8JZwPrh7hFU0uZjrJGTBsbzEPAJOA0HZmkAJcwoaZCd6uNFRBmB9NsyY1HaAgKIod2k9U0vSUeXfoPNaYgS0D7hEo4vkx8%2F003buB1XilgxjN2pv5tklwduI0tJpPBaUBli3T%2BjfOeLu1rRViPranudN4Sg%2BtlxLi0P4yRtEuU19JFhKATjjQv6imO1AjiJiFTCwag1AkFkcf%2BknPyTArzkjmOBVTT1FqkzLT3WMgkGlnzvfjsCmlv4hAapg51jpz%2B6K5BexNNLN99H%2BOlzmZwl%2Fo9vJsE6BupAGaJU8nC980bcbFf4RJWhJno5aTIkFYbOrRLPucd%2BBPnhNwG1fVQQNoPhKbChswqy0HqAZNE8ks7vqJIRsDDk8NTf3%2Fi%2Bg3GetxhjX4%2B3XOkmrlKr3jCQHzq27yI1fzop7WZZbCP4X7wAaR%2B%2BSZzqG%2Bg5QPN6vxL6T1mt7gC%2B9BImhM%2BG0pdvyXEBiSv270mdqMskSGbsJW1DtBH%2FQUaYj%2Bk7%2FhRnZ8YXwdo6jmZ5okUOciqVGCQlGEZuTNcWZi7dsjToJPh9K3VHeVNQLF9k%2Bne3I4fERZx%2B4qMg6dC8y6dLMOOKvc8GOqUBzU%2B23WfPeSD%2FOyiS8tRYONG%2FLwhbNUqF%2FIKzfObuXv7It%2FFsem8vHpzqOL4cbddkAKQ7QhYUELAJo6NFv09L3FXxcBHJoV8XXgsaSoRLeytHvk2sW%2FwhZgyT6wIRakJNrmTVHH8vm2a84MyW3nHGLP9KFI16531PTBrfSP8lBsnPMmj6lIRIdhnRekRo1kjMDC%2FNF8UGjplEHrkvMY7EitX7Ck%2FF&X-Amz-Signature=0dd58e4ec1138cd40ed8f0d1e46352f495dc9a29953db44625c9483ab522f40a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYMAYGTM%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCo7s053OEX3PQoPoj6GOIwuNjvWKUcxiLY145h96d3ZwIhANs%2BvYhcQb%2BDcsVgoFSlFdHRPQ9Lp2kTVIcwEwvhf7zPKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyMyrRbZZggHNDAou8q3ANeClHMDEo8GLf6YYiYTASS2Vg9jnktLaJcJ8DruxlMKFQAXGae3GmIjMfrjKweeUA3FmphktwXAGL9mr0%2BIQIoBysMo%2BTYaXEUpnyQVF2TVDXnaApJlm%2FbQf3NgybuCqNI%2B99hUADZRogrJH220MjGS8xIY4j%2FyS022Ci9UmzTQfFf07R3tAcUD5YnzKjj%2Ba8jTqwR6eaHap%2FC0g9PKQtBVVmDTJoZp%2FKWAgQV7t2VlmjM5t5vHefMkwqOnQ6zl29SDXJvTslrh4GxnvICHOOqk%2B7ds7fuyxxkC4FMTEZRxTrtM6SYNeCpMdlkJfV4E5eia0zYkiafp4BzdJ5o9he%2FZfKZXqXhmQl4SbvKKekp2pRid%2FquAy0ftnkJddwJ3IUxqDFt7UcHx2gQ1%2BOGYp4vnF7mRBIOGNgnP4i2j8OwCnfVAV4O86vYcoAd9s2gJ2V7OUinTJHfTHrUiMO%2FtC6YJ0ahPIBCz60HXVDrXGgb0TFC2tdvP%2BmKVYNmPllk3rpiD91tBEs1bvCv0YQzgi80rFvpaKIsQhIbVgkwCtadxlts0RETc%2BoNkTmyN0XMDhQuBxiokfo%2B0LDXOH839I3KqPuBZT1YE04vRgWC4bUtPdOi69rsSPj3b6LuOzCYi73PBjqkAahI%2BCZ2%2FwPnF4fj00ZSg2JMTFe4FtkRWFGfFqM4jRgItA7U5SYgbOKO0qCERziELYNJ0%2F15ykRtELM6F8NDfs7DKRfJNOvu4rfIEqnBC5Es%2FLk6Yg5YtLzgZRbU0EOKAfm8CDvHqjLxkX3lHq8ngZWy6MSvyzsTSSyDWDx%2FdNQrGpwf6smoSq7b0xypbU%2FeTAprXSg40QsIDUX7wu5zlBmSShns&X-Amz-Signature=3ef2183996bb5c95873e315cf8fdda585ee471fbc9a90e631cf667f79e01cba7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QL44H4Z2%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFGBpk5Z0%2Bky9khXDEdjBHfnEcOkliE4zlCJtKwV3GuGAiEA0Dkh9xyPM%2BtkGfDUUIAuL17YYFUp7y71XMM5ONMXwdcqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC2urgR4UiW9s9o%2BxSrcA4z%2BZ9%2BREGhZ3xySxu6apWSJbT97pl2Zi%2Fg4qqlSUzurgUar6aAHWhWk61UbMKNuTw0KJ5cQrK2RaFnldMgFGClJABGzrQKjGTCDG4%2FT7HC8rTI8bzv9CLYUKhPehrVAh5oHGunznBqDZE6zrI9nNyYbbqjje07y9A9NQOrUT1fjZSB5Vy5BpCBTErW4pdwyHm36u0xoDCrAIuuD1Qj%2Fza22h4pdhpl9%2FxpnBboLv9ESlijfFwZRUYXf1ROvX4O%2Beqe5kgdqzzoGj8%2BXq0ZBjXc1QfRO7jIY1fARXQyPwhxN4qlcCoC0w4h8Zl6pfgWD5TaSjhEa51o6kM5QgnHt1Y73saTvXj3XyUmj9FmV4ECz9lBNUbrWPXo5oT6gbNHv7geYYZbbgngO7gpjZmT5RGxmbmmrbdsFiqYOK87R5csgKqcTL2V3DKhM6bXjBnMqoa0g2x7dfpqWwfPtfDDhzFDNYBzQN%2BhiGugc52ZRLmrec6x1q1i9W%2B0GBIIPUInfqpUNyMbT5zLXt4XREmpqBgHMu6lgGdnvmWaFtNOMTv%2BQOB5fuQ6QpeWfaTGVPsdZgGW0lu%2Fi75V5aEETKL1uz6Ifm%2F3HaxtcxJAo5yj4CFKMTqYPW8La86wUf%2B%2FeMN%2BLvc8GOqUBdtLLN0y6gOSaroRkgggvpF5boUnx5GxEacOGzp6hGSjgMWali9M2hWB4cpPixx9UEXPNX4mI76ZfNAzuLD%2B%2BN30ca0remKTf9tLfEqObOgdMDJrmkWyoU5lY4ft%2FLnULEkyRGIWCpQWtJraCIjx46Srh1pTfzscGYo7gjomZQmaTtyPHvTUUevUJI1kuRkQnhTSgIfvsyJ5jitqRkg2t%2F0jhdaci&X-Amz-Signature=06cc4930e67237a3ebf2cfd0636815cace989d337472f4153bb7c04ee30f87e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6O7CDR5%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICybWWRRFO3N7J0D6P60AyHiSP5eA8iIB%2FcKGTCg0B8rAiAuwEouY84NVxqiN%2BTUBjbKNAgmvEVp9Uj1q5qeXW69ASqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMS6k%2BNglA9012EA5oKtwDD3T%2B%2BmKD%2BEq3IyhH5WMTZgBEJu1apsRV0PIKTis8e%2Bu8baTBhbpg13kCZt5F3bWsqi838K61a%2FlVrO91Mj7YeoCG9P9hS2nduEPI9EUCPwufN4znxZLwLVWq8oopg89poFEQUgFaMxIDg5LX9h7aOV17mTiNrlw49aVxwwNj9E8%2BT66xwbM1t048bMInVFs7wu%2FFv%2FILnMqbtiVA%2FRQ4aoaGuYkZ3zOYZufIc6xbP9Af4c5JMT6aVFqDY0Ioj6hi6SmturURa%2BUDaAu4KoHddpZjgprpucqwNYg4OntMINPk7AqEp824D2h15JXpFYUBqCTQlJuMC4zY%2F8rjbvOK2UpNdHMh5udxUZ3b6TJ6HRDmSZzQlmvQCqFl8SSrvg3ipS0Z%2FuiphGsLFsvrjOoDID4xo6dxFtVls5MaNtMcVCna979cSRuuScOPk33nUNyNSLeV3mnov4QP4UN4BQ9IkYgQ4Q%2F1yRmzlnKnSF94ck3ldkNd08EBjpfBQH2zK%2BbYGc1mLt29zk0akyR%2FITsSfPeHOL3hVvehlKqAaSdMMLn37CVs6gkF1dVeZIHWNacdcPf3LHht1qaCyLW%2BXStTDYS9QqQcCr3xztRW2ZYL6huDSagrnhVRQllzS0Mw9Ym9zwY6pgFYCUDG5h8Vhgu5vWXgAf2naqmyiMNLIogv3GZ1wLUWGPKczCcmUujdI%2FV4dfAYByLjcfZJjc1zmwHXyMXci4uYZpygPWlysl1pKFtcLlhUeLhzi4LpXbSHJiGp8ZsO7qJYPDV%2B%2Bf7oyQqMPjnitHoZHffmG0M8wFXxRPppvJfWJqaiqJKft8fJCSFiQELGhDtRcK3DFn11rTydpc18PxRt2TbOun21&X-Amz-Signature=30f911a2c5bbcc4cd7df70d7c66ad3651b69a2734210ee119bef27eb7258a911&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6O7CDR5%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICybWWRRFO3N7J0D6P60AyHiSP5eA8iIB%2FcKGTCg0B8rAiAuwEouY84NVxqiN%2BTUBjbKNAgmvEVp9Uj1q5qeXW69ASqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMS6k%2BNglA9012EA5oKtwDD3T%2B%2BmKD%2BEq3IyhH5WMTZgBEJu1apsRV0PIKTis8e%2Bu8baTBhbpg13kCZt5F3bWsqi838K61a%2FlVrO91Mj7YeoCG9P9hS2nduEPI9EUCPwufN4znxZLwLVWq8oopg89poFEQUgFaMxIDg5LX9h7aOV17mTiNrlw49aVxwwNj9E8%2BT66xwbM1t048bMInVFs7wu%2FFv%2FILnMqbtiVA%2FRQ4aoaGuYkZ3zOYZufIc6xbP9Af4c5JMT6aVFqDY0Ioj6hi6SmturURa%2BUDaAu4KoHddpZjgprpucqwNYg4OntMINPk7AqEp824D2h15JXpFYUBqCTQlJuMC4zY%2F8rjbvOK2UpNdHMh5udxUZ3b6TJ6HRDmSZzQlmvQCqFl8SSrvg3ipS0Z%2FuiphGsLFsvrjOoDID4xo6dxFtVls5MaNtMcVCna979cSRuuScOPk33nUNyNSLeV3mnov4QP4UN4BQ9IkYgQ4Q%2F1yRmzlnKnSF94ck3ldkNd08EBjpfBQH2zK%2BbYGc1mLt29zk0akyR%2FITsSfPeHOL3hVvehlKqAaSdMMLn37CVs6gkF1dVeZIHWNacdcPf3LHht1qaCyLW%2BXStTDYS9QqQcCr3xztRW2ZYL6huDSagrnhVRQllzS0Mw9Ym9zwY6pgFYCUDG5h8Vhgu5vWXgAf2naqmyiMNLIogv3GZ1wLUWGPKczCcmUujdI%2FV4dfAYByLjcfZJjc1zmwHXyMXci4uYZpygPWlysl1pKFtcLlhUeLhzi4LpXbSHJiGp8ZsO7qJYPDV%2B%2Bf7oyQqMPjnitHoZHffmG0M8wFXxRPppvJfWJqaiqJKft8fJCSFiQELGhDtRcK3DFn11rTydpc18PxRt2TbOun21&X-Amz-Signature=fdd00b2d625a80329329e73d97486e6daa53452f0f629d2f23c615dc3a1f01ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SZ7VGGO%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBtMoR4LyrKy3YlaKPCqSFdzPl4z%2FVv%2FPOEo0b%2Fb5hSgAiArp04cCWJM3FqA6BYNWCettsb3zJjDDwOuH0w4J5fR3yqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMukkmKBqoxXgVzlFjKtwD76DUc3A4baPtpIg%2ByRzIzL76PbuIaRSvo3r3b7aLbUqP9OfWISC4%2B3Ri94cvz%2B4dIRvR3qNy4qxjVj0YGHsR7tZNaQSuDrxtyU24iqpHQ%2FHF%2FFlcV%2FR98KkCb87xBZLEqxxWvJOwvJgMSW%2FRbDEQNbrwk5HTyrO4YrRC0%2FPam3uN0fu9lYfuvICwWRsB5M9IO2XRN5KbnUnOd9LXxJE9CH0e0bGoEtUMzxGMKO109esYtqGiiVmKq5%2BV1JVTkgMrwyOLLYuIhGhLE9oCpEfW5ficts%2B3BGL2zTe22Y%2BhLAVI84hcEJaJkymmYhIjWNxEwYVJErLnpxYx%2FFmpJv1OsLqFuMwo5of9pRdaZKNsDiOUAAPytV6kAGgiQkkss1pET%2FtNlE7ZS6Lx1%2BTVD%2BcMn6ukwMW1CHIl8Wg30VMJcM65wukHR%2F6VJaT4IdOQitLkJ8AdUUfpgqAhrSyAvxzLUpA0N3lqjXQYq4KPgzjPjoZ9%2BpXkmta29r7yl9uSYrlBDy8G%2FnPXLKJERqgc%2Bwj%2B9dT3FCNt5j8I%2B1DxveXEZvNBVG%2FeSvIKA4U%2BkTp9r9UlKYH%2BIvYSyxJaL5y88XWfn616eE5teixZqqRBHR1Zi7Z2D2Kk25WoJ%2FRfZkgwvou9zwY6pgF%2BrobdkEqusaRuMDfXZDT57wxZ5cJrnjinEilN612353RxlYCVUg8aRWXYp75tYVFGbwSU9V4d9zILaITJXrueMf12KmQrGtpoOmxZxJlAjHlde7ZSfeXxP2rQ0hAkbv%2F%2FvCyQrSOxzrxuhi5EU%2BkCfBL4JvrxCdrJ9Xdx%2BlJQgxlQFG2%2BlnjxJIXqBKYMxXDZLinPJaLi162Ro%2FNw1HowqF3fa%2BzH&X-Amz-Signature=ea14e213ad8da90ff36260c6b3fa773049b7ae82e4f63986a6a464baa9abfe8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTIMRC6M%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYzERPLRkLaZ2F%2FKZWkVG4YH%2BDuHhMo6T1%2BQ5mVtgzYQIgGS329yYqSZUcrrVZ7CnhZX1Uxk%2FHMNHhuPDH6canFzIqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMTd5gKRMuuL7mz%2BTyrcA4X3AVZZGSoKiZXB9i7G9RiUmLEV8ieexfjwsqijglLmFuLiX4DluX8zlsFc9ijxITiv4mhLX%2Bzm1vZ3S3iAN1F5niCd4G1r352qzWofipw6QzsyRYAaMWolIiW9XXYHzElSWcAwMezRXciwhM5xUtqJxIrxT1u4iwSw9ecW1laV5Hl29rJasa1iIPdvPTsyz5xRks%2BLS54M%2B875Pb1Zk25r%2FpioIYLFuojOw16YMZFJy2%2FxsMAwcc%2BBeq5rQIW7R1DcIsFNWBJMsv5p9jHwivAL6qbpNP43t5Q3w9LPDSZbVq3Z29Wto9vJYaJj%2FfYg5UpTcnqgWzNgf3CIfdKPIUJPtPH8Pq50o%2BO0CEDCt4bz0qEecu040CPIJHUXdxqs25L2wzb%2FK7UXx%2B1IKDlzH1xf5dRgOlTyTti6hbtge2kAANTBPgwJjmMR3WCcI9ZpUtJAcVD1VnrqIYcVSuZJTlS5KRtp2VuR7oiYYIPEBxzJeY8afe1uGvRy80ftH25hxW1YcDbJIVZem7%2FW9YXOQ8pDtb0wRS9%2BRcjJ%2FUJbWyvK6mrH5a7MfEZM4JXVJx23u%2B3KfyG3FzAIMhzwFpn5ep0JBzlNEHNIqfnXUhTFxRynrIvmMK4L8vT%2Bag%2BfMIKMvc8GOqUBcyS%2BzgQZPOtMd0uBp%2B1mQ18LyQP8LBGLs5T94Go1TbxhAKrJUnsDuCrJToCw9Vl9CAyyJE3PfiZabTgSnoffrdGLLL598nM2FT2JlQHCUc4m7tepyHB1yKwd9REKBy1RZMfDDlx4zHzZWTlQC6IpqO4HJ%2Bv8%2Fk3ovuYqeh1pzphdCjM%2Bg9VNONxhVsHTVnocMkpi6D00DC%2FceSVm3%2Fr7YOVgTz0F&X-Amz-Signature=6382e6220e3f0a7433b27d7bf9043f3a4512ca7b41237178488d53576504e456&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTIMRC6M%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYzERPLRkLaZ2F%2FKZWkVG4YH%2BDuHhMo6T1%2BQ5mVtgzYQIgGS329yYqSZUcrrVZ7CnhZX1Uxk%2FHMNHhuPDH6canFzIqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMTd5gKRMuuL7mz%2BTyrcA4X3AVZZGSoKiZXB9i7G9RiUmLEV8ieexfjwsqijglLmFuLiX4DluX8zlsFc9ijxITiv4mhLX%2Bzm1vZ3S3iAN1F5niCd4G1r352qzWofipw6QzsyRYAaMWolIiW9XXYHzElSWcAwMezRXciwhM5xUtqJxIrxT1u4iwSw9ecW1laV5Hl29rJasa1iIPdvPTsyz5xRks%2BLS54M%2B875Pb1Zk25r%2FpioIYLFuojOw16YMZFJy2%2FxsMAwcc%2BBeq5rQIW7R1DcIsFNWBJMsv5p9jHwivAL6qbpNP43t5Q3w9LPDSZbVq3Z29Wto9vJYaJj%2FfYg5UpTcnqgWzNgf3CIfdKPIUJPtPH8Pq50o%2BO0CEDCt4bz0qEecu040CPIJHUXdxqs25L2wzb%2FK7UXx%2B1IKDlzH1xf5dRgOlTyTti6hbtge2kAANTBPgwJjmMR3WCcI9ZpUtJAcVD1VnrqIYcVSuZJTlS5KRtp2VuR7oiYYIPEBxzJeY8afe1uGvRy80ftH25hxW1YcDbJIVZem7%2FW9YXOQ8pDtb0wRS9%2BRcjJ%2FUJbWyvK6mrH5a7MfEZM4JXVJx23u%2B3KfyG3FzAIMhzwFpn5ep0JBzlNEHNIqfnXUhTFxRynrIvmMK4L8vT%2Bag%2BfMIKMvc8GOqUBcyS%2BzgQZPOtMd0uBp%2B1mQ18LyQP8LBGLs5T94Go1TbxhAKrJUnsDuCrJToCw9Vl9CAyyJE3PfiZabTgSnoffrdGLLL598nM2FT2JlQHCUc4m7tepyHB1yKwd9REKBy1RZMfDDlx4zHzZWTlQC6IpqO4HJ%2Bv8%2Fk3ovuYqeh1pzphdCjM%2Bg9VNONxhVsHTVnocMkpi6D00DC%2FceSVm3%2Fr7YOVgTz0F&X-Amz-Signature=6382e6220e3f0a7433b27d7bf9043f3a4512ca7b41237178488d53576504e456&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROJ25LL5%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T121237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE9xJdAqfAMknwBh68s%2BTSYSp%2ByxxnnkmLmEzQy9T6d9AiBWQxle2fwAIOwEcsywWKL5dccobFoFFlItTxh1d6FVESqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOOi0UtAosInMvp8mKtwDPPdGgk6iROT%2FrPEgmxgkxQ0TBO3%2BiU1pFDOjZm7mmrHAmIiXzny%2BFsTa7UiNAKwDEVL2ZI6EqtvACwycuniKdmwB%2F03Yve%2FY%2FW4ZIhSGGM6xyWWJUTNEr9ETMYHg2Ya3jvumV0CPp1JXfXpQk%2FJyVsEWeb145tisq%2FXBiSuyvRfxjXuoR8FCLhHzWq6UDpk%2FpdNwD8U0UFPGaRCptNOAoPugiZX2f1cTqdNhIA5NSmE830mndWHNjHWFSmedmPLS%2B6YvouUPGPcib7vMoHzkNBDyz2DjHhnexWnz%2FFK99VssprkPg2oK1AZ%2B%2Fn8Pm7RydWrYwGL2j7fy%2FOm4yjC2qybfFJxfkhGzXQo%2FzgaB%2FVe8Df94qfdZAlq3nPKxrvAgkwYB%2FxdCNJGdmU%2FWQ3oI30HSX%2BEoqxVaeIPKRfWhoql54BRvppt1vTBPy9zdBrrRR2VL7njMV59nmq9KM9s94u51uRQczZRtBYq%2F5lzP9CoNOqntkv2kU8M25obVPIByDI9B2w7aOsIV123RiDGU4p%2Fq0HDyKaST5%2BSVx0LIR%2BK1bLaD%2F67jwCUycw6peT0W0t%2FuqvpQRBWprolgPbBvattXMN2Ee4cRF2h09qUF0wUifmddPfedf5vnsJIw1Iu9zwY6pgHk7rS97Uzfu8bVwh54D6czD0rRgy8rrqe7zUZp7XWs0opxxhD1g0yeoCrXf2mJbgh5b47%2FnKT%2Fz0mlaGycv8t0yBmSNnPxAaCnzPAjgHpXECCWDoMt9aqceRlbnCsmWaLaysSaRj7qijOOhwgiWU0uMQgYazE3rpWpHxtEBIGTY%2Bq6Im6zCOOU0jwJO3M7dtBJN3SOKW%2BzAhakCRGUv9O0dlzz8uWu&X-Amz-Signature=281f76feb78b08f1e73927fab24d779cb54e64f4413b40a5a67312bd4f8ef521&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

