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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H6BBTQN%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDCwb6CDZfI5Uj4eQ3sQvP0JUArITAqgntRKhXfSY3xZQIhAONMqWxc0hEdmBCdCN5Z0khois0IY7DMVfw%2BDDG3byQdKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzL8Ws2l3wVg2%2FgSJAq3AMU6w7V1Ui4%2FHKyjYJ1Q4%2BzfCSUVu5hw6UihlAXhNt%2F7FT8X%2BMjEkB6T9DULwpDl8wHXH4kKIxj%2BTlXGeIjTNOE7u3uqUJpJpa6DPgnq%2FWPKN4oKe8WtVhgPoTmQrakQl6k8MNkY98GnXvlH43YAALSwJUk65cEl1J1CJIrrMA9H6gc2ROsHiBNZbW4AB8I9X2tCbmP4GZJI4DMV5qwX%2FxHX6%2F9k%2BLca4JFrjbo35vkNX9Q2%2BrD1JAwxMgVD0RxHQ3C50Cv0aEwUY%2BVYNgs2J12Eec2JfEqzpICAqlG7Bws7Re6nrIS%2B3D3VadXjXtqLc2RrCfHV1IccfE%2BHPjaHkGQiT6e%2FkyfNzNJXpkF%2B6GU1SkV9RRRUNeW0h4bSFZJKmSgXviH2ENNtiXZe%2Fu%2F3wKvMk9PEo3Yg0BeQFNVhtyZYZluKyq7xwvSwJwVSyt49kinLuNSDEedQvgPZymnst0QDQUxLpiS9QLDynthVxyM7mzMd9zVY9Hvz03%2B%2FKEiCzAJEo6JSVaIFQ%2FkqgLg68pqwR8OGV7%2BbxdWhx2QbN5x5WGdgv5wYuNgi2RgvUWfhWcdARYeUdxw5H9FIsWEyJu2IaoJ3oX89zC9eUNGwtn6JwrC5a6Flz6lPsC6oDCU0YnOBjqkAR%2Bi5WITzOr3Mg4Nkugtur1yFaPZjTQ2%2BZIM0V5CTuX7mRPPZisqWVnJlNOooaI2w2HLhRPjOt6BYtjYqnccLnXfxULh1i1PmriAWyYtYn3KPM%2Bm%2FMaRxMk1fEA9k9rTfYMYwCw8wN%2BvqImU4F26NpIw5y11RYp4Pior4EhvkgR%2B6xDsonr%2B07IEXeLrTIPZwyOI6NpzfUaqB1Mcat5sMJyj%2BQoI&X-Amz-Signature=5a6e5f93f668f9597c3c807cfe1f5fcadb6ff47c8713ba2bc2a3d5dafd8e47ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H6BBTQN%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDCwb6CDZfI5Uj4eQ3sQvP0JUArITAqgntRKhXfSY3xZQIhAONMqWxc0hEdmBCdCN5Z0khois0IY7DMVfw%2BDDG3byQdKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzL8Ws2l3wVg2%2FgSJAq3AMU6w7V1Ui4%2FHKyjYJ1Q4%2BzfCSUVu5hw6UihlAXhNt%2F7FT8X%2BMjEkB6T9DULwpDl8wHXH4kKIxj%2BTlXGeIjTNOE7u3uqUJpJpa6DPgnq%2FWPKN4oKe8WtVhgPoTmQrakQl6k8MNkY98GnXvlH43YAALSwJUk65cEl1J1CJIrrMA9H6gc2ROsHiBNZbW4AB8I9X2tCbmP4GZJI4DMV5qwX%2FxHX6%2F9k%2BLca4JFrjbo35vkNX9Q2%2BrD1JAwxMgVD0RxHQ3C50Cv0aEwUY%2BVYNgs2J12Eec2JfEqzpICAqlG7Bws7Re6nrIS%2B3D3VadXjXtqLc2RrCfHV1IccfE%2BHPjaHkGQiT6e%2FkyfNzNJXpkF%2B6GU1SkV9RRRUNeW0h4bSFZJKmSgXviH2ENNtiXZe%2Fu%2F3wKvMk9PEo3Yg0BeQFNVhtyZYZluKyq7xwvSwJwVSyt49kinLuNSDEedQvgPZymnst0QDQUxLpiS9QLDynthVxyM7mzMd9zVY9Hvz03%2B%2FKEiCzAJEo6JSVaIFQ%2FkqgLg68pqwR8OGV7%2BbxdWhx2QbN5x5WGdgv5wYuNgi2RgvUWfhWcdARYeUdxw5H9FIsWEyJu2IaoJ3oX89zC9eUNGwtn6JwrC5a6Flz6lPsC6oDCU0YnOBjqkAR%2Bi5WITzOr3Mg4Nkugtur1yFaPZjTQ2%2BZIM0V5CTuX7mRPPZisqWVnJlNOooaI2w2HLhRPjOt6BYtjYqnccLnXfxULh1i1PmriAWyYtYn3KPM%2Bm%2FMaRxMk1fEA9k9rTfYMYwCw8wN%2BvqImU4F26NpIw5y11RYp4Pior4EhvkgR%2B6xDsonr%2B07IEXeLrTIPZwyOI6NpzfUaqB1Mcat5sMJyj%2BQoI&X-Amz-Signature=5a6e5f93f668f9597c3c807cfe1f5fcadb6ff47c8713ba2bc2a3d5dafd8e47ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642CBNGMA%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6o2B2h6ZaDoa5y880ZwWHyb4Ds9AHHAtG6%2FfxxY0GUQIgUFWgYl%2F1RRmN2r1M1NBYdLt8brePrv059dTFwcq4iKQqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCsUW2smMtrrtpzioCrcA%2Biz7mzD1bCImQZH0E5jOyD%2B7vmVx10MDbVsDaziqkVOhYWu%2BH8v%2BazOR6AgOsxPdnN%2FQ6WD5boGxOxQcTzOxh3aCRbQcwtUOIqP4r8P6FRBpU%2FGb41Dt5WMAGJiEhMdbD6ZtOzP4wPETWNteIPq2CrkEhQNgDsKFEJp74X%2Br%2BuDsPCjG5ixOkaplQUL%2FDQezGjJ8Q8juzbAhZ3pWGI35YlO%2F%2FRiJF%2BjfV%2BEkbJ0k7Y0rz4K%2Fc7UGD0pZvMWLZeEuCYMn88BlfIR9QK2wiV%2BGeSHv8aAAsL5BLpDWZaNiwKuGXeJ4XQZpslzR0%2FDM0%2BnWEVodg5BaRRkSXO%2FSgfYuAJKyiD3cKWISaqt97CV8uZWxZdUljdf46JhLkv5t01hYTIjHbcIgUW3WrcwRfCxvz35WwOEp34ayTPhJGG7Asfr%2FmSAjFNLiJrSsZFO8%2FMrNprBa86unF4kFlEdsInT6QmXKcvJmkbqxEfUDfn%2F4O1tnhb7kSU%2FQYOL8RzypIVI2%2FLI7NbkOsZ2NsFU4ESRc741PGWa3vY7NQzUM0orMKtnIcWyjoNT0NbBmk0zZYn%2FN1f2KopfmZnSVil64avvpTL0KeGEMaFGXCjuGK26QUOC568QkS7sBf%2FYcmfMMLjPic4GOqUBi7OmnTZGcY%2BN5zUqM7l4PFUlWH0Ec9MejQyAR5dh1oJ36c2nAUSfE%2F3F4JF4LvFXh3bBGrbyzx2EGxQb5R1pKJrOc8kCJWYf7yLXPftXrtfc7XHBQ4%2BEBGLVK%2B%2BbLse8Yji7UwdZNlzcEGL7hWxqnF5SQPlsFLFfsufVW3J8Fpr7TT9%2B1Ss%2BMjHDLIOfVRVrBMmAJKO69WiQ3ZTag6HgvsbXVkaj&X-Amz-Signature=c3171ce0fcc7eefdf7a4804a66224eba4fec7aa03c093a9eafb80af85eeb532a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAFRLAQ7%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGVDdE3K9H0Lpymx7XKBG3ZSG8ZWk2LcxSDwVtDbfy03AiAbJYgGjvjNfOtGjWXwd4O7nRYoIXpsgDDaxX9BNsvFGyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGlcF10zG%2FtdIZtGjKtwDV6CW%2FwUqvjAZpnEMh5gvbP%2BGHHwebf3Hd7a0u%2FZ9501bsXOZ33cuy6ntNnQpuMlCHUy44bkzN3yhphv3J7utWXb2Z%2B9b5oa2oFW1cq5hCjWibpHt289tchfMuWTjTvBPt3xMHokCMRcTsz7K15vL%2FuRlEER92rm07lUwFEsGDUXxvX0xvHHUFE5P%2BQEYhNKzpHPauQxo81Koc493eHxrcohFJJfeoj54kx6zU3YJz5xMIs%2FK1LddQw7J1KLcZUzEopRoTNdOLqhMw3wXQZqXRHVjmET4%2F9A41wkEAhlsjmQZctkVdOALsysgyfrW%2FxzAyEnhVJDkBeDh6M9Uscdya6GKSM%2FMhbffCm1u9BzLc9CQyk1jm3FlP1VJMLW8jIXcbG5cDjnV6FO3gEUCNEzxBbyyoAY9zRV%2Bo1z2omozm57Z2QafoBHvEdSTFJMyOqwyL8vSub2TcPev7wDb1wtO4PimdKzY9Zbdf7%2FcccwZ1AqokXQSq2yVkeOeChkeNZ7ixVYIiNUaWvwKgqxUoSbxTdVAXphqDi%2FHFQk72ONAaBcr0sNFIEt%2Bzs8G4uFRYqSsuaE7nrI8ip4Zq709sdjHP50LaOBQjUF45dt8vAaOsY4qpPZQ9r20PvAFdmUw6s%2BJzgY6pgHRb258dsDaTXvja0qkopMCs%2BWOfXF8MnAXNrfdBSN9w%2FOw1CoZ7e5cTVcdUJkOo00ExsYp37wshfHhnike2zq3hd7ORqx%2BPM6dsn9a5Ip%2BafJRhELgU1dmsKEQRaH5w11UbJ1nk1kCjXTDKosvevp4%2B8mTThCNqHu%2BfvXL7sGchVnZeIpvEROYi7zVib5C83t%2Fw1oMXuKWoCN9lK809eJtfkDm3cii&X-Amz-Signature=b8e062bad42f517282d9cec0311d5ece3a2e74582bad9e88476ab8db8a41f7d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAFRLAQ7%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGVDdE3K9H0Lpymx7XKBG3ZSG8ZWk2LcxSDwVtDbfy03AiAbJYgGjvjNfOtGjWXwd4O7nRYoIXpsgDDaxX9BNsvFGyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGlcF10zG%2FtdIZtGjKtwDV6CW%2FwUqvjAZpnEMh5gvbP%2BGHHwebf3Hd7a0u%2FZ9501bsXOZ33cuy6ntNnQpuMlCHUy44bkzN3yhphv3J7utWXb2Z%2B9b5oa2oFW1cq5hCjWibpHt289tchfMuWTjTvBPt3xMHokCMRcTsz7K15vL%2FuRlEER92rm07lUwFEsGDUXxvX0xvHHUFE5P%2BQEYhNKzpHPauQxo81Koc493eHxrcohFJJfeoj54kx6zU3YJz5xMIs%2FK1LddQw7J1KLcZUzEopRoTNdOLqhMw3wXQZqXRHVjmET4%2F9A41wkEAhlsjmQZctkVdOALsysgyfrW%2FxzAyEnhVJDkBeDh6M9Uscdya6GKSM%2FMhbffCm1u9BzLc9CQyk1jm3FlP1VJMLW8jIXcbG5cDjnV6FO3gEUCNEzxBbyyoAY9zRV%2Bo1z2omozm57Z2QafoBHvEdSTFJMyOqwyL8vSub2TcPev7wDb1wtO4PimdKzY9Zbdf7%2FcccwZ1AqokXQSq2yVkeOeChkeNZ7ixVYIiNUaWvwKgqxUoSbxTdVAXphqDi%2FHFQk72ONAaBcr0sNFIEt%2Bzs8G4uFRYqSsuaE7nrI8ip4Zq709sdjHP50LaOBQjUF45dt8vAaOsY4qpPZQ9r20PvAFdmUw6s%2BJzgY6pgHRb258dsDaTXvja0qkopMCs%2BWOfXF8MnAXNrfdBSN9w%2FOw1CoZ7e5cTVcdUJkOo00ExsYp37wshfHhnike2zq3hd7ORqx%2BPM6dsn9a5Ip%2BafJRhELgU1dmsKEQRaH5w11UbJ1nk1kCjXTDKosvevp4%2B8mTThCNqHu%2BfvXL7sGchVnZeIpvEROYi7zVib5C83t%2Fw1oMXuKWoCN9lK809eJtfkDm3cii&X-Amz-Signature=9ecc4fcfce5d6191b08e551edf0a36ba8973c3848d6d047efd56abcecb051935&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNBFZ7V2%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIClTzrgobsC%2B1R69rcq%2B7b%2BRQJhReDSD62MQ%2FiEn03WOAiApnmeUHRpPxqk9vWMvBKuScNKf3VsPr6%2BIiqewUFA5miqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqTp5JVdEP33SflUZKtwDqHiH8Sx3C2%2FgTmhOZ4HVd6F3YaQBw%2BjI2xGMFI3MczfK5a99vPKReQKr89oI9fpE%2BCuQeTHddCeVv8G5%2BnU1Y8xgGljBFKNuFPHkoEAlSXJ1j%2FsAvjh0UER55yVI%2FhwZEBT9pgV2I4odmb59wAbilTRfr5uKS6CA2GJ3IC3sfAKRqxipeHED%2BVX%2FY%2B07ygnxlPNf5kFVJFuw2FNfgUIuM12B703%2ByrLe6h3ZFe%2FIZzGbQ3sPulmTbU6VMJ5ACcDzJfTaGHrzJpXUnMe5GALUzHFVNF09nLUZJ8fL%2B2uRZMpQHL54cU3yx%2Fu0B6E1s3NJuZplYVGb3IyLD1z0SerKTzJrN%2FWlto3zaxng0sef53WaHsbBuTvbhOvgH8%2FusSdeb6N0oJlJ0QqtYy%2B9Nb0RJUh%2BzXe0irXbmIYsMHUkvZGUEuBBCET3U8OEidjnDjS7f940T9yawZ6Zk3RjOUFllq83MKUEehqDtpMFd1wpBHfGX4cjLKz8YXnluzWcAxCN2o%2FZKBMiCwtaByYoJOn6NMCytWnum8TFPPnfpocXLmDYeMP53Il0KDEY3yTag%2BbilDYrHf5ebp5iL3y9xx4BnY9oStCQCnM7LqvhTxHV6rq0r%2B3quVqQwN5bCPAw7c%2BJzgY6pgGcIwmbABWyxgfE2WFC3ejIeMRS2Mcr7bspQlsXgRVrlKYULsUCYbuyUjdsmJmsy20Aw1DCyHIc7%2B%2F4ZWKAYwo%2BoL5CKIDdnKw98pcFp7hGfAykgm44HQ2fAEjZ721p2PGwrJBBLESEBfWVoZ5%2BmzOlFvhTQrvODRE2Qkc%2FJdJ0STcpXweXN5aw2u3rcmbhs%2F4p%2FhraavISsXJc44%2BeXTgPb9Qb%2BUt0&X-Amz-Signature=192f79cc105c555e532cc011142e2e27debecfcc737fa966e5debe80d97c8fc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IWYX4AS%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFr5NRgo8W7SFhKwQMaz%2BIdua0YgU3%2BfYSM4matnBgFLAiAZvm%2FHINyHUcGnTqQuRg6Q%2ByFk9WAQrm%2Fpw%2FriyrC%2B8yqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIfxpcteB%2F9Rp6kFpKtwDqtLW0KuifueCn0rWUMDT%2BpDT%2B1Zd7Vg0WCaDtAp0VXi8IgAmBJJateuaCDHS0gClMcyioUyz%2Be2f%2BnV%2F13hczOzvkyTetmywdu5HXfSP0PkV78LL1pEJZW2n7JxVqTnePjI2iMbl9xd99bszUSeuClS7yeteOGitN0TOUZSlj9HwdCfClOc2mpzfwoKnCK7NqSjIyvuxA4Btf5r%2BTXK%2BLR4lY9YOODnlGH8LJGiMTRNBR2TGH6XsxyEkU4ecbhKbrbFfgMBdW%2BWftCQ7iHJPIw7bSTh2fBcY9QsKXDUPSlR%2B%2BjRHwCUrfaISk0KPsJggXpEx6vQ47%2BbqnA9zzHEga58EY3sQNHhlmhkmHkv2AMFvGk7aT8QWP%2Fs3uYirttHuMQDwz2smOWKKxn1YddHYoAxNXtYzkKv5mzmfcAqEyvQSAAIkrhQTBD4yYjh8IXOIUuIoyleLBzRWPNE374dYyCDU2hVvQkfDubmn5RAIM2abCbAEogxB1tAzQP%2B0YWIzFII47JUSezfeNmvgFvWGGbGjeCqWDBzmV%2BW1kBs15ilJxGaO6oMViYk0%2FYZ%2FPMMXLF6%2F4C4RRwVbrUnecuWAkXtY3xjSfs8uGt2TabV%2Be4T6KFxBwgqpFYAxl4kwl9GJzgY6pgHJbmjN%2BvnyPxNtuL08DIESmW%2BicvfzMcwGEwLfFQJBJSIbO9mHEueiJDUsKIdqQrMhTuAosv%2FAeqMtgtblnrNEvmZcP%2BmOrJZ7A8Iep8v5BF2QGsX7yFNr8a7MvJVEN7X1mCQ0EAoHxNt2W%2FSOskfji7t3CRV%2FfGFcEVtfZExj6m%2B7ebDUZXIAWv%2FpA0PpuGp1GWqAl4F4da72UMjl9rE5eHBb8Itv&X-Amz-Signature=21a74aee91ddd3ce3aeb22760498f7def745c80e52e3042a2cba4da389564198&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DVHRSUC%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAnnxZUgJ%2FtpPaPPqrzuYTIoX8EMimrK8a8w8BdZLgYlAiB6SiPCTF028I30Id2IBspEMna%2BTv%2FVmNI425%2FQ4gBTdiqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1jrQCrGcWA5DJqvEKtwDbnMB2iSRuQlTx%2BxD4WSFsjjTJrRjeRyA2NN7AlLXt5Jv5JY%2BAzKtAQNdT39pU2dDBpN5LZaDIhKByIbMnlNGlEtj%2F8kay%2FAC%2BdBmJ0obvwu2d3x9Qarb%2Beb6UmkOsDLcyoop%2B9v80SeS680AVmyI0eSzjxkT8IYFSNCeGc5APyfMSaIgPnEIHYWIEU2Al%2BJFtXzw3fYV1BQggNvUN4iWc4uQBXkLvgyKm%2BYeEGFoAKp3qN4IsbMKGe8rYY5IfBkq6e0GNkDHXrhc3O1iEVS0mouWNLhYuuBn2gvMOshc2sPkUC%2BerEe09%2FLQAEYQXzarJDxQI9nsyL7nttvrwXYwokOzVk8F0rF%2BSNCQMX2U0B34AsbVFKCOWov6sNsu2tpqASVlnotYwWU129c7ZQqGeu24jjkTJtzSQalPUszhLX1EfXkewXXuN4Mb7cHpNE6p3%2FyIVTZext3g9xqg0xcHqD%2FC08nkQnd9eZXK1CxmCBr5YWdwcKkrCHqlOZbdf4k1nb8WKQoSgewpftcH0kqjElUnWZCoWVmgkwcKAXYLWb%2FoBxLYagjnuye6ODdIkEJvvU62A%2FrUEq0c23adBtH1leGhMOGCnD42fPRh6HlQtxtqF48TQNcd50m6Gl4w7tCJzgY6pgHZHxdm36z3rVzzqcyHKoYW5Y3ey2hZ%2F3Nh5VbL54HW1UOisheXhCLZImboHNIgWsPT0VtZ4pS%2BurpT2lSAEiebej5%2Fdmd6VYWUtWZBS9xARMU%2FRjxddjfL15HdTiLTW%2Fy55wNF6SChN%2BZVXAskVEWHGqOVODyHiVUfXr3tuoRTtf05GXIp%2F2LU3D51%2BNeSgd%2FUf1pWpYogUH5Kn3nfGt344he9MenW&X-Amz-Signature=5333503ebbf906e96ca14aaaa01e431b267002c4fab6506909f2da59454dd3e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEOUZX2Z%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCtfMSOh58khSff4K9lcIjmi53tcs8VLwzxJ7AxfZbZSQIhAOdY7d1KeCEcrDUoy4LbvHEA6wjF0o8tvsK9I5HDpOc%2FKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyw5QZe6o2VzvWLAWAq3AP8y9Erzf6k57KE7es%2BwgH88kK8nLgxqmf4YavQAcUVkqVHShrKueU7OtA75ssP6%2FBfOKlk7%2Fnyzz3CUuFJonANLSFOeqsPQ%2FyayqXSWqAh%2Bjrn5kNH0y0j9N%2B1YonZdCmlRe21TZeWEKn8%2F2tEFW4hbNPtZDIxxIKCn2DYLgif9I4Xn%2BSP70wbNd6ghxu0GVX3EWedrwYexm8PGyMpHZL7Cx8auGpUsX9HT4zz2vG5xG7FJerJTNRk4mfDY8bFdbYHa4VUCuJKF9EPM%2Bm7aDVArooJb5qRc2foql2QppTYoWxKOdhB62sBN5MtyySmKCYVTjCG37%2FJFS9pov%2FH78QWiELaD4GxmNr2050Yo%2FhtA%2BVdMU69H%2FBnNDuDtshC%2BB67Sah2uHLbdrL23zT5sO8GH%2FJeCiEfL0nke8YSkrFssC1cBDm79CmdegsF5SviYjXxr1vJWIK%2B2eqr9Ufn5LgjIMkPq9BIEJbqbbZNZ8jV9dTySl3GZzaUlGXN4H8chSVPEWuELujXjBbiK8RCGwmEb0UZs6BRfu1vpTN9bwrnCY%2Fj1wHDH%2FocaTkdD7n4QcpONXmhl82HjKeC%2FW6pl6Nrz7Ut8a8PCr8MKAj%2FnerYEoxoJp0di%2BIOvCahETDKz4nOBjqkAY44OaIQBaCCSAcR73eRroaReXS6%2BPfiOwhg1CGniLPqhuVlD4Rq2y8%2BoA5G3H%2BQ9IIVp3bJsJTsDlSWALglfoTeXQuDQNR43vb6d5LD06Dlfwi1rOP%2FGZmIewTjWEz0ZPHbDjI6HdvR9FDDg1%2FkZyZZna%2Bwkka%2B4VccC1fm9SMAQpIfkcrFLO2hu378GVN1i9iDdMJlj1XA5oTqOYye%2FxHfel4r&X-Amz-Signature=76fa1903ca73d8b01b498157bafa90980098509471620c77ef1b544b5b58c38c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEOUZX2Z%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCtfMSOh58khSff4K9lcIjmi53tcs8VLwzxJ7AxfZbZSQIhAOdY7d1KeCEcrDUoy4LbvHEA6wjF0o8tvsK9I5HDpOc%2FKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyw5QZe6o2VzvWLAWAq3AP8y9Erzf6k57KE7es%2BwgH88kK8nLgxqmf4YavQAcUVkqVHShrKueU7OtA75ssP6%2FBfOKlk7%2Fnyzz3CUuFJonANLSFOeqsPQ%2FyayqXSWqAh%2Bjrn5kNH0y0j9N%2B1YonZdCmlRe21TZeWEKn8%2F2tEFW4hbNPtZDIxxIKCn2DYLgif9I4Xn%2BSP70wbNd6ghxu0GVX3EWedrwYexm8PGyMpHZL7Cx8auGpUsX9HT4zz2vG5xG7FJerJTNRk4mfDY8bFdbYHa4VUCuJKF9EPM%2Bm7aDVArooJb5qRc2foql2QppTYoWxKOdhB62sBN5MtyySmKCYVTjCG37%2FJFS9pov%2FH78QWiELaD4GxmNr2050Yo%2FhtA%2BVdMU69H%2FBnNDuDtshC%2BB67Sah2uHLbdrL23zT5sO8GH%2FJeCiEfL0nke8YSkrFssC1cBDm79CmdegsF5SviYjXxr1vJWIK%2B2eqr9Ufn5LgjIMkPq9BIEJbqbbZNZ8jV9dTySl3GZzaUlGXN4H8chSVPEWuELujXjBbiK8RCGwmEb0UZs6BRfu1vpTN9bwrnCY%2Fj1wHDH%2FocaTkdD7n4QcpONXmhl82HjKeC%2FW6pl6Nrz7Ut8a8PCr8MKAj%2FnerYEoxoJp0di%2BIOvCahETDKz4nOBjqkAY44OaIQBaCCSAcR73eRroaReXS6%2BPfiOwhg1CGniLPqhuVlD4Rq2y8%2BoA5G3H%2BQ9IIVp3bJsJTsDlSWALglfoTeXQuDQNR43vb6d5LD06Dlfwi1rOP%2FGZmIewTjWEz0ZPHbDjI6HdvR9FDDg1%2FkZyZZna%2Bwkka%2B4VccC1fm9SMAQpIfkcrFLO2hu378GVN1i9iDdMJlj1XA5oTqOYye%2FxHfel4r&X-Amz-Signature=a924e5df2bf55498b91a0e5f5e3636d0d75cccd68a5c23fcbc8d981a077e9386&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWMDPGTI%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCC97jqiQmbxcZIwwooha8JnSBFuIvjfJj48BhOhFhrrAIgCBLe2akJU5Wq145N6mIVjxm8%2Bm7isw4bj1WzlRAixqEqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLhNMtn%2BwXc3hDFwOyrcA97FmaVyxyMxRR%2FuyCe8AybuNiHGqLEzh7iyOFSVW4TNQ%2BSE8UobweG3US5RnuTRuhH%2FNQb5j9DJ%2BbmE0NaEAohrCbYv5F941yrH1FugdOVqy%2B%2Fvfs9%2F7wz807ytoFhmulhw85jtpHwJsvDdiMOFNSyv73i6K7aZ1kHcHY4LlLFsP3kzUXHZXMtmBkziBwex7siICvoVCB%2FRpLxZBWHZtWD4JhwnuWzU3PLiscSjg%2F%2BjOyJdorPxG%2FwvqQuOCqZkEV2XOmjixDxbGQHIFlwkzOpTv%2BwL4mf7ReHVqTbQgxiQTyiq%2BiQYTySlFTpfirdMycsNyMD4%2B%2FELLkl2JGBUyOFUpFGflQv9I9yuOk4cgyg1QpNcsw6GztuAtanQXSFAz6r8WpEx%2Fu4lAWmNmUJStjSFMu45jn8dgg294FFoJtq1o6sB2IQnsBS3AoadNu1dkPcHhRv7JjCNUVzCZa%2FUMrPFlalVypV1cmgbk3gcQGl7VCxUnbpPx1AqbZ1LiPI4kFamn4BvGIJy7OAgS0IUw3UO2gpFUubDXv%2BFeTu59yCZCxmEuGQzoXuy8wY3bEl57e4PweB1FLtOin%2FVX04OPPX%2BYanx4EUJYxktb%2BqxWoboKgTMf8IKBggPb3v8ML3Qic4GOqUBe0t38kjyM0K0RwIXGMU9UiRVIXrUgS1U1%2BrjiTQKpPJVDRC%2F2zS0aKM3wwwRVmH3bCAs0loyknZcsttJm7GsCsjBUwlnB29HE00IaGzW1dbFDEsnZ0STX0NQP2%2F3lXhbCSkTb1aKCiZymeDcMSqX9ivAzBFdntjblXmxY%2FlHbFpn1AAKJ7Zrzg2hQ1XF%2F77Ck%2F36T8uu4qOigOs1Br3o6ELW1RNv&X-Amz-Signature=fea7c819c18eb237b237e8a278ef4d4d87f5d3f5cf3534941a11f151ccb84d71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GEVUDDY%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9g5O7XhCrUtoJp7TQGy2H0rF8kn6qdkq6Zzv1sqsTIAIgZxwI9WxVE56fhrSkfD8NB8LSUFm%2Fus7I8%2BzGjSNGMGoqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLQhIVzcZJ3mWnaAHircA2f6zlKXqMUuSA1ccXR22E7pJADVkCoqQ4i6yjGVqPIs2ooaiUpQeYdtVZtDXKCzXMtRmJ6LqfNw%2BnfJQPycfue9Mfke4niisk%2BKP%2BLNKARGuA%2Fe7KGdP%2BQLH62PoHfo3qcHsdeBuMDSea%2BaNLFR9SgvhoM%2FOmBUbDH5HHFa%2FTXhzEd4Jtj41cpK9QAIkxrgRHisG2ZVzqq%2BSVp%2BGtjDyunsGLnM2QoifC8jHAgQ84Gnv9qmdYA%2B2ni6MTBicnW5B8%2BuW46l2ls25ltKN%2B2otKJ24kM325BUJCMpXNeQWHXgfHrLuJV7Jc3V8RpOr0weFSyzMtHJEfAMZ2PSZqix%2BEiBdWDPSZ8coitCsKLjQcWQRROHGpXlMICWZaCR5soYgSfgbUTRG6hRP2WOm%2B9RnvHM%2FSY3%2B2k%2BMeUHCDMS4Kgv9Wo%2B88T%2Fgw%2Fj1QhZ9k%2BjlgHzCOCBkorDQlbsSHs6I5hr3cGdAtqiRAOrBnoE4f%2ByC1kKRtOrbOoRQiiKOUyaFeaZMf7xHMvqN47kM5iXDl%2FM2HoxaJcTIXdWQIu%2BU%2B5KkuoXU6BxsfCfERt8RulJi8JuqFDbww325wglyEJE1m051cz0AJvnYM1qLV%2BOVpXdiEWkWn1wbsGjH7WdMIPRic4GOqUBN3tGbOCkyrqI4EMqCaehizHD8LGml3G42IZNGSgk3nGSJppOb%2BzPKG7%2BxVcfupbF5LXo%2BxMrujw%2BA1kJJzyPW2fUy7Ss233NUk7MHeZizlHY4VlDv3P0RxnDKSwmUuvpMxJbRJl2ovnneSKXya8gqUPrnuUFaECZPryCqx8rIRTMKtLdU52AvRNiqwqW%2FetysOyT534iI3Tsb98QNkOf7qNGUm%2BD&X-Amz-Signature=2752d402881ff2d7c3dba6a257a8da9581c0e2404ad0c8b8c1a60b8731e66fd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GEVUDDY%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9g5O7XhCrUtoJp7TQGy2H0rF8kn6qdkq6Zzv1sqsTIAIgZxwI9WxVE56fhrSkfD8NB8LSUFm%2Fus7I8%2BzGjSNGMGoqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLQhIVzcZJ3mWnaAHircA2f6zlKXqMUuSA1ccXR22E7pJADVkCoqQ4i6yjGVqPIs2ooaiUpQeYdtVZtDXKCzXMtRmJ6LqfNw%2BnfJQPycfue9Mfke4niisk%2BKP%2BLNKARGuA%2Fe7KGdP%2BQLH62PoHfo3qcHsdeBuMDSea%2BaNLFR9SgvhoM%2FOmBUbDH5HHFa%2FTXhzEd4Jtj41cpK9QAIkxrgRHisG2ZVzqq%2BSVp%2BGtjDyunsGLnM2QoifC8jHAgQ84Gnv9qmdYA%2B2ni6MTBicnW5B8%2BuW46l2ls25ltKN%2B2otKJ24kM325BUJCMpXNeQWHXgfHrLuJV7Jc3V8RpOr0weFSyzMtHJEfAMZ2PSZqix%2BEiBdWDPSZ8coitCsKLjQcWQRROHGpXlMICWZaCR5soYgSfgbUTRG6hRP2WOm%2B9RnvHM%2FSY3%2B2k%2BMeUHCDMS4Kgv9Wo%2B88T%2Fgw%2Fj1QhZ9k%2BjlgHzCOCBkorDQlbsSHs6I5hr3cGdAtqiRAOrBnoE4f%2ByC1kKRtOrbOoRQiiKOUyaFeaZMf7xHMvqN47kM5iXDl%2FM2HoxaJcTIXdWQIu%2BU%2B5KkuoXU6BxsfCfERt8RulJi8JuqFDbww325wglyEJE1m051cz0AJvnYM1qLV%2BOVpXdiEWkWn1wbsGjH7WdMIPRic4GOqUBN3tGbOCkyrqI4EMqCaehizHD8LGml3G42IZNGSgk3nGSJppOb%2BzPKG7%2BxVcfupbF5LXo%2BxMrujw%2BA1kJJzyPW2fUy7Ss233NUk7MHeZizlHY4VlDv3P0RxnDKSwmUuvpMxJbRJl2ovnneSKXya8gqUPrnuUFaECZPryCqx8rIRTMKtLdU52AvRNiqwqW%2FetysOyT534iI3Tsb98QNkOf7qNGUm%2BD&X-Amz-Signature=2752d402881ff2d7c3dba6a257a8da9581c0e2404ad0c8b8c1a60b8731e66fd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664A7CQ6KU%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T113520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGFAbh2gXYBHyMcWHyrEO0duPQo8Wq4uu%2F7z%2BvfgJCGBAiEAr9AofV45wJdRy0s%2FEkn9MXGIwzOQOu6zsYX77eLDdsYqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP1Wk5aAms8jOPNA8CrcA5tyaukEyBmUIJKeVRK4R5npX5LUZgzTkhn9R%2B6zEHNV%2BrArBv9D48FocEnqf8vAkQ1QThldtuEvIaExGPf%2BHAaQlA6yBG4bJgbkUtuJ%2Fa274w5IdWJZZcr%2Bq2miA49kFWMrDimLXEIg89%2B%2FLpGphdjougxIh1cY2AzqTMak33apXZnNwUHZXI44rYW7DL3oS85fv8yd1EeARayNf7Hr%2FEMMN5vOzy%2BCxHOQRdvwVXvTTnPpMzNzt7nwFWYLAFHwh2qzSZT13xpM%2BqIhXw2N3TdTV2YOXWje1yW%2FnxouEMcioYBEwYWiA9vg6V%2BmB4vZqZ15ObKWEQJddaIfKfESbL0NwLvzL6dRfNHhLGPrhgh6mT8PLlo%2FfPAGN9d%2B2atIJJQxmwwmy%2Bzaj0Aao9Yfdc1WMpHfaKtD8uXahFRD%2FsssK%2BjrZMtAAEWBqNUl8FqZmGQnDb%2Bb4eQnUbSwNNtsrWNsR8Jsrq2CR2bByS4eNCysxJar6awlkMjVH9NE8DMgc4UVIUapeGoAfT96T1D0x0vs8WaJKc3YWqnQxkS7W3jXEHf6t03xcCSx8YZF3CD9TK5CoPzNIoWvEDyp9Njt4sD0rr3b4NFasEnolhfl%2By4fEfWcGIQb826V0jPiMPTQic4GOqUB3n%2BqodTq7QfX7TNGJRhSpEAuFo%2FcEARJZXCTzq8w%2FHZ%2BT%2FO2Fgb7Ye91h8f9Qa2yvXK4wKSrLTzCX28%2FiJ40FOsx9hxTAhciBxpCZNh6KuJfmSQBhgGq4gxaXgFnhVsL7NGDSB%2BSb1Kj66UZC25UOCQs9gs4i%2BE9%2BI3Xl%2F8mweLhnKJxkK7i1Loq%2BxTCvEj2l81wkwP9BX1gvYUWFOqxmGzo%2B6Bk&X-Amz-Signature=7e2eb71113dbcb17c5d32fccb143ab2e06f9f33f436060d5831e083da1e7d76b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

