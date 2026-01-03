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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RPFTYMO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCMIuLW4zz3ZX3DpOofScEf7O9NpPVAfNgMCXaEWNdIXgIhAIxC0kuLXJjPdGMvaVAFW7JrUn9JZUEmK%2FqQL1VKEKOtKv8DCBgQABoMNjM3NDIzMTgzODA1IgwBvRqD9vETELNTNmYq3AP610YfqbSGV6oAobZ218M%2BVzwI0ukNcDYrQ%2F9jqRnCi%2BIYDUfjDlwgFVTJWEXMLJToU8RRBUg6sRpYs61CYQYyz%2BrKj910so219zdfKeNZJb2Mv0C7%2BYCZgttPQJjpVRpOsNNNj6db5nNsXyTzQk8PWdG%2F9vj7Er%2FG8K099SY0KsfO0fJhnMi8ucjHegFmLDLftfSozdyA0FHmQuFGqszbG9e5468wc6raQCHCYL%2BB6G%2F8EHdI58ayzjN6kTNy1Iowc3qaQ6%2FBsZJ87PDE41chRdRvm%2FHFz1k9ac%2B6obtVP6ynOJdNgHBqTamsnUWkp40VeFtFcLubTuFSc7I3y3gNrDLs1uBNXSOca%2BSvT%2FDF5pTTz15JlxScs0nLReeQmNif0AP7Y59hOI%2FhDPBYlmRQ2n6%2BsFdpSicb%2B%2BaBhwsEWedi0tM1ImIJcTQpie1SlZjJekEmQ6RwOaokanbPtFzuv%2F6KiN%2BO6kbzQbaGi5JF6v9JhWsTu3tqIypKx79eNqv5LIwW5X73rnKJkllLpOwys3AqkQPgQW9Ts1nV2vUbfzNs%2FbQr4q2Kb%2BXGh2WhA%2BQDNDo6pjvMsemkRhZSxxxPiTZlVv50FSB4Tquv6%2BzvqbfiKMRKTblVtOUQVTDs4%2BTKBjqkAUqcsqKXTOz0DWRtOc9dntW52UB12jc7T%2Bj9e2QEuqozBK6y%2BV5SGz6ENzxpAlqC6lgeWMAVdhvj5jEIsjTZKhRApLuFfFlWUzfX%2FU8sRP7vjTtZ3sfMweqmz%2F5bIHl5MkeXBPaBPwhDjK%2Fb3sFhx0xFx7mzIMvcUbIkOqdvPJ1heu5ThKYs%2Ff9pM%2BbTY9debE9HIetn%2B%2BXM7lFvLOyRWYEs%2BeXq&X-Amz-Signature=b306f83ad452c098fceffdbd032987670de12c2d10d2e1da8744740b214efb89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RPFTYMO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCMIuLW4zz3ZX3DpOofScEf7O9NpPVAfNgMCXaEWNdIXgIhAIxC0kuLXJjPdGMvaVAFW7JrUn9JZUEmK%2FqQL1VKEKOtKv8DCBgQABoMNjM3NDIzMTgzODA1IgwBvRqD9vETELNTNmYq3AP610YfqbSGV6oAobZ218M%2BVzwI0ukNcDYrQ%2F9jqRnCi%2BIYDUfjDlwgFVTJWEXMLJToU8RRBUg6sRpYs61CYQYyz%2BrKj910so219zdfKeNZJb2Mv0C7%2BYCZgttPQJjpVRpOsNNNj6db5nNsXyTzQk8PWdG%2F9vj7Er%2FG8K099SY0KsfO0fJhnMi8ucjHegFmLDLftfSozdyA0FHmQuFGqszbG9e5468wc6raQCHCYL%2BB6G%2F8EHdI58ayzjN6kTNy1Iowc3qaQ6%2FBsZJ87PDE41chRdRvm%2FHFz1k9ac%2B6obtVP6ynOJdNgHBqTamsnUWkp40VeFtFcLubTuFSc7I3y3gNrDLs1uBNXSOca%2BSvT%2FDF5pTTz15JlxScs0nLReeQmNif0AP7Y59hOI%2FhDPBYlmRQ2n6%2BsFdpSicb%2B%2BaBhwsEWedi0tM1ImIJcTQpie1SlZjJekEmQ6RwOaokanbPtFzuv%2F6KiN%2BO6kbzQbaGi5JF6v9JhWsTu3tqIypKx79eNqv5LIwW5X73rnKJkllLpOwys3AqkQPgQW9Ts1nV2vUbfzNs%2FbQr4q2Kb%2BXGh2WhA%2BQDNDo6pjvMsemkRhZSxxxPiTZlVv50FSB4Tquv6%2BzvqbfiKMRKTblVtOUQVTDs4%2BTKBjqkAUqcsqKXTOz0DWRtOc9dntW52UB12jc7T%2Bj9e2QEuqozBK6y%2BV5SGz6ENzxpAlqC6lgeWMAVdhvj5jEIsjTZKhRApLuFfFlWUzfX%2FU8sRP7vjTtZ3sfMweqmz%2F5bIHl5MkeXBPaBPwhDjK%2Fb3sFhx0xFx7mzIMvcUbIkOqdvPJ1heu5ThKYs%2Ff9pM%2BbTY9debE9HIetn%2B%2BXM7lFvLOyRWYEs%2BeXq&X-Amz-Signature=b306f83ad452c098fceffdbd032987670de12c2d10d2e1da8744740b214efb89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDDUFMZP%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIF6cZviYPs7zGvvf4Znv2GDVtTQiPCWEd3frM4ddegQIAiEAilIoiWhrKRM0Q4yuY7nIoDEaG8zsiBlldjoo7kBP6fYq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDLbA7rzI%2FrZ7%2B8h3jircA%2FfRzF8yj54jLtnLOyFBykz6%2FpyuRbjwLwdmRv5A4SVhKdj%2Bk%2FFGIEIT%2B32Cpm2ZGS2P0ApsIyo%2BW2RPIS72InOuIcY4DpNSXchiWqpt%2BRupBTqrWjIIF%2B46cIpIplyUDyWplO%2F1fp0qepaAhE430gEIuA4kzPUpimnM9IGhJgsRyagivsAYuHjIPDuYhcH1orOmXBOMBCBTv%2FWQkIyHnG9UQGu8jV%2BTneaXQoao6qELPqAV%2FCxZBGbAPitCuQAq5vRbYQr6%2BA1CnQiEthaDobqef92i%2BBBlyudVHQNPYoyoU5HBQ8w%2Btuorw4VtzW9ZxXYCRVymi3C3QQ2P93pkRN4dXX9ApOpNb2Swh91D720JGHcFWWGkZZgQCsP51jHr6bEiwgj1otXTeCiPF%2FR6mlWg12BSkL7DPK6UlJYQgjoj%2FI8XBvWX3hSRvrDDLhx0%2BC5k0ohdTz2WyEeKlPs3qWaM3pAGgYd6nzZspp0gRwFXwM1Pb%2BocX9%2BVz%2FFMTO3bf%2FqpLCf1PigLccW%2F5BQQPOXw305pVyIzFF07OkW2Res6ZybF1Bq13VU2l%2F8Xk1Cj%2BzZtRLTKsKmpBxmBPh9HkBSdQMIiCVASwEmdb05upn%2BCreRa4M2wOh2KEHZkMO7m5MoGOqUBKQWWe9pKh0Nq3AbGYnBV7IbFktMlc4E2C%2BJbME7%2F1bJCHEDBasyONxJz%2FOcbvv6KRLdB10eOPkkIVWdcqoPRSn2oappLgXSrsGCDrGaRirlITsOlDn8Th4lf5oSKngYLbLJp0NT1lBdcwIOQfbBydHJrOGMGpdWw1z0GmxO4LrTeDGLEfUJO191n7O%2BHQQyzzAbpKlYYpErU6ZNwIMppwbJ3BSD7&X-Amz-Signature=05b915eda280b1f53b6c5c39357b420e2d407888d83db230014dfed7de96466c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJG5T4VW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDZUjJ7Rcvxk91TmzBn%2FaUDMrBBEvEVn2%2FW%2FUHqusNOCwIhAPPdPy8%2FmCDkIt21KEArIBa2PnFQVLTXAQFCvwitT0OyKv8DCBkQABoMNjM3NDIzMTgzODA1IgyI%2ByFnFvftl%2Bn9JOkq3ANIFCJeOyNakweu4i%2FtmVN%2Fvz2dFhUCfxni0GpEEBKo2BxMpdtbgvlQGCfL2KhqjoNMC7fgss4n52I7mSuaWn2cezYCjnwP7r9x5ieXuNSwMTDTfCv8%2FUhFMrYdcrkxTS%2FnaIiw%2Fj1JJBPPGeCv4TzQEbUkzvJqd2sIzszx6VnHxqC6Brc2%2BpRWXK%2Bo4M5wUvp%2FeX78yviQSFb8JESsOSHy0PwYIpMDtVnKI%2FP%2BzonVvIjx0h5S5FjA3SKVncEKZa1FivL3J9LekBWRxVF5yWXMlf8YycWgqczl2kVutRjOpHWhKkb3bEbsEcGGyJMg0xVZIRoF6d7wLTD6oUJ1Sop5BB%2B3dp0sUd2pVhipE2N8T0LGfUi3RVaUxQ2SexxSlGX2qSEqP471UwJAHpUbaGYCoX439tuTQptOnIe6GT4yL0oyivGQtwEP9fFuJA7%2FfEk47Qh70iThFyz04ugSVGOCi9PyjYG5tU4UrFzbeRlbb%2Fstx3RHfBfuugJQ9lM9Rugp9hHNLeJ0flP3fO8pcFwIAcJTkuHq1wr0w5Jba542zoreyEEpza%2BlBCpOmNkDh2g66RmETCtPU%2FZd2qVsH4alQVfKBT5HsWbKbvT2JG%2BQbprAk07gFROzgZW1tzCc7uTKBjqkAXjlT4aawtMCpKjgYcW27YcVPswIfp17QPRSKkqGSNLLnA6w99b64Eqa7wpi2SWR0jipZ2eoV4Nkn2nUBjpbKvCg9sF4s9tjU%2BGSC8cQatON9a1N85YkjaqOvlh2C6G12VsrABPD3F4imaMSceHjE353I%2BGizufzvcjtDLUrx75pabQRaw5gUHlKbQLiPKgKYkNFhSnbHcM8lkC5cEH7M5hmTOB8&X-Amz-Signature=63ed21b8c351f977cb18d49db58cf08b1b0643e59f75a2b1616fc430d1cc7511&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJG5T4VW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDZUjJ7Rcvxk91TmzBn%2FaUDMrBBEvEVn2%2FW%2FUHqusNOCwIhAPPdPy8%2FmCDkIt21KEArIBa2PnFQVLTXAQFCvwitT0OyKv8DCBkQABoMNjM3NDIzMTgzODA1IgyI%2ByFnFvftl%2Bn9JOkq3ANIFCJeOyNakweu4i%2FtmVN%2Fvz2dFhUCfxni0GpEEBKo2BxMpdtbgvlQGCfL2KhqjoNMC7fgss4n52I7mSuaWn2cezYCjnwP7r9x5ieXuNSwMTDTfCv8%2FUhFMrYdcrkxTS%2FnaIiw%2Fj1JJBPPGeCv4TzQEbUkzvJqd2sIzszx6VnHxqC6Brc2%2BpRWXK%2Bo4M5wUvp%2FeX78yviQSFb8JESsOSHy0PwYIpMDtVnKI%2FP%2BzonVvIjx0h5S5FjA3SKVncEKZa1FivL3J9LekBWRxVF5yWXMlf8YycWgqczl2kVutRjOpHWhKkb3bEbsEcGGyJMg0xVZIRoF6d7wLTD6oUJ1Sop5BB%2B3dp0sUd2pVhipE2N8T0LGfUi3RVaUxQ2SexxSlGX2qSEqP471UwJAHpUbaGYCoX439tuTQptOnIe6GT4yL0oyivGQtwEP9fFuJA7%2FfEk47Qh70iThFyz04ugSVGOCi9PyjYG5tU4UrFzbeRlbb%2Fstx3RHfBfuugJQ9lM9Rugp9hHNLeJ0flP3fO8pcFwIAcJTkuHq1wr0w5Jba542zoreyEEpza%2BlBCpOmNkDh2g66RmETCtPU%2FZd2qVsH4alQVfKBT5HsWbKbvT2JG%2BQbprAk07gFROzgZW1tzCc7uTKBjqkAXjlT4aawtMCpKjgYcW27YcVPswIfp17QPRSKkqGSNLLnA6w99b64Eqa7wpi2SWR0jipZ2eoV4Nkn2nUBjpbKvCg9sF4s9tjU%2BGSC8cQatON9a1N85YkjaqOvlh2C6G12VsrABPD3F4imaMSceHjE353I%2BGizufzvcjtDLUrx75pabQRaw5gUHlKbQLiPKgKYkNFhSnbHcM8lkC5cEH7M5hmTOB8&X-Amz-Signature=353b0044ba2f7453a01e10dcd956116f0d02b850022746e4e6eefd9b9f00178c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XTCDFC3%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQD5qR7HR91BNma6kheAxZEFQn7CVCCnTw7GSu5Zc2I26gIhAJfwHGlzH44d%2BgdBkk5mg8xNPcpabHonwVKD9UeHokxUKv8DCBgQABoMNjM3NDIzMTgzODA1IgwrDgTz7g94G6gFatoq3AM99GPkV%2Fkiu4o8Hj%2BIHiqHz67KIug1duDVLoPnsM5rg8kLhLz1x6ekOIbl66Fb7ws4XNJk4uqc6d4nznFEX8rd0OLaqjpjvypJph6lBfTeDAm2z92Jg4X%2BvVTkcnZaphYIaNe3kOWaNdaj69wEUgh4p4%2Fdr0QvuQBnOqgul87LRcphvSKlc%2F0hzalISIJG551OoaKtlwgmERA3ICUYGVCLxS3VS95UcFX8snry0qSNYyYJvCbETH2Ia2Xnq6jhPt4jLIyVN8TRKV7S1yEc4qxprDOSLjJWzbqJCVnRii%2FT5uyBs%2FLUz8SlQZiDaWnNhfxiNQ1KB2W3Ig%2FL5MoWyrCHSJJDf%2FLdXoZCdSEDdtuae%2B5UB1Dya1eBDifMgcGRPWt5tPW7nCLrLw3Wk4xfjCOko0SpcwBzjEAMW0JyN%2Bnu1N1nTec6hIPPmxrZnCZh9dfqr31uSYRutMkvKvB6yF8oMKsYDmGmmLMK8%2FSPK%2Fqh%2BKlGLwkQx%2BwWpyJn1enqFQtiCMCwtioBkceRpwJEQbrosLXLyQ6p4s1tCcWcyqsYCKEbIu2HdNiJmlr7wqax2rBWXEeTjsg6nsuLSBgrl0Gon1SqOdnWShp7w8n%2F5k60JjRCWWJe6ngBlTXiSDDw5%2BTKBjqkAVNuFhyaaG8QLqi6hQMvvpU4izDHbEz9XFIsy9CUqQd8yl1MDd3IuQSlhkTIDD9r6o5MIYQP4P2HTT64Rl1YVDmmFyf%2Fx99D57FG%2BTPtOxplNhc3JUhFoA0ZHF9%2BaVqPTGlj6nWYOhc5C0P88%2FSSikRYBrpYFTFdrUMCCCQGRwj3LBu7nygFVRNsA9NYpjHUWardRrURS4%2BkiNsARPZpHgStGcmN&X-Amz-Signature=5b15933b657577daf1955e165b3c93b649edd327bb5c849a1632c404f8b7b959&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAZQHGER%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIANNGcPmMCc5919Iv2f18T7h3iasmVBPc9Fqb1K480IEAiEA2KeD2cZ5AQoIcc77BFuFgv4eX1pIuNhsI2X8hhO7wI4q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDFs44rz5ihu2bLnG5SrcA8slbhO%2FuiFL4cM%2F8eN%2FhLd3IJhqXvGzgca7apuD52KUUmDzbD3Uaur4TVifbiBPMhCCuHmOVw6i73e4qK8DM10qGVqqo8JKxSYQ1NRLHy6jXjyDgTsryxOw6UKSgNBANDu0hGrMs%2BAkflJcF%2FRo0eC49g%2BpczqOI6jmC5uk2lOY7Uyd24Y33HtscqQSGWe5rbJdUZ2M9B0OOoyJFHxZLopmZ%2BDseD%2BgIBcpIGTAzVFFqKww7a00epNJT07xm5hLhIcFXhGrrDdS8w9IMQmvKd67RtZn9iMk8zboU8jvOlX85rRYOD6ewQfDkfSIFYJNirejPoIqjdCAukpC%2BZBmzB3xy0vp7b%2FG5vJo2Pari8ReeTQIlw8iS9EIzK9FjJpVkqY5nkg9l%2ByKEIEkYdZD2KklIWkSL6OoqKOhBGofkUCVD3mqEIWL%2BLCFOYqQ%2BzpJ944EyJt42CrQebqudP5y8vHm4a2sMBAegR%2Bf74E5vpXhx5O2WX1D5XvAcqJ%2FybotTUMO5vxRL3dlclxRViOk0OI45V2ewmoyNrn8aCg686%2B483KGRCtmrebxMzmtZ70odgERQ4FQJ5wnsIB81lDALhyfqwcDYWf3VIsDgMzaED4kkJe0hVg3ZLxXi0THMMvo5MoGOqUB7jomnV0t3yzQ%2FeuODyVNDFMWza8%2Fl%2FfnjsPGdH4rv7IG3Igju0%2FODcG%2FY%2F101QEkZl%2BI9nFi%2F62NqD5lbRVjKp53TBKjNfBpECKKGoVBYudfRywegD%2BQpLCZx9nmadsg%2B7Ny9O1uyQirJyr5GcJIr17sRDb1%2FpRm%2FHP%2F6MMLRq4l8oQuOPA5RdXToqO96vAmXF8VbNXlyUV4JvnzicYs%2BbJ2Wfy7&X-Amz-Signature=5dafd8ae56cbd0ebc59817a1bf57b4a45b536ba79c76410ce37b086f26519f28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466727H2WCB%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQC8sbkxfosBbEzjze%2B4Hu%2BFgUWiCijh49cV8gfHLUyJNAIhAMmbGoN7tr782sMuH%2FaPjyEO%2Bgrz%2BVb6ljR5qdeonGGwKv8DCBkQABoMNjM3NDIzMTgzODA1IgzyMw1AnBW9YxO5u%2B8q3ANBwJ4iUp8sGgmntLKHbpy%2BoQsD4HhAje6%2FUJtPZ%2BDAH5hqMz%2BSG94mhoU5OEjiMQnaCvElqo0%2F2C0EC951DWgRYVXUMZLIGBRbPIMwuA4sR%2BULnnknYIyIrYUzD5nsiVjfRgwKbsLtV%2BpqaJOm8v0ssooZg0NUQvJ%2FNXPi71%2FwjoV%2FnIasJ1QugUFuPrrXDIL%2BZseRNa7n21FfyFnDRxvBRX1DWOqkdd%2F5mfmRF3p4Ou%2F9uWls28Buddsk5CyJfFHIw3D%2FmNFylFOX5Vv8R287uu9WkbaA%2F3FpbGXYXrFa2wH6H6z38TRh85iiafLMAWYZe33RtJ3SN%2B1xKfYIZ%2F5oz99tvORa4YWf4nLvS3heuzoqaOJbX9%2BIKdwq%2F2Jvh0d1EGLDWSHUO1gytoIYfU862Rnt6uEk9KYEFBrzKrzoyjspPjvmjSGVqnFQQldoMStfBjoc4BulGuZXtX1Wqkr7xSrS5Z2pQ24ZmuV4POZiyIF3Dyb85JN9icNOHJEkhy2PnxvO4jeb1QNe8aWNGP8eq7DDyNQHyYLkfmEoSHhAdyFTaLhhH5NCp%2FsFuuICtiJPTI7%2BUxAJs%2Fm3YGHZOEdAygx8ohZexwhyykvxD6%2F4afiAB3OGGhxIl550aTDx6uTKBjqkAbvNFYkncMPBdrXNdTmgTYEgzG35qOjUGl10g7rTNcNZAX9J%2BrnPgC7ZpECXRbuPXlS4ucPiZq9e5xpQ2zKjwXpu%2FyM%2BtYCWlyccHhy%2FXfwSaaJXo727zMXRaXV4jtiMoKreBtI3pDXqrd2FVztOZ5cnc4vDBpiCuM%2B8ksh0djX26qiTOqk%2BZRVkYW8DaStG152evIx0QFvqCmjAyAiElz458WQg&X-Amz-Signature=2e2183203d24cb22b97c871a6ce3e93a68373d5063135381593683ba45138c09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626ZG5GK7%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQD3spCQvQUSj4MmpSUQc3fUtSGhOX0Cvwm51PmTdJ8fbQIgUVX5tRZJtEffZ1tSCG65OlzzhFUe%2F0TVa31WZtJDLcQq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDCibxX3w%2BqtfvOE%2FCyrcA4yw%2FJ5Su0pVoWoS8plesBwc5uCyac6nfC23ZmUKqWMW7xinw8fUbVxVHH38Qc%2FeJLOFQQW13IjtBFyQ571WYg8G0%2FdwMegC1wwHpR4EIEa6%2FkfJEfgp6Gf5BHhdZWgEXhaPR%2F3L7QUfv4hTBPENxubZKUD7ypqQ3yDbvbpxTO4AllN0hlb4jprJGWMcw%2B%2Bj6EPHRWGVaFE%2FMcuPKsNEaHgiHeDQOj98DFwh92afIBhzBv7p8KflnGNtMsxxGLrgRTyyoo1dntOw%2FONpeRcuK4r7%2Fn%2FC7fCNRKmKIcceSjeP3ClDAABUxADioQLPbP6qY%2BNpTUCXiSALN2yZ%2FgzEMk9H%2BpOc%2BD3Db0eW2wcVWwRfzx5quP8xuZegkBjBGxbMGd%2Bja8PdQgIozrnIiy4PwIbp1FY%2Fho02lCl8xxXdhPmzi2TR7IEMTgyZ9i1qqtGFyFvshpewqnvGM5z8m8xSzD%2FlAOoskbmG1%2FMQlD%2B44xVNjWV%2FGgsKuu5sbSDmp1iPoDLbaAGGiChODGYtkigJgCXwKTDhU0dxgLVTkTwAhYCfbxIJD3SRRLTrIv7CJdMKa4wgYvsnwAKC%2BEYMxazhjQLUwiMpmZXZg4wqAm1cc8HKq4KYbxioOBVwSWKSMNjs5MoGOqUBcLnGDu9vSzvPuE6WRUBRXZ2mU5glVG9fDDPL%2BqnCP9pZYOr4Uo8EFri12PCmDj8uAeTv5J93Kp2oZCj%2FVJqbsLRitnjNxpaqLRYKxRdTOcFbo9smT10cAo0gNoOzJu5uWzDAVr6rJOaahoPLtjm8Q6rIoER0McM3uRt%2BRd85lD3103Az3uxwECfF1EakpAQXj5QIdavwrI0P70DKwv9ztSD20IqJ&X-Amz-Signature=dc3306935c21dae8c81e9a213fb1aab388d54ff5cc29c820c90ef6685b853bbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626ZG5GK7%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQD3spCQvQUSj4MmpSUQc3fUtSGhOX0Cvwm51PmTdJ8fbQIgUVX5tRZJtEffZ1tSCG65OlzzhFUe%2F0TVa31WZtJDLcQq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDCibxX3w%2BqtfvOE%2FCyrcA4yw%2FJ5Su0pVoWoS8plesBwc5uCyac6nfC23ZmUKqWMW7xinw8fUbVxVHH38Qc%2FeJLOFQQW13IjtBFyQ571WYg8G0%2FdwMegC1wwHpR4EIEa6%2FkfJEfgp6Gf5BHhdZWgEXhaPR%2F3L7QUfv4hTBPENxubZKUD7ypqQ3yDbvbpxTO4AllN0hlb4jprJGWMcw%2B%2Bj6EPHRWGVaFE%2FMcuPKsNEaHgiHeDQOj98DFwh92afIBhzBv7p8KflnGNtMsxxGLrgRTyyoo1dntOw%2FONpeRcuK4r7%2Fn%2FC7fCNRKmKIcceSjeP3ClDAABUxADioQLPbP6qY%2BNpTUCXiSALN2yZ%2FgzEMk9H%2BpOc%2BD3Db0eW2wcVWwRfzx5quP8xuZegkBjBGxbMGd%2Bja8PdQgIozrnIiy4PwIbp1FY%2Fho02lCl8xxXdhPmzi2TR7IEMTgyZ9i1qqtGFyFvshpewqnvGM5z8m8xSzD%2FlAOoskbmG1%2FMQlD%2B44xVNjWV%2FGgsKuu5sbSDmp1iPoDLbaAGGiChODGYtkigJgCXwKTDhU0dxgLVTkTwAhYCfbxIJD3SRRLTrIv7CJdMKa4wgYvsnwAKC%2BEYMxazhjQLUwiMpmZXZg4wqAm1cc8HKq4KYbxioOBVwSWKSMNjs5MoGOqUBcLnGDu9vSzvPuE6WRUBRXZ2mU5glVG9fDDPL%2BqnCP9pZYOr4Uo8EFri12PCmDj8uAeTv5J93Kp2oZCj%2FVJqbsLRitnjNxpaqLRYKxRdTOcFbo9smT10cAo0gNoOzJu5uWzDAVr6rJOaahoPLtjm8Q6rIoER0McM3uRt%2BRd85lD3103Az3uxwECfF1EakpAQXj5QIdavwrI0P70DKwv9ztSD20IqJ&X-Amz-Signature=62c96b26fba8683ddf0b3f6dbdd8a50f22463dbfc027ae35f7b564bb5c5c315d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QROA2KGF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDqZk21PkSQ0qtliOJ3MSG322RCpz0QUcNzjn7QCghjYAIhALQhaZGPS17L9ffSk%2FkWcHB9ipX5%2B6DAb52RQkv%2Fxq%2BQKv8DCBkQABoMNjM3NDIzMTgzODA1IgwDyB4ruz2tk63DG%2BIq3AOxRngmYBG1HHW%2BTzbOBxDTVOChqbOI8WbVrpkubrFfNZKOO00dj2CqJC9mLQ299JNpr8o3dfVb%2FBHdkU3sTtQeh2gtzgCIBjXSeN3hcb%2BAcUP5%2BwSr2TERQiuNXl9RjF8PnooqGmmYv5CgKClraO68eAeJkbHmKvUHEHiUVUQz6U%2FVolNCNWiFlRihPRSvT38NZnnPTQN1sIYR0EogwPabceltrbxDRRzfEelb2w3KmuESpziRdyC%2Bf%2BZ%2FrCys0kbdNQg%2FX4K8ElEQtbdON6IpogcaznUAHhJOtsaYvDh%2B9u7tSFKT6X%2BtlE9UYPHeIeFb3PbGuCSWDR5fVzfaWCPk%2Biqt0a3Vjr5BPiNjXEgEaNsYYsIV3kNjaRGzWkQorrSc6HTRyeZkwDwSpX4Dyk12WJHZMC%2Btz9PTmfJiJJzUup5azJn0PKtQ6zR3QkRkqvlpeq5EDXo8hcg1LXzBq8FWf85rKWq0ZD%2FSLFa97hV2BMqLXPj0%2BHR0lD%2FxZsDOJoya1lz7BVw9LvNUb5JLY%2F3ZJWvkSir5nLsWWWNSPt%2B%2FCmzoXPdHIHUgT36kdRfpdKh8dOsi%2Bek%2Fs80XfzvFgRRe52wIQcfxJ9SwI6%2F5bS%2FyUByOBOMSHc737t9gJTCd6eTKBjqkARg0ViJpLVqd4p3IwAN0tO%2BsxsTnmT8Ip90kyt5E5b3c748w03IiN4PqE3vrkS8htNjitPj%2BjkOL1%2FkodfvZb1DNtDkOarfC1kkwknZvL6IaA4IAZ83uL2CrJKu%2B%2FyuaRPl7vVmA6GjXi0rj2DWENJIRxzk64oik3RaBQczNdSUop%2BXhjufm1%2F51z3VkhuQ2BFWeteZCXZ3aXKn3RRyteuZVSAa5&X-Amz-Signature=bb3adce40fb1a2e6563e4a771cb1e8e61ddbdd52e766877f0a5ad0c1d26963c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TCQME4E%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQD1eAzTMkBZqgGJDz3eLz%2FVM9w1pfyHDRJSBeJRnqf6NwIhANxLSBBbwsaMsh%2FdrOohJOxk%2BMzrB%2F7coT92uLeNvXjWKv8DCBkQABoMNjM3NDIzMTgzODA1IgzjY%2FjVkR7amcnN2K0q3AM7GkRyli9x2n1%2FrCRZn2GHkSHr%2FA7UFNWHQPRMjF9Syp5sJWoNyd3vDejtqOYSz3ke9kgWKySPSiYyCcPlmc5Qvfa9kSM0duTJ4XYF%2B96B8ErDYYr5LbmettkTsJ8EIRFz0y1MONblMM65hpfOSn3uW9nUfE14aF2DQkOiE7d9dMjqIzmSkO1e28LUesHF%2F2VZx0SaaKdkb3OPzFPN93IT%2FRLxIgbxvBQOeDjgRxGla2fNRU13kBfZNBHDy4qZkY7vXQp%2FCrALDYVvp3ilkBXvelZdDDTW0j5C7QYSNmCKBW7sVAHFSxxeObYfGu2ziKmE%2BYmWSTdjHavy2YRrgCQmZAf8sCctW4yrtswptoL%2BQSJ2%2BgZb4S6SVM3zxfAZ81BpVBCS5Y00OBTd5c%2FMEttglX8C0I13CpU3OCUhYyCRzce0sIGLEZYw81VR9VIx17OB4XjHHI9eRc7%2FIMoReicPCisd%2FNttLPODUblERQWR9U9qZIqiSUKCbqzKNmrurIdM9HtRSbS4M9eQzWg7awJwXYCpTyX8ichY53%2BhI3tuOa%2BRvUBmW1r7uw0o3%2BADFWlhFki%2F1ZOTfFUOkjr%2FnhGzLQTTpFGvVkcGyBq4YF0a6qp%2BhGNfdKyRlfsTkTCW7eTKBjqkATOczlmnquNdEXBBXBI%2BQln9EPQ1uwKUR3ZoAQemBSOgL1bVpGymmzO5t83afTDxM0UqDacpNgKB2YN34IvqQp89kQJE5GNoV7ikGPJ7FPS7q2tzAVsKRA5dBk7LXMxTAoXkU8YdGPANRZoVoeHGKlu9hkrccqKsqWjgCf0c4P1pzk6XdAtDeydhlZzqTG2H8SWN6MOjKJuKclaXnxWV6U4yn%2FCy&X-Amz-Signature=9965b6fd60c5832ccd4154edc0a8add33396f76ceb6c5f509d13787623b83990&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TCQME4E%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQD1eAzTMkBZqgGJDz3eLz%2FVM9w1pfyHDRJSBeJRnqf6NwIhANxLSBBbwsaMsh%2FdrOohJOxk%2BMzrB%2F7coT92uLeNvXjWKv8DCBkQABoMNjM3NDIzMTgzODA1IgzjY%2FjVkR7amcnN2K0q3AM7GkRyli9x2n1%2FrCRZn2GHkSHr%2FA7UFNWHQPRMjF9Syp5sJWoNyd3vDejtqOYSz3ke9kgWKySPSiYyCcPlmc5Qvfa9kSM0duTJ4XYF%2B96B8ErDYYr5LbmettkTsJ8EIRFz0y1MONblMM65hpfOSn3uW9nUfE14aF2DQkOiE7d9dMjqIzmSkO1e28LUesHF%2F2VZx0SaaKdkb3OPzFPN93IT%2FRLxIgbxvBQOeDjgRxGla2fNRU13kBfZNBHDy4qZkY7vXQp%2FCrALDYVvp3ilkBXvelZdDDTW0j5C7QYSNmCKBW7sVAHFSxxeObYfGu2ziKmE%2BYmWSTdjHavy2YRrgCQmZAf8sCctW4yrtswptoL%2BQSJ2%2BgZb4S6SVM3zxfAZ81BpVBCS5Y00OBTd5c%2FMEttglX8C0I13CpU3OCUhYyCRzce0sIGLEZYw81VR9VIx17OB4XjHHI9eRc7%2FIMoReicPCisd%2FNttLPODUblERQWR9U9qZIqiSUKCbqzKNmrurIdM9HtRSbS4M9eQzWg7awJwXYCpTyX8ichY53%2BhI3tuOa%2BRvUBmW1r7uw0o3%2BADFWlhFki%2F1ZOTfFUOkjr%2FnhGzLQTTpFGvVkcGyBq4YF0a6qp%2BhGNfdKyRlfsTkTCW7eTKBjqkATOczlmnquNdEXBBXBI%2BQln9EPQ1uwKUR3ZoAQemBSOgL1bVpGymmzO5t83afTDxM0UqDacpNgKB2YN34IvqQp89kQJE5GNoV7ikGPJ7FPS7q2tzAVsKRA5dBk7LXMxTAoXkU8YdGPANRZoVoeHGKlu9hkrccqKsqWjgCf0c4P1pzk6XdAtDeydhlZzqTG2H8SWN6MOjKJuKclaXnxWV6U4yn%2FCy&X-Amz-Signature=9965b6fd60c5832ccd4154edc0a8add33396f76ceb6c5f509d13787623b83990&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6C4BDLU%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T180105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQD%2FkM6jIy80pI6R2kFsugQaW0gSNiGK0YHRFp%2FJdKT2ywIhAOPcn7UOknc4h%2FC4H4HHdtJ0j%2Bs%2FCFb%2FpW9qZjlsnouZKv8DCBgQABoMNjM3NDIzMTgzODA1Igzh6NCfd2r11K7NjQYq3AO8qv7M1hLPN2Utw8VLjPOMZ4PWJ0nb3XceVu8Uw6f4b6KNIGIqVXUW9VKwGtPIOmR3jIBzvOWzhm1CWrr6lLPIsFse3gcB%2B2V9Y6HwzHLDP6QpXnqOFwFAY064vz9V0Gx37jLyuWbpTlyq%2FQfCRFoeksN8odIgD6yG9nZYTJowJxPg2QqrVebrKsxW2RrNA2%2B05eK7B84UMVIf0%2BbmrH%2Fs7mEingX34ZR6PBfCuK1Bsk%2FyyBidYRoErZLuFGczEN2hiMB%2ByE90kAgIhqm21xH1kNEcEp09wFsxQdkMTa7UNQgnw5bJxFOJZRF17uOztTyE6xfc2Lqx5UjRJHtIabDUSVFWdorXR3fv8aXEQ8vt9%2FHbM0oYNMWM5cQ6ZzApS%2FOiNUoa9Sbg564JoE0oiWgxoBqi%2BxjB57eZKOSi1wkwFEejb09F65LIxhNcAwNdWM7cXgfOKwh9NIDu6YeRdKStb9hGjfOY0Ub%2FUnmhTgfiQ3I%2F6jIfVgtMl68rQiUsJ7xOqFqSNfd2VE8KVubKMblE%2B0nX%2FYMpljw54byNFCdkS7gXEGgS21YotTLf7QGG16BqwSCw6Oh5jcz75ThbrhVHz6kiJcMJVn1dGtTS%2Fs2bImO9Xu9zAaPXtVoZsTCM6OTKBjqkAa8k3JwCuKMCpViimAxs%2Fbw5w7nML5bMYaKFPo6nG9RQ3UBvu9awbvfsnmFpqr%2FpcSzuhezbkFXUfbJZSwllsmulo3UJlxIrIal854ypnX0nCDczpTX15CyNQR6LRtU75MrvV4BmPjxXo1ZyJB6s83KmMB6PnirA29pO9pLTOF%2FE9Ff9kFPHe%2FtF7bsRkp%2BdS2sJGDqZpOEMokTKC2jxluETC440&X-Amz-Signature=5e63b051dddd017b39cfb916288aaab6f4862e0664a3845905a4c03d5454e631&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

