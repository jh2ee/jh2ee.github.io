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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HZGAATW%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCu0AVTgBx0hDUO98oHLGvDlDkPsAiAJ15ylookDzBykgIhAJj5YSj583MMIj2XIBh1%2F%2FCXLuYgs9LDRD3HiYCPf36OKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgykDXUELxs9lXhoWAAq3AP7t1bQijP%2B5pYipueqfzLOLiHvZsM8%2BE1khmxPvdKVhaTuRtgV4kSOda2w6b8dF8dua44LeTw2r15IyWf9Heaa0uQuQVzshTikywGF7bwKSQC5DHEZ%2BTNfvaBrUBuWL7HA1fVst7cuMcdyiINpHax%2FNu9Yi0OssQI%2FdxuQ1LkOH9BVa8dBdioz3S2dGDC%2Fa%2FxoUB0sZiCXNLtavMSZgQ8mD5OIyeQ1pFsOH0C0yVGEsv1lZUdlW%2Bjwe4sG5WvemU6GxsAW9YcxgFi5%2BZ%2F9eMyRLikCQbT7Qrfxx8nVNnu9%2FEMgd1XGZQyLExAGvPH1xRB11Unuz%2BX2d3OMQSy4y3nOXyddJRu61No91KMxeHUWJ%2F62US40cFyKRP9Fr%2FXEV4F7G6STiB6SRi76MbAJDYJzQblNnQXYVIGQ%2FzdulxSCPUbErIdl2LOwHgsBlQQd16xo2d0wWK%2Fr4iMNWi6LKm3ciKJDj0elvAdoeATBNXt29U2Le3uOHMdFlLYrrNjKf2fx6zw0cUNbRqTFjEyS016lafcHoNkIugYbxR8ZI4CMUZRCRfVCAosjIT4t%2BzQ4G1vDs20vQfaCopSS7%2Bx5KIreSf3GocU2bpBA4wv7VS4FJlBSd4GWOxxIxnWhxzDxjfrOBjqkAb6IeI58SCXVjwztN1Bj287kFZ14CeiPJZLpkVdrO6ZqODfp%2B6%2FOuQBysDQEPN3MjfV6Mxhd%2BzR3M6Q%2FD%2FpVcZ%2B9QMpgUY3gJ2c63y%2BIzlB5q%2BEWGW0oYhc5gLCBDHsvU0Ef42ehsfLKk7tyBBcy6LKDHihdyqQld3MgckjOunC%2BB%2F8laI8StwfzS%2FVkA3hBJVP7FzH9Qb74yI91e%2Bhi3F28pl9k&X-Amz-Signature=e8bb2a84f7e9fd2f963a07934d1986130eb222ea12f42912cd295661a8ed0fca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HZGAATW%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCu0AVTgBx0hDUO98oHLGvDlDkPsAiAJ15ylookDzBykgIhAJj5YSj583MMIj2XIBh1%2F%2FCXLuYgs9LDRD3HiYCPf36OKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgykDXUELxs9lXhoWAAq3AP7t1bQijP%2B5pYipueqfzLOLiHvZsM8%2BE1khmxPvdKVhaTuRtgV4kSOda2w6b8dF8dua44LeTw2r15IyWf9Heaa0uQuQVzshTikywGF7bwKSQC5DHEZ%2BTNfvaBrUBuWL7HA1fVst7cuMcdyiINpHax%2FNu9Yi0OssQI%2FdxuQ1LkOH9BVa8dBdioz3S2dGDC%2Fa%2FxoUB0sZiCXNLtavMSZgQ8mD5OIyeQ1pFsOH0C0yVGEsv1lZUdlW%2Bjwe4sG5WvemU6GxsAW9YcxgFi5%2BZ%2F9eMyRLikCQbT7Qrfxx8nVNnu9%2FEMgd1XGZQyLExAGvPH1xRB11Unuz%2BX2d3OMQSy4y3nOXyddJRu61No91KMxeHUWJ%2F62US40cFyKRP9Fr%2FXEV4F7G6STiB6SRi76MbAJDYJzQblNnQXYVIGQ%2FzdulxSCPUbErIdl2LOwHgsBlQQd16xo2d0wWK%2Fr4iMNWi6LKm3ciKJDj0elvAdoeATBNXt29U2Le3uOHMdFlLYrrNjKf2fx6zw0cUNbRqTFjEyS016lafcHoNkIugYbxR8ZI4CMUZRCRfVCAosjIT4t%2BzQ4G1vDs20vQfaCopSS7%2Bx5KIreSf3GocU2bpBA4wv7VS4FJlBSd4GWOxxIxnWhxzDxjfrOBjqkAb6IeI58SCXVjwztN1Bj287kFZ14CeiPJZLpkVdrO6ZqODfp%2B6%2FOuQBysDQEPN3MjfV6Mxhd%2BzR3M6Q%2FD%2FpVcZ%2B9QMpgUY3gJ2c63y%2BIzlB5q%2BEWGW0oYhc5gLCBDHsvU0Ef42ehsfLKk7tyBBcy6LKDHihdyqQld3MgckjOunC%2BB%2F8laI8StwfzS%2FVkA3hBJVP7FzH9Qb74yI91e%2Bhi3F28pl9k&X-Amz-Signature=e8bb2a84f7e9fd2f963a07934d1986130eb222ea12f42912cd295661a8ed0fca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466353DB7VP%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFEMQOCm0jHvD0OhUsfjkuJu7AZX5bHtAh%2Fg2p6MNczLAiAiAZ4WlMZ2Y8atKI3NiNFS0d0qwIuvbQJgnVqoqgQqBSqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLFuGX5CJwWmuRIlmKtwD7Fvq4QQ%2FcESIsvE4ZK828WRSzbyY0tbM57h0WAdG%2FEEBN2PzW1xQN2bVrRYquez3jeNMJF8utY15KfD1PlgTOYokR%2FVzx%2FnO0g%2BxTo%2BtGjaWeWp%2F2IekGxOKmOJ1DdQM7Z0EzmCMctomII1HqUsJZS%2BLYJqTFaB%2B4MFndWdDxoQ%2FXaM7pjQ3NjUujy35h2MCYsLOyEAGPH8X%2BeuTBrgN1ThBubLsP6Wrl3QY7sWehxj9U0XA%2BG%2FN9fdF7b1Sj0mK9K9P8qFNUWHP4vm3N4ntlBqvUDVmyTarsqBXNgDV%2FKtE4Ou4T%2FoaNypsgYmupqZQUPQ5MLvd3y5Nzd8ZhcrCXB12xd%2ByOtNe24ofIF2f7jAJZVSbABt3AIIpk%2Fneo6fg%2FLuKs5J6gVfZpU0%2FMDdjjKaWz%2B1WQxv4DnGJVyDHa8A%2BcYoTkQtoZIQuyZIGgenCKoIS%2FfW4i4ETBw94w4nwz9DCnSUI2BegOY3NyVlGN%2Fo6EypxMNylut0kfI3SM4UsJh9LMdnKfkNTDl6DphPnjHs4cz940TYohnauWK3Be2JTI%2BcVYBt87YGfrIu7wezDFF5xsj%2BnVaxj0%2BtDFOGXfBNQSqIDqmMJUfOyVSbxT5L31g3gVaYIEXMJOiowsY36zgY6pgEy5ixm3BZTb6vf6I98kaL9yWNludvCA3OgNrhlQa43%2B5mn5WQIV%2Bi75wWP9CJ3dwJsgt5m01egm8PCDnv2gPWjXpA6CQKeGoXLmt5FBNK2NtQWiryCsrlrQcxGSKKUPls%2Bp6cCAUYbD4RzCJS60C7eNGAbsycxnZNDptDy8NBCp3cRexgZ35UoHuuvEdelVYxXijzf%2BddpOQc0jNH8SQulxw4lJ%2BKV&X-Amz-Signature=bbe2acbd3a4706d81fe5b88886ea344d3a407255c7a3e44d9c56f8af9f7f97f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UK55FPJD%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGf%2Bm8%2F03OxuNi%2BjfaLZ%2F71QfTXr0%2BU8g3QQbV03BwCDAiEA15NsTvtaNUr2h6IJU1vshPU%2FBhfUz5vaFWW4VumsBjkqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLobibaCfVjjRWgNwyrcAygD0h9c1vUgSWQ1MqRx7C0M6kvmZtUrdiEqiVGSckVMZoY6pfmsWRnGjzsoD9MToICHb1lMzCGneOLCWrb12fUK4baGBBFWYdwdImoO7w2HjnYs928hHyi44C5E5ksdBp6LxjbsTg5%2BquXCPM%2FpKUkbXyL2Qr013xer5Qn5bYpoGurop5JgrxNfEMXWIGdPolQwA5D5BDFzMN%2FjzmI2qItt1T0H7gQAgszyGtJ3T4t69DMuVb8PYyDWnkp2b3awwN5569nlYFyRRIfMUF3wFWSJrJLuOdnN5uIPxo6P2Z2VNGnpvetv2ZW3Mlh66CcGAOqQxkVtyVWojhY3pC5nxbMSUGRJZjFfis2rT0xdnnJqQcw62h6kj8jzX40pXMZQ6GejlufZau95ZZewaKabp6Ry3IDsBKHvUJKyo7fZeDKfylKKv0CaYhNPpYgMV7EYOHFd7fJSo9udWBHED2yPhBvFDmQVvsoZ5qSCxc4%2FefbKebwQWN7dWrmHgZc%2FlYxNFRwdfRd%2BARBnMJ4O9ZmfxXFd1nkXVuQU%2BRCd%2F5wwZR4ulvjSNggiWly7%2BG8XvmWEMj0N4BUx8oSk1vW4XH5zwJwEZ4WMnhfSsgvl0xsTtp%2BN2CES43f%2FFoWlN9HKMKaO%2Bs4GOqUBggmZ%2BFaE8hxpag0l3ODaD69Oi7vyEyP9Z%2FVdumVhsdxhUDWc3ehI%2B4PGcrp%2Bro%2Fyh4B01Gh%2Futb0pgtNg8%2B4C4AbCt5z9MXT6nJLBTsft5AppoCXjP03tsT%2FCH98CUoi4JsyqUUrtv%2F2bu3abjVzCH5bgM8dsXsbFmM%2BFEXlwzFp5%2FeChFxD1dVU52Qm7HG4yo%2BH3kMKrdLs5wUeYe4mEi%2F2813Z&X-Amz-Signature=6ab62965a1d52e63241a783868abb56e9407c8a856fa174fe559de710c53546f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UK55FPJD%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGf%2Bm8%2F03OxuNi%2BjfaLZ%2F71QfTXr0%2BU8g3QQbV03BwCDAiEA15NsTvtaNUr2h6IJU1vshPU%2FBhfUz5vaFWW4VumsBjkqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLobibaCfVjjRWgNwyrcAygD0h9c1vUgSWQ1MqRx7C0M6kvmZtUrdiEqiVGSckVMZoY6pfmsWRnGjzsoD9MToICHb1lMzCGneOLCWrb12fUK4baGBBFWYdwdImoO7w2HjnYs928hHyi44C5E5ksdBp6LxjbsTg5%2BquXCPM%2FpKUkbXyL2Qr013xer5Qn5bYpoGurop5JgrxNfEMXWIGdPolQwA5D5BDFzMN%2FjzmI2qItt1T0H7gQAgszyGtJ3T4t69DMuVb8PYyDWnkp2b3awwN5569nlYFyRRIfMUF3wFWSJrJLuOdnN5uIPxo6P2Z2VNGnpvetv2ZW3Mlh66CcGAOqQxkVtyVWojhY3pC5nxbMSUGRJZjFfis2rT0xdnnJqQcw62h6kj8jzX40pXMZQ6GejlufZau95ZZewaKabp6Ry3IDsBKHvUJKyo7fZeDKfylKKv0CaYhNPpYgMV7EYOHFd7fJSo9udWBHED2yPhBvFDmQVvsoZ5qSCxc4%2FefbKebwQWN7dWrmHgZc%2FlYxNFRwdfRd%2BARBnMJ4O9ZmfxXFd1nkXVuQU%2BRCd%2F5wwZR4ulvjSNggiWly7%2BG8XvmWEMj0N4BUx8oSk1vW4XH5zwJwEZ4WMnhfSsgvl0xsTtp%2BN2CES43f%2FFoWlN9HKMKaO%2Bs4GOqUBggmZ%2BFaE8hxpag0l3ODaD69Oi7vyEyP9Z%2FVdumVhsdxhUDWc3ehI%2B4PGcrp%2Bro%2Fyh4B01Gh%2Futb0pgtNg8%2B4C4AbCt5z9MXT6nJLBTsft5AppoCXjP03tsT%2FCH98CUoi4JsyqUUrtv%2F2bu3abjVzCH5bgM8dsXsbFmM%2BFEXlwzFp5%2FeChFxD1dVU52Qm7HG4yo%2BH3kMKrdLs5wUeYe4mEi%2F2813Z&X-Amz-Signature=2af188f5ae95275426f533e90109a68bfe151c366ab3c46b7b4bda98db5c35a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GRLCIM3%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD8gxcSrBKhFEj3g8LKA4BLaiqEeODTca2i%2BICnSHcP%2FAIhAKu6beB7UOSg5kd2n1mg%2F5CNXmK%2FaY4fP1siisabt%2BMZKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzUFwWw7OpKERUXehgq3ANLM0cTmYenJwSPBr57aiRGgbJsktWYr6RIHsXbbvClpqReOwzMsSqa3V6PqzYBqFaAWBHw5TQ2uxPf3s3BAGRd3mu1%2F14c2bcxKfs5NIOS282OeKF%2BRdPOqM9ygSTuZI6iue7pqhw%2BdiAVPHq7BPO%2FD5IGD4eCxqtYzYD4HSQJigQs81Qo6GOlVkxgEttFhu%2FMIyfn1%2FXald4dhWqMVDT2RwbeWW9tHBW%2BuHDKDiMcFclvCWkhx8cRRaDK%2FK35ylkU2pYKOajEmOm3e0U9moRa9RDmsmOidq5hNSvYvXPE8pN%2FR7avzpsUiTZLmKsfVkJNh5mRMQ5LrnrmiZSGMDcDGfLTP5dUjYroAaCRcgbtOVawi9l8l%2FQOIurvBXxo6RKkJa%2FFeIqiq9MVAw9r0CVXnGTr%2F3Zt7ft8%2B4kKrcmOlrl7yMrlUoIHjx4mShLlhVPaUB3X3LW64m55%2FgIxMZ5oa9C4rNFlrqbUfhqA2D6iXjzoSdtIITOuWvrVHzH4kGIpPCywBTzAovWiiaR6baCpK8wzlbl8uX%2B0zYR19ZYWv2U7Kfs7fi%2Fu5zflZLdeIyNWLTXn6ceLqvYFdYbBGci8Sx1%2B3ABuUR111Ker4B2DQPvHpnZ0uqJwC%2BD5HDCdj%2FrOBjqkAXSfPc%2FkJBruf2fUV4Ki3BrLCit4EyY0byoWIHmLKL5bSxysn0tjXbxHeiyyWp4KC%2F8SGa%2B8MfvBN24rRi3pBYZoYCZSS6PMI36aVO0EXVhpPxAvjPVVmlQW%2Fy%2FGUMSc9zZ08x85gAGjB7e9Sg26mzKmWaql7OJr%2BgfDkPjiNHxbrPHw6EFhumE%2BJgmePj75Jaxi99twPSqyIfCbEDLieusRXdYx&X-Amz-Signature=bdab97252bfd046f7e649b821f31217b1f5ec151ca479d9a5024cb30e04b50c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URGN4UWC%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDHoyeTcB%2BcaBqTFjxXZKpKghtXmvsgUEfKEYHXDe5NkAiB9ab%2BvaXe%2Br8RaoMH3t81FU2KF5HRldANz0OZtPdMspSqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6Tlqlm5RkEzCOEPnKtwDVUea2UxZA5o7WboYBBsfP6rzcrriQaJKyoykHengEf8%2BqDTCZdMd5b2el1RAgn9uj%2FbY2DP%2BLqIWVDTP0BVvKGNk1SmASFk7k930S3DQWOcY8MdBNuAtlgJ4B4nE3vOlLBGZHSADO1N8G7%2Fv6GWBHfkXaBnD3P5wGVZI3ZXUYJyiwJd03LbSOdSutFRgr0xEzQHCNiRIOYpBZpMiqGUG2Y1%2FJw7OTfRcE6jsKc6tkGqfVJ7mdw14yWmrEUqSadJH8v2sqQ4OG7VVcD%2BHmm%2BkYc22ZMbIdUfNnr%2FJwsqq271AZoOIPSgg%2BVNMD7ABvXWD2tdP63LUOoEgqp3B4BNeV1UXKdjQb38jzRzX6BiUKpViPh1QcXT%2FGiWsWZiC6phA2LIT9FWI%2BDq8pNGpk9Oob2SlCragoEnSmkWnLA%2B4k9NVEv%2FHmB1KHFJXIiWEpKh3saBePm1H58GDiKB0TaUlEyIj7KMoOehA8Cf25Gej8o8zLlyJJD4b6GZYhEsFj%2FDgETj%2Fvc%2F4EnX%2BvDrzzrQwyZhuaD6zaEswSY8V0wotOmd4Es9p1S65DyVrD1JYREz%2Bwt6S%2FaqSUgPVpo5wa9t0yOhrwkfrMR8AFXwqnzxzaBmLsWSYA1hKWQoRDlgwqI76zgY6pgGzwWjlAsygw8eHA2HwFt0xk7Vm%2FvcPhUI6gbtmCwj1xcFwbAOO0iz%2FIbW4Y9fhyjW2XWI4hDpOpljoQSfM241z6v53s79I7e8Fj%2BgeKeQLanzSCWNKVefSZSfxYO0CtxTBtYbRHLN17%2B9I1gIibv2vBk%2FoxshkZExyO9w451Jwe%2BPES1FDNKox1BOCkNDZcbZ3F765r3UbnBQFTwUuFXExAASJgO%2BL&X-Amz-Signature=787d8696adb9a87cb460d19c1a16062d8428a7cc1d6ec3ba9b480b9ffdcd3f94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKMMLBXD%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC1rfmIq0VCHeSd4CY13Ltvwr3RRB3BQyR8SR1d%2FUeuTAIhAKKAkoItIKH68w2qDieq0EiTsJWOJ%2FduYTpLnznkjy3YKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxEI7NMsO3DpLd0NeYq3APoT9W%2Ffs9n6MAJcOsUL8hBpVLO9CpRhlNW7t0Xt4q6kkV5zvboEu1rr7FjVEEoDEMLd%2FQYl5%2BZC1fRkBROfr%2FMuugnI8FJawAl%2Bh6mRuchPFTFXBLC%2B8S1ory2qb8%2FaVS%2BUKHSQz17vgtrHFzDmNK5ZqPX7p2A4ZyF3hqPeJXGq5kTu1TfIEoo%2BcK1YxYMTMTvU0wKi7rg50CJ6X0sgYdsNWJLlSZXCPcewl%2FdGRPrbx4MiGqyMSjwAedosU8gjymS8BhnmNY%2FtF8WCLhD45cYwnFe2L8%2FwMQ37M742dsl5Gkfni5tFiIMirdKwTDLucZPqh%2BpPD5fpWE9WabhHCJ46mAgI3Duz%2BafxwZFczs95NLMkJP4ORJX0xUZ3Al7kE4v171P5%2FDQV7si%2BjGwEbEmw8Ha4sHhwPiQDDmiO5ZCz%2FBlVzzjf8FUqXWstrXETiuMiDTviZ8fdSNIYCb%2BAN%2BmcvZkFAjR1%2FQa0dfsbsilzEmtzrGnOuX5sFNErVeqq9RRIwCAsFpqmhejfmjIb1judPo5xucylZS9l6tG4dV8o1BpRYJQK8mdq7AklsWQqZVcU5J07l6IfgLJBbIFKYC6SKcFpiK9YTBqqUphq9UVOZH2Nu%2FL38tlCNt0GjCbjPrOBjqkAb2xIgIavqDoUmm2tWA%2BntUUhWZn6odUd3d6NW8fm8nyvs9Hh3zpTklUmMX9otthlD%2FYklcL0T1vep6QPPzg6VGi2aZ8K6OVcNSH3NhwjRLmzS%2FcYeFA8EB4Es2StjiwRmr37yt4ELyqo1RHwxYEiia2u1hO7ASsb1O5GBbDrUW2r8rRpqEJoWgSrA6KwWPADjcbeoOrE%2F5mfrl%2FeHXvGCzzfIr3&X-Amz-Signature=8442175d9c6249cacaa99766a97666c48f94ff2b2b5537a699d4d69ffe225759&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNJRCUH3%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8L%2Bk1yGXVLa85Ml7DAUQ4WGvRfsYZluzXqzGijSKrXAiA1VA5sm921SxWGArupAaUXxAIAJOZsueLW81SlDkm6vyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJ0hbdF38RpjZth3NKtwDwgbs0WRiT7WEsbFBO9Yen9u3J%2BsosYWgs6W5lls7iUKmA7hO5QO2HB%2BCExobS02Tcf%2FVW8Kz74pduvu0iKQCwHbGGzWxVuny1q%2F6cPaNP%2FP130rGjT9doP1KdPvEE7WQIrD%2FzlFJricl4ENEz0E%2FBuoPWEx8q644LPxrQJWe84%2FfvavrNIHp6AVBG%2FO8lsHM0DKIVlZadL%2BkXEf%2Fewy16a4z08E6Izh0Xl7%2B9k%2FbTNHn8cg76rViXYpOcL7ylrTwHtWuroDCF%2BaZpSl%2Bt9qcyly5clEhSynmV0gfEq29%2BMfUnU5XucSjdaA7dmwcihsUsD0HBnOOZtJSZLz2bUwdYlZdkAD%2B2a8aydupqax9rJO3gfSq0jBVpSefc9MmT7pZbITYGN4XgivyWUPAqKws%2FOykP0%2BDS6kBmvkq%2FOs5D4ZtAWo4n1LmiLWQeaUcshEiN8uAcfB4VR29EB5Pcnzh164HqE05ofzLJuy3sDgA7Dg44fTNwnnjttdyaTZy5ek5pyBEh5Tiu9TIeWNpuCQ7dCpKq%2BowNoCOnSjsplj%2FTZiYLFws0Qqio9iccaL5Os6qW7L%2B0nj7B62%2BgLLbuI3H1NBuH2RVhP96jZdHUhQjoXWcz2jVxwafLcU7ANEwqY76zgY6pgGPniY7E0JvkQNkJ67%2BZ%2B%2BqIJB%2FgaBXFk1YGgzZcLZBTBp5KypjwvP%2BWwa5MaKJwBJDharYBkydgIXQcEJEgAgP2EsAUB6P5mOqGWkGcf6m%2FXkKj1UARAeYBUXfU7Q8ULAytK6UBuvWgWtW3q%2FZ0WBGedQs7zdld%2F34M1HyU%2BiDUSC1fjzkxo2TbKTr7sIIO%2FFli1Osn6yXch7qMLToJ%2BfIDKng6L%2Fh&X-Amz-Signature=159083875150109ec9c590c1a352cca78dd0cc746d10946128aab6f1e45071e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNJRCUH3%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8L%2Bk1yGXVLa85Ml7DAUQ4WGvRfsYZluzXqzGijSKrXAiA1VA5sm921SxWGArupAaUXxAIAJOZsueLW81SlDkm6vyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJ0hbdF38RpjZth3NKtwDwgbs0WRiT7WEsbFBO9Yen9u3J%2BsosYWgs6W5lls7iUKmA7hO5QO2HB%2BCExobS02Tcf%2FVW8Kz74pduvu0iKQCwHbGGzWxVuny1q%2F6cPaNP%2FP130rGjT9doP1KdPvEE7WQIrD%2FzlFJricl4ENEz0E%2FBuoPWEx8q644LPxrQJWe84%2FfvavrNIHp6AVBG%2FO8lsHM0DKIVlZadL%2BkXEf%2Fewy16a4z08E6Izh0Xl7%2B9k%2FbTNHn8cg76rViXYpOcL7ylrTwHtWuroDCF%2BaZpSl%2Bt9qcyly5clEhSynmV0gfEq29%2BMfUnU5XucSjdaA7dmwcihsUsD0HBnOOZtJSZLz2bUwdYlZdkAD%2B2a8aydupqax9rJO3gfSq0jBVpSefc9MmT7pZbITYGN4XgivyWUPAqKws%2FOykP0%2BDS6kBmvkq%2FOs5D4ZtAWo4n1LmiLWQeaUcshEiN8uAcfB4VR29EB5Pcnzh164HqE05ofzLJuy3sDgA7Dg44fTNwnnjttdyaTZy5ek5pyBEh5Tiu9TIeWNpuCQ7dCpKq%2BowNoCOnSjsplj%2FTZiYLFws0Qqio9iccaL5Os6qW7L%2B0nj7B62%2BgLLbuI3H1NBuH2RVhP96jZdHUhQjoXWcz2jVxwafLcU7ANEwqY76zgY6pgGPniY7E0JvkQNkJ67%2BZ%2B%2BqIJB%2FgaBXFk1YGgzZcLZBTBp5KypjwvP%2BWwa5MaKJwBJDharYBkydgIXQcEJEgAgP2EsAUB6P5mOqGWkGcf6m%2FXkKj1UARAeYBUXfU7Q8ULAytK6UBuvWgWtW3q%2FZ0WBGedQs7zdld%2F34M1HyU%2BiDUSC1fjzkxo2TbKTr7sIIO%2FFli1Osn6yXch7qMLToJ%2BfIDKng6L%2Fh&X-Amz-Signature=0f411216f64d85ecabc15a19a5b70f30283d4d2c6fbedf66aba238e1dc49fb1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5ZFC7YB%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDwDiCc0gGT2vBXziBmNzn5aHph0XA2s2j%2FCqR9EN%2FYwAiEAwtDmNtqYOd%2FQ1bQNPADzubThsQVyLF6dO62e8e8ICl4qiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHxSUUD9tWwQnxYl5yrcAwkzIOiON9XcyeyAYLTpmoYWcK32AlKWae51YGM8nRjeqVZfIkZIR7ynV8cwAcBUZBgXE2eJGHCJ5G9MYwNZmE8PAc8ikOApmdiJ9SLHUAdDe5K2s%2F7QvgktQmbKXR7H%2B%2BUv22EQnah3jlK4%2BXMXZDy8at0fnOB8ZGaXhuKV7UaUB1JmIrowV6X2d%2FM1RcnilOAip2%2F%2FEIa%2F9ic0I%2BRHPh2KyNzPqPssGk3eEyVe9yKOt42lraxPYyFZfJCaqhbE%2FcOmdyw7ExiEhPFx3C7rqWsDONq4OdtIf8aCbrG5vUYYAg3UV1IrH61P0saM%2FK2ueadIOoCwHiIqV9E2rq7kxq%2F2h%2FJVc9igaMp0QHZspmOuWJeFm%2Bg0BTFgJjZ4ro9cQReqMycSYXIv4%2F8iG1gFKZrkPxNGdBrc45t6XzBlrbv%2Fxz%2BLb0W6ZAo6OljVTTDFrJGqfEO5lt%2BFxij0Dz628E9WDDUo%2BZ1QeUJCCrpZ4HSYClA5alYwnyFdHEs3z%2BzYl%2Fs22T4qpEOMFXTyuGtOlNoe%2Bbg3ruG%2BbFZudqzrE6K57zKJ2GuyPVBzTpGVPOUcUVOCKI8wA6FkgJIOH%2Ff%2BbmTBzRcpFw2MbCS3Ka3zKFUwgV8YoRdJ4sXsHS0qMKaO%2Bs4GOqUBkwn1bt1A0%2FHWwzm2gMBQD9OA%2FQY%2Bh%2Bz1m7GThQ2v1Ejr3ffQ2W1GyQJMIuGGgcYkgg%2Ft1ykAWJMFP7LSJTygkyyooOvLqd9fm47Ou3L15UwVvQmKvEtNcErpLpx%2B5c3gL8od64jNcaYXPlsaIUyLOKkcJKTlVZwTzWY1wqgqxWjnPTlsEhMto8Ap0IEN0kMYVSd3CAZ7%2BPSLoJViE5J1KuRC5mRU&X-Amz-Signature=db036b6674c805c0ca8c840f3105b8187f1a32a5685e076ba0207c376836d6a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SO77GIR%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXX6aEI8ALWqHAkxEm65WwPrC%2Buo%2FRYl8Xsa74AIE97AIhALLpmqg43nMQFhd609uT7sd98OC7zld1LJnAoGUl3H54KogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgynePT0%2BOyNAJURJV8q3AMJGBuvEIBrdfWQCX1rQPTpy13HJ0wwEubMP9K4f3a6ga1NAOfyDYZ6SwcTsm46Ui0ialmc7smhPhanZvvybpXQl3Mr%2Fho1mOsT1rtwpglnMtcrhO2Hs%2FbjoiCTFoohqPvrh%2F3tRTx%2F8JcZyIn8f3KEctDjRVElEplyUnrUXFYqgPYu6qIJc9gn8M3kdqpvZX6cBsMw%2BCTmvhwV7ZkI3VGhm0EqBPxRMAzqug391Rf2hjFIxn7kh%2Fa%2FcFbIUiWi0cNsh9daAro1SJs83UtXjVB7LWPlTICsJUQ9avzBi4rB4lHBCDXXLaexDTWjKe%2FhN7FVe6T0ZBitXlDuzwWd11eUI%2FeiQZjd85WG5LsgftZnXwXwz0UNqQRmmQvZNigBIF1smqSjNyKWw2DujvzdCdrkS2TgtP2QGJB825J9TXTzP3hGfqZk1OpXrmrbFDtSmKLaivenMvzYFyn%2FoSIdoK5RB6anInVH5RNTi%2Fan4k%2FSNx%2FOAWAEjm%2Bsg5xZncRsRo7yANWSTQNoFo2IpCnojwoXDWuCstqFWwxrx11UBXPP%2BafKMKHFoJTa2SnVmCoQ49w%2FxT8ctleKwZB8Ryz1lOCgJl%2FE74T3wMsqiIq8nYGFbSveUYpKEF1M6eCgGDD6n%2FrOBjqkATZ5B6rfERaULkjTmRufxbR3X5AO80nDXEygtFHJtCukZbC9oEGssenShZx7GQBtLkiUIDakKBW5C5k5%2Bx2J86adHN4hNh%2BDwnGvxmftfZ39zpiKNWyQxWr5hWSxiaxevZXZYeTPisom5yAxv%2B%2BSJE%2Bbj0hJ8zbFFk%2BPHKt9UDBIt8Xsm2sLkOo1cC%2Fm0sMjdfk5aXOgGqCLWou1dO3HgKu7Wspo&X-Amz-Signature=5b97d81a0466c5b912decec89e4753ed2edd713283fd7d48a7e4da6bd3d9de61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SO77GIR%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXX6aEI8ALWqHAkxEm65WwPrC%2Buo%2FRYl8Xsa74AIE97AIhALLpmqg43nMQFhd609uT7sd98OC7zld1LJnAoGUl3H54KogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgynePT0%2BOyNAJURJV8q3AMJGBuvEIBrdfWQCX1rQPTpy13HJ0wwEubMP9K4f3a6ga1NAOfyDYZ6SwcTsm46Ui0ialmc7smhPhanZvvybpXQl3Mr%2Fho1mOsT1rtwpglnMtcrhO2Hs%2FbjoiCTFoohqPvrh%2F3tRTx%2F8JcZyIn8f3KEctDjRVElEplyUnrUXFYqgPYu6qIJc9gn8M3kdqpvZX6cBsMw%2BCTmvhwV7ZkI3VGhm0EqBPxRMAzqug391Rf2hjFIxn7kh%2Fa%2FcFbIUiWi0cNsh9daAro1SJs83UtXjVB7LWPlTICsJUQ9avzBi4rB4lHBCDXXLaexDTWjKe%2FhN7FVe6T0ZBitXlDuzwWd11eUI%2FeiQZjd85WG5LsgftZnXwXwz0UNqQRmmQvZNigBIF1smqSjNyKWw2DujvzdCdrkS2TgtP2QGJB825J9TXTzP3hGfqZk1OpXrmrbFDtSmKLaivenMvzYFyn%2FoSIdoK5RB6anInVH5RNTi%2Fan4k%2FSNx%2FOAWAEjm%2Bsg5xZncRsRo7yANWSTQNoFo2IpCnojwoXDWuCstqFWwxrx11UBXPP%2BafKMKHFoJTa2SnVmCoQ49w%2FxT8ctleKwZB8Ryz1lOCgJl%2FE74T3wMsqiIq8nYGFbSveUYpKEF1M6eCgGDD6n%2FrOBjqkATZ5B6rfERaULkjTmRufxbR3X5AO80nDXEygtFHJtCukZbC9oEGssenShZx7GQBtLkiUIDakKBW5C5k5%2Bx2J86adHN4hNh%2BDwnGvxmftfZ39zpiKNWyQxWr5hWSxiaxevZXZYeTPisom5yAxv%2B%2BSJE%2Bbj0hJ8zbFFk%2BPHKt9UDBIt8Xsm2sLkOo1cC%2Fm0sMjdfk5aXOgGqCLWou1dO3HgKu7Wspo&X-Amz-Signature=5b97d81a0466c5b912decec89e4753ed2edd713283fd7d48a7e4da6bd3d9de61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZSMCFUF%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T190934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICYjBVprEFG%2B5WcRG1O1TEsyt%2F6bmeFtCbuJsSt6p4sJAiEA2l5Txev%2BEMm9ynjAJJOcdvZ94%2B5%2FNNkcbie2RPO4EmYqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHQD9S4ourVNwma9BircA7wt794Mahb5DQBEkR1obnjwEBDbeIinkryRUetyCQpFmAu%2FeiqOaN7R16prLraWGnvuTCySgIDlqaGeheZUNDvQMo6GgcG9%2BhzV0esClhIl873FGBjHSxOUg6lFvY%2BWbSlf27WWdw4uf1CGjX4y9G691xeT1kIdumziem%2FhVWHGctzaOGQqJiw52kC6uY63EGLJ9dO17dtoGf8iZcF8c%2BtR7qxo9zwySnr6ZCDNUYAK4SfGO%2FiXSnoN%2F518bOr%2BjoWaodZ1QJrpK2mAuBLvAkYtMn%2Blo1IIPuXdNaujOyGrj2bFJHPegkpXcSe6k67bJ6%2BcD6HD34v1IHkcJf39nfOy2dnHJtsn1o5SCpDFI6Djn%2BZr2Pq5Rcr9LcVgSpoQlq2F0v4ur67lRkHxzGYc9HzrRz%2BFpQZthTVRLhaHn5IQ%2FR1bLVBWHNlpFPrHfx7n4kj%2FXpZCw5m6ScJ3VWRExILdr0N6m557dDESE2oqW1o6kDgugN25BFvPiv5GVnWKzddYILYHvH6BUTLQskgrlheQSC9Ro1K%2FW2nY8G5pcGDUEF0HL6cC%2Bifh9o4qJehP4ZzNmXFdguuhOtdTzJn%2FZeyVyG0SRs1p%2F2zpyHMIa7aPYKxOEbYR1BiTsVz9MNmO%2Bs4GOqUBoWaTGJH1ysOYwiNrILiWKOTljP2LBpcGNYEt53wshvCnCx0RITr5bAFmkA9KWZuvafbBT01tlHvGFdo%2BJ1Qu3Y3jcbeLqTKJtJmX%2Bi%2FdCea3Qz%2BUtRACdavR9wzVJqO2oLhUYJWPOEYnoJmkZfpF0RSXAlPD4OC%2BwgOz5vZRqsmXjzX%2FgboTx1eN2Xg1JoaXtRgAhHyR07XSH6Xy6tHBEdyqJxlB&X-Amz-Signature=40e525f2b45fd1f754a9564233174053c0df564ee0a6ae42e302b7ca164b444e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

