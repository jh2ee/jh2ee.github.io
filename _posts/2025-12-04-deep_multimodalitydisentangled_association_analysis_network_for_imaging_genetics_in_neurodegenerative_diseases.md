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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466535T265A%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDfHQ3eBf8elasihArVnYY7vvfs5xqGkqmuZmmpSeF6IQIhAJXqB5zr7eqU4aSkYtoLtEHErlMHQ59ouryg6mG1RSU%2BKv8DCAUQABoMNjM3NDIzMTgzODA1IgwzsT0zp8UVLzPuVusq3ANJhu75R1Vr8he8jKiTrkVt%2FMwtmeAqBHElr6sboaVkMDeHWJOVkIsqe89TNhiqNB%2Bep9TJRb%2BCXRpha9I0VGGG59I8BEKjlgMKCcdgIiGw9MGI3aAiTp5az5IxZ%2FplR1D2puLvKq7gUXjcxr%2BBJ855DS8%2BqF9U1seNgBbaqqvijjul%2BBREcXYTnzgClcbeTRrD3SL5sWduo77IdOdEI%2FAHl7Qj9s7yEbp40bW9ouV%2FI2jM7pGbr2nRfy4OZP5S5RSMbbbn9fjQSbtHuJfJDvHH6Je44R9onBeNztc%2B2ORanohcjaMvA1J3SapBGEHH46xH%2BlFdNTC1tFSudC2fWgexR%2B69Bzvy1VolfSiblx1j3b9TZNJRgTJ8oGqNDuiHHosmUFh5P0pMN4ro8NqREdAcnZCZ5ccrg%2BhPTudRSuOCHpGGl94S1kdicRlzy2CUgHcxSGNvBpTrsb1SzMM0F4rs%2Fw7bWYh0rr1UPZThFGO5YnUwLG3fMYcSLwohZGZDW%2FJK7ddFBJK2qQ9sxb%2FTY8qvxDzMK%2F5RtjV1uTHvq5%2BLcI43cKNc0PJb4VDng15XESFrkNI4FQZ6Lc99SxjK%2FjIh7jKT40ILNDuFaawK9tUHcf8eadJuLkVJ1xd%2F8TDJvuDKBjqkATcR617Evvo7a9bJkhCDYl7%2Bu8WCraWR%2FWSAtuv22AHwla5epVQKU%2F3jarbXx4eeUZZ8puqxQ7kW93yZyX3u%2FX6KxG3WPHQFp2m5HTq5XYbCc5tah7UkQWWP801h228g3hf5j%2Bmf2H2lBzpG7Gijq4wWQv0Omdt%2BRSkCCHYV2GXqxd9SAt2W2NBI3b4hSNhLk2UU3QQ2UvlfIRArcaA0AC16yzLy&X-Amz-Signature=a613099530fcee208d0d2bbe86c48aad31eb89455d1aaf12be3fe78da2123f56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466535T265A%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDfHQ3eBf8elasihArVnYY7vvfs5xqGkqmuZmmpSeF6IQIhAJXqB5zr7eqU4aSkYtoLtEHErlMHQ59ouryg6mG1RSU%2BKv8DCAUQABoMNjM3NDIzMTgzODA1IgwzsT0zp8UVLzPuVusq3ANJhu75R1Vr8he8jKiTrkVt%2FMwtmeAqBHElr6sboaVkMDeHWJOVkIsqe89TNhiqNB%2Bep9TJRb%2BCXRpha9I0VGGG59I8BEKjlgMKCcdgIiGw9MGI3aAiTp5az5IxZ%2FplR1D2puLvKq7gUXjcxr%2BBJ855DS8%2BqF9U1seNgBbaqqvijjul%2BBREcXYTnzgClcbeTRrD3SL5sWduo77IdOdEI%2FAHl7Qj9s7yEbp40bW9ouV%2FI2jM7pGbr2nRfy4OZP5S5RSMbbbn9fjQSbtHuJfJDvHH6Je44R9onBeNztc%2B2ORanohcjaMvA1J3SapBGEHH46xH%2BlFdNTC1tFSudC2fWgexR%2B69Bzvy1VolfSiblx1j3b9TZNJRgTJ8oGqNDuiHHosmUFh5P0pMN4ro8NqREdAcnZCZ5ccrg%2BhPTudRSuOCHpGGl94S1kdicRlzy2CUgHcxSGNvBpTrsb1SzMM0F4rs%2Fw7bWYh0rr1UPZThFGO5YnUwLG3fMYcSLwohZGZDW%2FJK7ddFBJK2qQ9sxb%2FTY8qvxDzMK%2F5RtjV1uTHvq5%2BLcI43cKNc0PJb4VDng15XESFrkNI4FQZ6Lc99SxjK%2FjIh7jKT40ILNDuFaawK9tUHcf8eadJuLkVJ1xd%2F8TDJvuDKBjqkATcR617Evvo7a9bJkhCDYl7%2Bu8WCraWR%2FWSAtuv22AHwla5epVQKU%2F3jarbXx4eeUZZ8puqxQ7kW93yZyX3u%2FX6KxG3WPHQFp2m5HTq5XYbCc5tah7UkQWWP801h228g3hf5j%2Bmf2H2lBzpG7Gijq4wWQv0Omdt%2BRSkCCHYV2GXqxd9SAt2W2NBI3b4hSNhLk2UU3QQ2UvlfIRArcaA0AC16yzLy&X-Amz-Signature=a613099530fcee208d0d2bbe86c48aad31eb89455d1aaf12be3fe78da2123f56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666I3UFA47%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDSvhMdjKwghQhBzj2%2B90FSgymcVZZKW%2Four%2BUBCFZ6PAIhAKtRKySUwbQsSPD3bJBoKmalXOvcWUJeMMv7Jaljy9emKv8DCAUQABoMNjM3NDIzMTgzODA1IgyHAj18w5fNbV0ybIEq3AO%2BQ6tyXK5uB5znIv3Xc6Pn5WXppSPBOLdZc2%2FC4IQ9a52qQ3a2cQXuAVktgro22s0QHpLWJ36sbr30zJwJIhzMZZ8GWc5OgXa208XLSGw58wsWu6aHIgpqEgbVmZDs8pb8kNXn8tbg0RS89Ec1yWS4RSdpUoe5Ick2X267v1jD0GOCrjxh0mBiSSfOZuJEMi8CPIzxI9cZpu7u3ZwJQziCgkmdf0gY01UYbioIuZWLTL6S1BwEozVUOIG9U42rhq1jdMYsYOKeS97jm3xx1nS1Lv3HFwRLVVm2KBV9GyB3MzKm4mXzdYW2FLBjABPH2RPUKr5%2BTgWh1zaFf4o2unG8PQs25UOZxGRADWzDpl2sysmf5rlKB1%2FWP73jf1XnUnikMeNTEkJMLRvL8hsP4DfnK1ul8yyVYit5i4H%2BL8AYK%2BnUTvkelL71u0RG2%2Fn8j%2FUu1d8xbEypfU0cZli%2BDSaTQQQZZo4OvALJlwmokzWPu%2F1I1F8VYsMslo5tzHN6oMpcFk7WXinUV2%2FVsft5iOFmoLHSidiSa5n0GEVV9ZiZwd78oka0BL9vSaXHGcrEgouFOtNVRvWtqxnHfTFolvmbOxkWvAQ%2B8CZsB3exKP8M8Oh9GtAJ2kD8Naf%2BhTDot%2BDKBjqkATpAeOvqlc4qVwTPKRCBJ3XIWd10NrpwPZlwTH8jnFCOEDCXM%2FbHPUQKpOSMG7zE0ofCb68SJ%2FslsByQISoTv8ALmqclM1NgZnnkejR86tplMzrQ%2FVl%2FTzb4ydFcUqoxeT9%2BRiTko8M47lxQGIOkk263SSyV3ihXsjNeYEA4GJIIdQaokIenHOOj5btZ4GmRJwMLxBeDKiLc10wIg%2BOdswmUccsz&X-Amz-Signature=50761fa4e568a616d0096fd90d146f9a2fd446d26c72a702d82e7c31c10c5233&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BCIMNPN%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCSimem3goftK0rl3n0N4DfkywLmZGaNb5gLbF3%2FTk8XQIgdohHBBaFhs4JnTWtGMrlu7270Cc9ruQzYmzht8bKjfEq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBQFKktMdpybCpIKLCrcAzfx10XAhxNAme96AX96tUBh%2Btagf%2FIiuyPnUdkBi9c27R%2FVgAKezNpGcSfk9XeCYE4gwx0y79ToZNT4ZNYqPq%2BYab3YNIFG3GdodYo4DrXX8jsvv9QFeROiEEWxtkYXE6lgobU2BlDtI%2FE8%2FzlpOuXg8y9CKDs3q%2BnXRu2FQBr%2FwlSkwEDHs4%2B5i0cw8Ij6F87tbG2Ge37Sw%2BLLYbyj7KaiHqhTkbFX2lj8CZE%2BSzVv%2Fu7kpxeUUlia%2B0l2ZQ5L9Oht5oAOkkH1gsznYCU9M3uG9OND2KWJIAYRwPhQT8kwY0McmH0edkiat%2FxuWsTTDAYGlS%2Bmz9vi4AruGcPqJOrGWliDmB2g%2B6tW6Joy9lbkh14VgtTNFHWgDQAvEc%2BJwYbbzv7qeeIgUy5cTep3oLG8hS8s%2FcvHj7cOP683kpCMhJQfbyXNlzxP6ov9%2BbeIKIkDz745RfPgX4Er4FeqLhck5SnlfiddozE4jKstelIERLCKGeIK6xk8aaRcNONuKmfk9vOI0Ms0bpOgHb6dG%2FQRG4cz1VBwMTSqKY9p2%2B%2BmwHHrL%2F0S0rs%2FViZsIg0YuAhciJ8Ma1UQvOpYxTq8gHPQgatc6OWEMLXGTCEENmW%2BTNP1XIepa20bvTl3MPe54MoGOqUB7f86XwypJArPTknoys8f8hcq9pkHr05HYWJDCHpny1iwB%2Fk69sd1FRQsUOAajL03wvzLIMW077x8rSG2OqXBl1g8RofQbVjnksaX5K35iNzpS20wkXKc2BbDi6kWXSEvwKJIPm5Ujn3JyzjTDFcHnGjS7I2beYhJUDu8Sq2heOGFs%2BDoe3%2BZ7ODFPSfb%2FRyTyLVLp7cckpG7oNF%2FwULzm%2BqC1ps9&X-Amz-Signature=da211f721b80891e9301317a46357e5ab2035a310d8cbee2b11ca32b1339f841&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BCIMNPN%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCSimem3goftK0rl3n0N4DfkywLmZGaNb5gLbF3%2FTk8XQIgdohHBBaFhs4JnTWtGMrlu7270Cc9ruQzYmzht8bKjfEq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBQFKktMdpybCpIKLCrcAzfx10XAhxNAme96AX96tUBh%2Btagf%2FIiuyPnUdkBi9c27R%2FVgAKezNpGcSfk9XeCYE4gwx0y79ToZNT4ZNYqPq%2BYab3YNIFG3GdodYo4DrXX8jsvv9QFeROiEEWxtkYXE6lgobU2BlDtI%2FE8%2FzlpOuXg8y9CKDs3q%2BnXRu2FQBr%2FwlSkwEDHs4%2B5i0cw8Ij6F87tbG2Ge37Sw%2BLLYbyj7KaiHqhTkbFX2lj8CZE%2BSzVv%2Fu7kpxeUUlia%2B0l2ZQ5L9Oht5oAOkkH1gsznYCU9M3uG9OND2KWJIAYRwPhQT8kwY0McmH0edkiat%2FxuWsTTDAYGlS%2Bmz9vi4AruGcPqJOrGWliDmB2g%2B6tW6Joy9lbkh14VgtTNFHWgDQAvEc%2BJwYbbzv7qeeIgUy5cTep3oLG8hS8s%2FcvHj7cOP683kpCMhJQfbyXNlzxP6ov9%2BbeIKIkDz745RfPgX4Er4FeqLhck5SnlfiddozE4jKstelIERLCKGeIK6xk8aaRcNONuKmfk9vOI0Ms0bpOgHb6dG%2FQRG4cz1VBwMTSqKY9p2%2B%2BmwHHrL%2F0S0rs%2FViZsIg0YuAhciJ8Ma1UQvOpYxTq8gHPQgatc6OWEMLXGTCEENmW%2BTNP1XIepa20bvTl3MPe54MoGOqUB7f86XwypJArPTknoys8f8hcq9pkHr05HYWJDCHpny1iwB%2Fk69sd1FRQsUOAajL03wvzLIMW077x8rSG2OqXBl1g8RofQbVjnksaX5K35iNzpS20wkXKc2BbDi6kWXSEvwKJIPm5Ujn3JyzjTDFcHnGjS7I2beYhJUDu8Sq2heOGFs%2BDoe3%2BZ7ODFPSfb%2FRyTyLVLp7cckpG7oNF%2FwULzm%2BqC1ps9&X-Amz-Signature=d0b7b8dbcdfcafca4abce34d911920148598f1c54b4167d5abbd5abf5e16bdf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDBST5EN%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIAZF5qPXEIsfk6iJb4dTRkR3aXgB7uvilkLyoGIe%2BTsyAiEApcwD%2FnHVtuMYzpQSzSfrARgtavzuARzF%2BoLY%2B6EEyUEq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDFYLgai6sIc6m3yJlyrcA3ZbtEv5MUb0lFnvYgwy%2F%2FT70jZJ4SHDubtIIjzonVXoYOFW9lOFjkLkHewwgNalZLKrzbjqzr1Pu5TLGLCLUsz69EqOhlD9dszTUNcanxuWPlOBE%2FBEPp%2Fj2lDiY7R38z2PhyoibmFDJzfOcuZZOWGnpQLFiPNiBZMNR0%2BNEtQ1RpZORDI3CMngWUZG2vgVfCWa18%2F2Xlz%2BFNl4zOuk2gqB8F2NbhXp6S7O7CGZbEucheNdPDnST4C0TWMUfiZ5KUdsDM3ZuH1zgeSb6ts0ZtM6R6%2BcCuctpVJ0tplNYuGT0eob4aL%2Fzw7bDB7uT8tMatEJ6lv3sWXjmG1xMLIGpyeArQteokdpprpU7vplKuJ%2F8jpxwmkphj7p1thup85pRo1GelNlZ5Cu2FV41xwnO9er3z1DN9uQ5U0a0qn4fEIkUASZecUjqwg51DEQThw8rmVMqecQ0rF8VDoV34qUnG%2F%2BLFb25ftt29n%2FoaDIS44skKOZYuyHsT43q6%2FpYRGFjRbULOKgPQtSXve0FYSLA4BNXGMiJVQSh%2BhD267LEiCnqTMtSW3o0CckT%2FHupXTC65YGT7v0sA6%2F1ssWe5fkgK9vkfKjcH9MuQWbq5pJLzM1xc9N1hwpPr7xv47jMMO94MoGOqUB%2BYFOBud%2FjiBl0zunyOV7ZK9q9HOq4xfk5FbXD7Hqp8P4RBBp2EEkL%2BwvzfjghYvjYlVQz%2FNjFshTb%2BXZDOlesS2uoJ73jPz4uSlU17ch2peM3kzMsPmRVuqmq1SgNZwJvr8gH0nxDpfl8DKTzXXBzFNsQJ83ddRTwczcYC3T%2FvkU4kpN0nZff%2BzfbFw9lqGQw8JbyZ745yavuKrGlnqMjQPxONn6&X-Amz-Signature=21868faf0019b5dd49f52e217763133d786e353e913c816869f2849e9589b646&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466654Z75UY%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIFe5BdAkoSxRvN6yYF4iF%2F7lEkvE3FsSm%2FnpEe%2FdCu2kAiEA0HgF%2FqVRJ6o2QhtbTTd3wl72DkTUCAY41fuOv4c5FxQq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDFpP56Sos0j4M7V5dCrcAxXhKB51a8aNcMP7DN7x9ByH0bAt3JDHtCyzK0FAUDokLSwS6f1pbFlkER%2FEzdnUB8zMU706xOLyXTBgeELmBzaQXUNm%2F0XuyC%2FiyRSYw%2Faglv5MwkASw48aOngXu7w8sS7Be4Xjl1kHVoXeSAO15%2B40R1EGiuTtY7pf5dbA%2B2i%2F%2BnW0%2Fvec%2Bu6yHXj0ql1w%2FaJ%2Fs5fFyzsGsPf%2FWoB3OBUXIdTsFgaRCqCFqrifL73sRLYLKQe1yDExyPU%2BfNV%2B6flXkzSUeYCQE%2F83W4q19IHFz%2F6eSg0YPkoPUSbDR4Kh%2F0koMOrZdF5TGOOQsbtGFk1hTFvNvnClHtL2dGfuG%2FHs4emuuxCWW7uo0ulpXwbaA8X7MCrNedRe0nLPh4QmggXFGPR1FwDQx2gpYahRyn5lx8OB%2FPccLmPDh%2FQM%2FbtD2F1mwjwR%2FeKh3z9QDtu18KKaBEED5eT%2BzoBK7WMLbPMKU2Phfas0oa8JzXSB33k0QZmn3zngURw1OeLoqIZ47jNqIuG%2FtjXvDbIghDNA6oXC9Q%2FR8bQwB%2BV0OkVVyd1bxOaWteqYD17Vxr%2B86kDYW0TdmZyd8mslcZWfOFbmMmqJU35AQEJm2Uf%2Ftwgn7d9T265aQzZ8vnAEMaOWMMm64MoGOqUBG6rHKTj9VL6JC2EYE7nYpwWXtvF4UdSLuwrJvaidOB%2BsVagfkgjHGG7N7eQuqShD2tW6S7n%2BTGFVg1Q7yEEdH1oFRF%2Brib%2BKsC9MxSPiaHT9fRpnZZ1qnhrK9q%2FsfRHsaf9ToKi%2BX2ynv%2BgCcLgdHqEu%2Bc%2FX8KWgvzr9%2FyqGpm4Pzs3UVI%2FmgCOd3WTM7WrhxbAFJJcPoKCxWHM08V9ulm87GgZt&X-Amz-Signature=f5cb4636360d9653f68da32a47578a63f0096997b64c06d0d48bfbb2d05ada6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUN3RZEU%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCXeZY1nsh%2B0gi1os53%2FY38o72uLVl%2F1n7hBE8IYwlv3QIhAI2zqg9Zrk86UmYuGwr4OOvCOWf60%2FN83p8Hqt1i9v%2BfKv8DCAUQABoMNjM3NDIzMTgzODA1Igw%2FuLiJyJSDHNRwqVkq3AP8OYb0rQKh9pjPOMtmrKYL3mvk7NNrYeQsh7nLSrhqHekoRbBomY4w6tVieiPjCNL5ekrM2ujncX%2BxID%2F%2BrrZ3Q%2FW4iXInPyT72u3wIH9SNsytDijTN6TjB4nsXNu9AI7xD0hEzElvgx6VwgqiZgylrvBNeMJ7WE8BIyarskhIph5b0BWiqoLNgi8vQqARBU%2FgaMu8MlohmsuuWb0jgjyca%2FM9px%2FR2vLwflS1IbFaCIrobJxql8LsAz6Lg0o%2F8SaMrL5qNV26F8Who8h3htncIxhbKebh%2BIXZneCm7LC5Ph6FBHslE0oz%2BXI4fHg16%2BnjkyY%2BODHz7mjgSQS4rpiAkBVxcRCGCaC4C%2B9MiuYLexwlvKA8RH0Re4dJIh0ejtQshwUh7q%2FMxzf8e028E1Enftn8RCE3vv7jmVIt15aK9ac3ThxDma5BP9qbVUaBOmtGqAhKmdc%2FCOtbyFUurUVERaLZMmGIsLE5GwHAIzM%2FsXID1dv2Jwp8h%2Flh7JXNUdlM%2FHw4HzWyrxGX7ks5u0ZMLGjt8vdZCNU8wKrFGkGDuQ%2BqkErQD1SpkDT5GiJ%2Bst1LQbJHUcQXuSKq8iRXz9XVmo%2FRZSydxoF8OESAe14ltfY4Qt3SJjj1iWft0jDnv%2BDKBjqkAXNXMtJPJrKWBMvSmSr8xd6mkYgDgc2dXXAYOfrJO8wUWQ55reSl%2Fh9Ov8pGL7f8GFcI%2B1sbNRSPwPvD5IeC4z48rZ5eh753Mk%2BKT2mUjbYt%2FlV5gRTtJVgzn4ZJpHk1NRSCeXI9Lp025SVngj50Ne9dxlMMXtr1zopIlvGSt2rLw8ktWtZdnCLP52e89Nn4BMwkM1f5Dxidf5Dqga19K8p180sc&X-Amz-Signature=07ebc6a459ce45ab89476e280d2e73c1df2e571e00109f9c645fb6fe228f31bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCHQP3QR%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDUz3Ck1uhcHCcTWRXtmHLEhgDZ7ANqh0HdACj%2F338QxAIhAIebLwwTPE9RddDJvk5%2FumLi5oV5%2B9tey%2BM1aKZ%2FIvbwKv8DCAUQABoMNjM3NDIzMTgzODA1IgwWW6vbhqi%2BVcDol0Iq3ANOiuRIFvbNQ5U%2Fsoxp4LslylAejlrPfgUoyujJ1bS0Fd7znBmMSWeE8t6GxtyxTlok71267fQeALLTAyCUdZdcxfPf5%2BEv0GFPOO7fun59g5Wp8yRyogkY5TPWsdHscOvPm8HtuaIT6oQYgX8YQ8gm4%2FQ0JD8oNOjgNiypYCOAcN1xOI%2FVW3ydbwmsmJYJlrAKrQRP4gqbjHjbudW6kABybBSXBH8qU0tj%2FhMnEk1Tk79PVY5yDwdOW1MWITqGAQwFI2UfXSk6CNbk95n9glo6JqvuT3POaKMxmbdgbWQO1enlKPjyGVpSPUS0%2BTOqRBon59Lm%2Bagk6s1OEKH56f1b%2Fu3CPCga7SoTWBgUAwI9ZuS8JqTmA8UQPAKniGQgcRYlWIAHcGlMu6Sq9Ej2kVmQMMD0w1pZlCCmdNnZsAxFFzLhDSTqkJZ0nSOIQ0BL3dTxCH3Z0gHhfsNrp64hUgGGRBOr6wOj1QGuekYvZQGaYWD5Cpw4UA%2F8eIqa1C0yX1AMlYBgFWz3ok%2FdIjrgIWjmZPr4PyQoHstXVRowxNIRImyj35deKoPE1DfmFNLJtauKlJgJIhRAlYcrV34TGQ9lciya2ufqfyzsUmZvrNaw%2B1O97v2q44b0kdQXXzC%2FvuDKBjqkAdusphMkxEYPafR1dxKNzW2aGvUmNrGpoAlA%2BWQxBVLltk1unuwbMY2Nwn%2B5F6tpoMDz5ehsM4ZWagptY8oQKa9VcrAocFyfsxQ6cBT5lppBES1%2BFeLm8ZEO7A72fyv00hELvbe8Mg2AlPUadqYEL0eZBYjkfQNKrIdgXqX%2Fa0M0ofTK23pjNE%2BILMrMWTR%2FmAnbMaMg3zNKL1hyCIZSiMpQd9KF&X-Amz-Signature=10a5ee0a4e12c12d302c9a09f8bcbc2dd6f98a33a438a6e70a960a62f38c4023&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCHQP3QR%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDUz3Ck1uhcHCcTWRXtmHLEhgDZ7ANqh0HdACj%2F338QxAIhAIebLwwTPE9RddDJvk5%2FumLi5oV5%2B9tey%2BM1aKZ%2FIvbwKv8DCAUQABoMNjM3NDIzMTgzODA1IgwWW6vbhqi%2BVcDol0Iq3ANOiuRIFvbNQ5U%2Fsoxp4LslylAejlrPfgUoyujJ1bS0Fd7znBmMSWeE8t6GxtyxTlok71267fQeALLTAyCUdZdcxfPf5%2BEv0GFPOO7fun59g5Wp8yRyogkY5TPWsdHscOvPm8HtuaIT6oQYgX8YQ8gm4%2FQ0JD8oNOjgNiypYCOAcN1xOI%2FVW3ydbwmsmJYJlrAKrQRP4gqbjHjbudW6kABybBSXBH8qU0tj%2FhMnEk1Tk79PVY5yDwdOW1MWITqGAQwFI2UfXSk6CNbk95n9glo6JqvuT3POaKMxmbdgbWQO1enlKPjyGVpSPUS0%2BTOqRBon59Lm%2Bagk6s1OEKH56f1b%2Fu3CPCga7SoTWBgUAwI9ZuS8JqTmA8UQPAKniGQgcRYlWIAHcGlMu6Sq9Ej2kVmQMMD0w1pZlCCmdNnZsAxFFzLhDSTqkJZ0nSOIQ0BL3dTxCH3Z0gHhfsNrp64hUgGGRBOr6wOj1QGuekYvZQGaYWD5Cpw4UA%2F8eIqa1C0yX1AMlYBgFWz3ok%2FdIjrgIWjmZPr4PyQoHstXVRowxNIRImyj35deKoPE1DfmFNLJtauKlJgJIhRAlYcrV34TGQ9lciya2ufqfyzsUmZvrNaw%2B1O97v2q44b0kdQXXzC%2FvuDKBjqkAdusphMkxEYPafR1dxKNzW2aGvUmNrGpoAlA%2BWQxBVLltk1unuwbMY2Nwn%2B5F6tpoMDz5ehsM4ZWagptY8oQKa9VcrAocFyfsxQ6cBT5lppBES1%2BFeLm8ZEO7A72fyv00hELvbe8Mg2AlPUadqYEL0eZBYjkfQNKrIdgXqX%2Fa0M0ofTK23pjNE%2BILMrMWTR%2FmAnbMaMg3zNKL1hyCIZSiMpQd9KF&X-Amz-Signature=d3fdd662970175decabc1a098a6a86a2729b637cb3d5011bd532f92b89171453&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6BHS5SP%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIDeBkrKnD2zZLEQFIFPJe%2B%2BlvSx%2FdCGkPeZK5oAeikUjAiBQNRLP70hWc0gqM%2B3rIsCh6UZruRptpE9q%2BGL%2Fb40%2BFyr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMpEajiJyNa2jv6acwKtwDchJeSmC5fy1D4io2DKDF7RqYJOnunfGbHXdlnPAnl4q9pSBGGuxIYz2%2BVDYKtvc%2Fs%2F6KltQXChI3nTXYrLf85VOO0DHz3tLZ%2B4EdUZWg0IcFkrVuOw0PMNNKQuf6ZD%2BP1k4N5wrL7LYmYHRJ1OqzIf1p853Yn7nyWt1yL2zkVL0lAs4WoAdHgKrI9uQNmEhHrAH6RY5qUnDMhNxUiJJt5sMvX1hNIXc7g8DnNYQtpizG0ampWIJaBQ1TS6WkRvRn9DJxr%2BjhOy%2F5s9KvOTQ4lWiM3UCdzfeBwVwgcoZcdFn08xqzELc1kFK0Q2dsK0jM%2BEX8tBXsTPHVXpWkT6pSnKM9m1ht3D2xoaQcWPJGgmZ0ZCxynTwOwksJNeH5AbORO%2BKNS67Ho98OOqvflSvZaeOBxis2d4bbJX2Ky90d251A1BQq6Iimnb%2B0ccImXRS4o6EwZVL9rIwpDe1CnkWDWXHpoxXfiTfSkgq76MBKmZqN50k%2FDD3shG%2FlZYOTNCiI9qQmrnPoOjh2kyD9ks0YjGeJfG64RuTJAaYtahgnMXCuh4fZeJtaVWI8KL1CCdTvy3MoL7DnwSFlluFnxOhrm%2BmwT%2F98w0SSn3%2FaZvrnxXzNm7NUCoFRD1r4a3IwxL3gygY6pgHg%2FVuGMzXZwgmwMhw7yaRJ76KdK15x5Zc5BeHIxvtl5qWrZPHkJQzMMrEYnP8q%2Fb%2Bg0wud3Da0nTbiWDlML1qBjYWTAtf1Mp%2FvOvmnCYDYR6HlmCSyYbxucWu31a1VmRT1rWsXv73g6Hp%2FrwMoDFG63qpsW%2Bm%2BSruugO6WRawCOduiHRSp1PpgYVk2%2FAXlI1oOUnRU%2F%2FjXlijC2Dh7GTRpQsIvB0rn&X-Amz-Signature=290af03f9a66518099eaa83134186e351c6230ae7944eb16c73a2834a6e7e2eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666WGN5AX%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIGE%2BPoSoEZV1pvzXtn7tzfjsxjaK6OCq7A%2BbdfbwCH62AiAhsxvacQ7MqhQeEqE00NOVPz2BsvebARcNPuzng35n7ir%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMmK%2BSLI5CO9Dmq2XfKtwDjGkJyV6keoUP5rwZWcp4rjaMkeWlal2cuTY1Ob78BBEdGGCkbCm4SbyZ%2B%2B3IxC6%2BcmULCDSYErQ%2FKL1mV43bqWpeOn8iHbQZH0P1wnhS11RN2ToKRO6Fc93CeQCleSwdz1G0iMJ7536ojl6bZ835QWldSwfQSfiIU6DL%2BdEBS3OBX5oJ3V%2B6YBfoy8ptg8IOjJ7pXqNlbwMXLgvkgI61drqt%2FOeQOfHWTUUum67R%2FQLEENTN%2BY%2FL7CDtPCLFmBB2oe3nSEvLqIQAdKg11Ys%2FxdSd5PJSROAo3s2mh69Cqi18a0%2BIqjDmKwUYH%2F98K5sUEny1m77IkCDnH7qhmAvV1ZhoM%2Bdl1ewiNvcwpLgbs8ICKazJsz3BB63Mmmu9wX%2BkJEvtq0TjDEqhNpJj13zVlQGMKh9zZqGWJnixJXnYJzgl4%2BiDqxTW1nTMKW%2FHTFSGaoH1l1DOuVNkmjRY8%2BSW8C87Zpy%2FF9psNWW37fEfMn0mnR1xjk1nGBDLp5c%2F0FwOyK%2BQYBQHLGwuxpaC2v5DW6NFJT9oa7o8%2BfgaoAB2xlUQWZhtzjry3jqrWi43a9drt5sHV36is7cZafq84QGIClGvkX%2FBt5Aq35QoFzUodu6m2o6azVQyPnfe44owvcLgygY6pgEJO1sH2H4TirWxWbUz9CZj5Wsr5UXLOp59LIkqMRkQVpBnvWTkgJVqRg1V1l78XvCjsdcEynqG6q1zD0WpdO4rQCdIHA7xK4ZOpd9p%2Fzjz4JmHEgbg5hU%2Fpt%2FFj%2FMqIZhk6C3pfLGYWwnaWJAW2kByhX0fSyG7B%2FmKTFkgXsBs4R7w%2Fx9p6OaiSIffUkodlkq3xRktlQ4eWb03Vdmu4cK8fvyL2wcm&X-Amz-Signature=1e83cc9b86283579c89ca6f2ec254b9594ac4a4b7c7e37f4a7df531e7ecd0fba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666WGN5AX%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIGE%2BPoSoEZV1pvzXtn7tzfjsxjaK6OCq7A%2BbdfbwCH62AiAhsxvacQ7MqhQeEqE00NOVPz2BsvebARcNPuzng35n7ir%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMmK%2BSLI5CO9Dmq2XfKtwDjGkJyV6keoUP5rwZWcp4rjaMkeWlal2cuTY1Ob78BBEdGGCkbCm4SbyZ%2B%2B3IxC6%2BcmULCDSYErQ%2FKL1mV43bqWpeOn8iHbQZH0P1wnhS11RN2ToKRO6Fc93CeQCleSwdz1G0iMJ7536ojl6bZ835QWldSwfQSfiIU6DL%2BdEBS3OBX5oJ3V%2B6YBfoy8ptg8IOjJ7pXqNlbwMXLgvkgI61drqt%2FOeQOfHWTUUum67R%2FQLEENTN%2BY%2FL7CDtPCLFmBB2oe3nSEvLqIQAdKg11Ys%2FxdSd5PJSROAo3s2mh69Cqi18a0%2BIqjDmKwUYH%2F98K5sUEny1m77IkCDnH7qhmAvV1ZhoM%2Bdl1ewiNvcwpLgbs8ICKazJsz3BB63Mmmu9wX%2BkJEvtq0TjDEqhNpJj13zVlQGMKh9zZqGWJnixJXnYJzgl4%2BiDqxTW1nTMKW%2FHTFSGaoH1l1DOuVNkmjRY8%2BSW8C87Zpy%2FF9psNWW37fEfMn0mnR1xjk1nGBDLp5c%2F0FwOyK%2BQYBQHLGwuxpaC2v5DW6NFJT9oa7o8%2BfgaoAB2xlUQWZhtzjry3jqrWi43a9drt5sHV36is7cZafq84QGIClGvkX%2FBt5Aq35QoFzUodu6m2o6azVQyPnfe44owvcLgygY6pgEJO1sH2H4TirWxWbUz9CZj5Wsr5UXLOp59LIkqMRkQVpBnvWTkgJVqRg1V1l78XvCjsdcEynqG6q1zD0WpdO4rQCdIHA7xK4ZOpd9p%2Fzjz4JmHEgbg5hU%2Fpt%2FFj%2FMqIZhk6C3pfLGYWwnaWJAW2kByhX0fSyG7B%2FmKTFkgXsBs4R7w%2Fx9p6OaiSIffUkodlkq3xRktlQ4eWb03Vdmu4cK8fvyL2wcm&X-Amz-Signature=1e83cc9b86283579c89ca6f2ec254b9594ac4a4b7c7e37f4a7df531e7ecd0fba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USK7WIXY%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T230112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIEyCTAz5r1UzH%2FFFTdg5QHF37NPF6WUeqmcyQFvXIUIRAiEA3Pxnk9WEdog3wfUuUg0vbZB3EBRM7E4cIv0rvJG6cHEq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDCxX24L9mZ3GcQnosyrcA33loW6TfEnLLwtEourQw4RNnoO9LvgSoTEGUYmchFC9EzKy7WmXyoeAtnS5kzypLWICzjtwSwf64Qd%2BWprFZQeKXtBxdrAswX44tn5J5XJu4XO%2BI3jJU2I36EcYwj2vRd8kiC3ffrciakjLnSMUzTD3zNLIAib7tdwQ%2BZzHUIW4PV3F4NIiuFrE2GaB8XcfQ5BVv86NWN90zwUbuGtYpOsHqOGZ9Ur7JOt7xiGvgy29gLzSVfn2gx8sllhUPV8Y7T2q6yG48eJGZAcdV5WQTqt6zzgKH9Hz6dT6UOT2ZmqAuBeGu%2ByBvIaUJc7e6PDNQkKuBNVMNKNaFeI5uAsFaSt2N69MmdI%2BUengQHPdRbfusRP4XKS7jmGaUxqtJBg5e43k63qMzUiwDjDO%2ButBMi5KSTvFwpMicOsN8lScsQemQ2smMTf6BgAVZPJwb%2F%2F91t9%2FvsguFpEFJnMP0UgNXfTvW%2F%2BchEzNjx72FUDx6zfgSzmMcf66SGpAa7QIzOAKtw7RMmpIfZWc4gNTgAmshb8go2qzhszQdPVj5zloiTUQkBnpDMh5S%2BG49e1plhlyeU0yIT9hmGCwOzSd8flGhD3xNbLoLQO4Mc7xbSZo9ta17vI2E719w2R80SrgMOq74MoGOqUBfajsIPLNplcIxWlxwfeJwSApOATR%2F0l89FSigBn6IWCtXaeL4155FobBNbTdsXMsYEcM3C5%2BmVfv%2BwAmLvv5ombcwrW8FajaW%2BAO6RnOmjhqBiA6jvDZo4fKpSvul3Gt6l8%2FaFPlbu%2B3Ew5OZydd0QSLmR1LyMqd1MClHXjtr0fbpCkgLXCFmktAKTuLwHLLV2Dmp3mg%2BrM3xHR842FgH4eiYtvU&X-Amz-Signature=e6698bc7ab96ae48cfb3a2a3b84e7ef88eff60b976eb44b7977e97843431ad4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

