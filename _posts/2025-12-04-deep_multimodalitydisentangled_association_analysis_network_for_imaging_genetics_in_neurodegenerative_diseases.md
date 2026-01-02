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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZILFJKSL%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDnFmVnOQGf1pBzst1tOhV91QOGOzKfsU33ecXORCl%2FTQIhAOVZvgsrhBZPC5h06ib9BR28oQtjIOEwfPxP7rloH8NTKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxqC6KO6NF4A2kOr64q3AMXB8NxHLSKhiAdt7BkFwZA%2FrB2p9PMnmHU%2BJXa1tW7UlX5nrXzQeaub9G0NZlHHJjpSnDpAAQMNw1JouTL%2BTWpnlRUb8TLnQ564ItNoocR7VsSdV%2FSIPMu1iEx7SwN8RLmf3Pq0dxUs5zHRIYiBXiIydxRR26q8DKvjYebFBYOkw6opdirA6kdj16eJS2bZ9BIu54wMyH5ugzHSp36yDWDHxX4szwUEYfbCS8BoCmKKmdzVEmJj30kEjpnhJBu7a1WEQrqW3EkdK%2BLqcCsIEE90eWoG9kQqmGkATrNy4oxGf5yRr5cDiCqa7e0gKBJu%2FccMjw9otAcpidwqOMah4GSpLAd17hjBZQxujSD%2BX%2FLrei3vCRtUs8Xso9%2FNHzaP77vj6OHC3A4mT1ZIXM00F64S60tubU0F8OQ4SjBdUlzlpzls8HOQRr%2BZOZhWFtDt%2FtAZWi%2Bzjmq%2FrPZHGw6c%2B1lJbcxpmxFePuxKP98RqBOw9RZ3y7Ds1gKv25gw4kJSwSty90%2BuSEaw1DZoRMeGerA4b00miknWDsTK6oKhqVcBuXbEiLRDvmxre8O8tN98ZOtB9T57ovTm%2Fe%2Bj5ogZYzMCqLtj0%2FNxvb2VJbuFMuhnXUPdyUhv3D0u0eT4zC2vt3KBjqkAb7tjJS%2BsMKDgHX39u1vT%2Fa77fq5togsboeYk4T8dPy03iMnpvn1a4Fv2E70wTu8C01oHBs%2BivmaVs792ggw5wNNFSMe0yrTRtMgN9po559SiJSPaCa5oCzmcVB7SWgl3ypyaIwer81Kh9tIK3ABK4YDdK95IjsQwomt0H0Sz0IyXhvQ%2FpkX2VKqeK5z4V0PPTxBu8TqqUpXNGg4ztiClrXudVeT&X-Amz-Signature=e6093261e48b9561899549daa5af47f925a5a2a952cdea24587ee27073a980ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZILFJKSL%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDnFmVnOQGf1pBzst1tOhV91QOGOzKfsU33ecXORCl%2FTQIhAOVZvgsrhBZPC5h06ib9BR28oQtjIOEwfPxP7rloH8NTKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxqC6KO6NF4A2kOr64q3AMXB8NxHLSKhiAdt7BkFwZA%2FrB2p9PMnmHU%2BJXa1tW7UlX5nrXzQeaub9G0NZlHHJjpSnDpAAQMNw1JouTL%2BTWpnlRUb8TLnQ564ItNoocR7VsSdV%2FSIPMu1iEx7SwN8RLmf3Pq0dxUs5zHRIYiBXiIydxRR26q8DKvjYebFBYOkw6opdirA6kdj16eJS2bZ9BIu54wMyH5ugzHSp36yDWDHxX4szwUEYfbCS8BoCmKKmdzVEmJj30kEjpnhJBu7a1WEQrqW3EkdK%2BLqcCsIEE90eWoG9kQqmGkATrNy4oxGf5yRr5cDiCqa7e0gKBJu%2FccMjw9otAcpidwqOMah4GSpLAd17hjBZQxujSD%2BX%2FLrei3vCRtUs8Xso9%2FNHzaP77vj6OHC3A4mT1ZIXM00F64S60tubU0F8OQ4SjBdUlzlpzls8HOQRr%2BZOZhWFtDt%2FtAZWi%2Bzjmq%2FrPZHGw6c%2B1lJbcxpmxFePuxKP98RqBOw9RZ3y7Ds1gKv25gw4kJSwSty90%2BuSEaw1DZoRMeGerA4b00miknWDsTK6oKhqVcBuXbEiLRDvmxre8O8tN98ZOtB9T57ovTm%2Fe%2Bj5ogZYzMCqLtj0%2FNxvb2VJbuFMuhnXUPdyUhv3D0u0eT4zC2vt3KBjqkAb7tjJS%2BsMKDgHX39u1vT%2Fa77fq5togsboeYk4T8dPy03iMnpvn1a4Fv2E70wTu8C01oHBs%2BivmaVs792ggw5wNNFSMe0yrTRtMgN9po559SiJSPaCa5oCzmcVB7SWgl3ypyaIwer81Kh9tIK3ABK4YDdK95IjsQwomt0H0Sz0IyXhvQ%2FpkX2VKqeK5z4V0PPTxBu8TqqUpXNGg4ztiClrXudVeT&X-Amz-Signature=e6093261e48b9561899549daa5af47f925a5a2a952cdea24587ee27073a980ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2J5R3KI%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIAnDZUaaZ2ppzpdxP9IXAIPL4zXdZLp2%2FeFSpauHxOPRAiEAtbor0ATQUqYTcDGB4mMWJ9JrUAFxOJef7ocAJaiBlh4qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLE25LGsudebh9kscSrcA67CUr88u7hmhKjavWd6FWAH63BzCWLrUVMahuQxVH8ot7exc2pgXqpPrke56Dr3Ss9Vddmy%2Buk668baZTppNebkwvG08sTvuOmXWffUjUeOUoojJQcWd2G48dvbGqwzJ3BK%2Fj8U%2BLCKQ2lUedh42KIeN76KJ2BBuo9ApHsqnWa0yacy%2BVe6HrOVDZK0wAkgB7S2ewf%2FKGW%2BDheAd2PThjUoNBZ87QUw%2BlqQ2t%2Bmj4YZJ5d2kSfNelZoTf3lPL90u0yrZjOl3%2FJJXhLCXeRNIbeb%2Bodgeu3vu21NInfxUpfu07epfLWPpYrOQNvCSelKfPI33vGAyY8hICpuevOJacnKV7U9jIG9Gbh0jsgOCDVMNfGzWvj7jmi4u8hVcFVjDHWFKYsfyyNt4etwUCtniHrdp%2BQFafZ0RsZBEZ8Za%2Bq%2FbaOd30Vqu6S5%2FyQbkeQAdmzXFT%2BnPR513UkzB0puiltnu1KEe5uWttBDGqOsO67Py9pINPhi7Y3mhUFAnsGVWrFCTp%2B8xhlaXAaae%2BfQutdcQUqUSnjrO%2FOyJSNKwr2MZuWF7XsjTHFyQBUSLb%2F5wGUA%2FBZ2tFxJ8evvlWkJUzmLsLEwHuBjBicSirDis8dN8pVigkL2fAS%2F90LrMKe%2B3coGOqUB%2Bq8j0r2NtalADpqb%2FR6fJ6yHFjxGtAsG4AwE1TQlbIYW%2BHbbKDtjrKaMfhQ96uQqmQNhQFXr5Dphvcwi6yWlW2ctwb54slG7jErGQ84ixEHKScN3tvFREB6iCSnIXZ5QM25AhQ1IvDbRoTbbCMKkQJDvOXEMjIpnabGp%2FBIaBHPwHSfZSv5H9%2BohPs1vHJJVnKpxHp89kNLPaheA2MZNojkBqAc3&X-Amz-Signature=7234063e08cb699a691f7db2e2f50629ab82ec669e04072fe99d267faabf8dd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPLQADPB%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDFt6TNzyX42i3nY5Yqh%2FTRImZHLesn99Y%2B5g7iwUOm2gIhALZ651EegElkgS4X%2F%2F0DGYozs4w9JVhWVe3tbzMh8jLhKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxwX0FqvLqBiiMmalYq3APOzlAOrFUh1%2BW9GeS%2F%2FHW5pzAx90%2F04oHfWgkm%2BTcQiZQSCoYcCCnOoa%2BIyILYTPvdyI5eHd60vsIt0e3BKNid1zmy%2BLVVlGLs0yfBzQXrhvLxNn3wXs8KPmtbqDvz2gMWjiyjvTfGOfhbUTc2lhPfULf19OYgM8xhcRfjz0vU4aXtFE%2BydXLrpILw5zcNHjAcLg3dpuxEzPHH58HYMxywXm4tWAspV3kXElzZM3%2FKKDGZCjp9%2F7rmxe6lGrOG73%2FZcUtu%2FCemIn1tfyO5AeQI%2BBmwFo6bGdTTyuEsa16A%2BWNuAdoNOhdsQqp15yEKMJUY7yt7TsJOOYtjs4hITs5UkV%2F7lQic1RVHQ1pCP9gI%2BAt1dj877bye4kWZjj%2BOcVonQtyHfOK5XO%2Bp1gAhl2xh3M50EJLvseUabP6Q6KqSP7%2FWJhiWQDosNchn5iUkog9v%2FE5Q%2BLnE1XSSiZcdPUiWukfubelJ%2B4jMLYyNFSEDR4PGocUi4uWEdXkWJD1c6mTxG7cZU1ma7PuDvFyUmtSy7lQ%2BwYaneD16C9jw7CiHpAoPmNdPvo6QgCfh1k9l6Zm2N5plLnwuDV6MVgOHR%2BeevJXlLM%2B5UdWQHiR625%2Bjy8QP7Sex7Y23kQidnjCJv93KBjqkAWSUtM0VJwfU1%2BGNcl2LilVUEfQ%2FXnWCiigI2JkV00kQN6nq3f1SAPRhlRKKIBF5QYRBqpy5zLkwhduZa0sdXvosXr1PA5nkFVREQkcNffV5JvM2h%2B5nvZUm1v3CfMPYo1b6PNh5P5qIFEAsLIxmnVsfiQTO7UGiIg2NR%2BLsC3ErbjbAE8zV9D6IKGeWlF%2Byzem7Dgz3q7GLFzNvUt01LU3amY9p&X-Amz-Signature=c2f9a52a58da15e1d9f4d3e6c9f5e943ed6f75cab36f6263f5c476d39e6f7dc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPLQADPB%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDFt6TNzyX42i3nY5Yqh%2FTRImZHLesn99Y%2B5g7iwUOm2gIhALZ651EegElkgS4X%2F%2F0DGYozs4w9JVhWVe3tbzMh8jLhKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxwX0FqvLqBiiMmalYq3APOzlAOrFUh1%2BW9GeS%2F%2FHW5pzAx90%2F04oHfWgkm%2BTcQiZQSCoYcCCnOoa%2BIyILYTPvdyI5eHd60vsIt0e3BKNid1zmy%2BLVVlGLs0yfBzQXrhvLxNn3wXs8KPmtbqDvz2gMWjiyjvTfGOfhbUTc2lhPfULf19OYgM8xhcRfjz0vU4aXtFE%2BydXLrpILw5zcNHjAcLg3dpuxEzPHH58HYMxywXm4tWAspV3kXElzZM3%2FKKDGZCjp9%2F7rmxe6lGrOG73%2FZcUtu%2FCemIn1tfyO5AeQI%2BBmwFo6bGdTTyuEsa16A%2BWNuAdoNOhdsQqp15yEKMJUY7yt7TsJOOYtjs4hITs5UkV%2F7lQic1RVHQ1pCP9gI%2BAt1dj877bye4kWZjj%2BOcVonQtyHfOK5XO%2Bp1gAhl2xh3M50EJLvseUabP6Q6KqSP7%2FWJhiWQDosNchn5iUkog9v%2FE5Q%2BLnE1XSSiZcdPUiWukfubelJ%2B4jMLYyNFSEDR4PGocUi4uWEdXkWJD1c6mTxG7cZU1ma7PuDvFyUmtSy7lQ%2BwYaneD16C9jw7CiHpAoPmNdPvo6QgCfh1k9l6Zm2N5plLnwuDV6MVgOHR%2BeevJXlLM%2B5UdWQHiR625%2Bjy8QP7Sex7Y23kQidnjCJv93KBjqkAWSUtM0VJwfU1%2BGNcl2LilVUEfQ%2FXnWCiigI2JkV00kQN6nq3f1SAPRhlRKKIBF5QYRBqpy5zLkwhduZa0sdXvosXr1PA5nkFVREQkcNffV5JvM2h%2B5nvZUm1v3CfMPYo1b6PNh5P5qIFEAsLIxmnVsfiQTO7UGiIg2NR%2BLsC3ErbjbAE8zV9D6IKGeWlF%2Byzem7Dgz3q7GLFzNvUt01LU3amY9p&X-Amz-Signature=8d3ec12079100a3dc2e3d2f085870ee780dd0b184d45ed6b932bda3ce765f20a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDAJYMTO%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDkQqcwChia7mUe5scJMUtAjPXDLo9oqaLxz%2B5ucVRlqAIgJYnEIDphBgzaw9CfGeyFR0DranrWBEDE%2FeDp25iKXLAqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO10k8bik3C22C1aUircA9PerOLVsSArzm%2F07lmLZv1%2BE7aVfQ2p8nhoPdLjM52LrE0rartrcuXWUYmxzwbV0ky98qXlHa6jB2lv9x%2FZFT5OefzBb7oDriBYYF6wyuzNunVp8DMYczdHjnIlyZILo5LcsNHD2asPrOF9bS7HUxrXon5ItgtT15pAIP7taRPXgsQak9zIoH7j8jxB3Dfe185eCTjig38XJFWo%2BrnVrVUCkb6LXdR%2BW1bKNqib0%2BmzY8TtJqoGqzmJL%2BivFxQNFkscyz%2Bks%2BpSUr2sLFSJ2t9k3L39H8i2I9ZcrMzRq9TpMXyLTwxcbFwP6ieDM%2BfITIFhm1Jm0R5uJVTeKph2D46hFLZDTilY69iPgxkrL7sEg1Di2npWOFKJtBz9MFU%2BSWiGHEY3MScCSEvclbuM1mtSSs24GcePc%2FNt4Q%2FBULDBZg3WeoFkJDGaTSR%2B%2FUnE2SiPfTJTQmYAcKY9RlxKSTDjDXJKVt2zuh9aVVlApjTeNgdVyiFhmwEoBdTe8ooW6aYkOLjetPKZnrNy%2BMxmBKVhszYE65rum1bT3DWTDLtfxGhFb1QQ3iqfmFCisIKqANJgZ4AEmKRc5LF4UhVFpYfgdZhW2aof34jlnErfFq6Wz%2B3kcV1lUhhtCgPRMNC%2B3coGOqUBSpDUAkKwGThOL5qncbtsz8rBv1WrDud9mSQprPn%2FlAxeDYX0%2BjRPHk8b1r02ic1Xcy%2FCL%2B%2F%2F05TrcfP6CaeQgXJNcgWCO9WpShHrC%2FM4FDBrrymSAzsHzuJ4kGc7WDU%2Fs5J6jhKd8C5o%2FvIXQ%2FXicA6OZdNycxHMdxRvNAYdOQQ56W%2Ff9IgbIW%2F7XDZv6dB%2FlrpARhjC6j4FpXUmtT3KhL1ZLdVc&X-Amz-Signature=8a62e15746cdc4a7eff0858248ee996c540305d456e50f207f4a5a40396c4b5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IYQVG5P%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCHbGogC4z9I4S23opOTWOIcfTKGee5YBEE8U5rXBzclAIgSxMnKhk1e51X%2BzGDnMiXyZNMYbH7vEHQ3dZzuaDPONYqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJwGE85VSSOCMoVwaSrcAxiM83BTsYGSgDg%2Fnqom8b61qMrVD7lpYvly9d7OCMdLb5xmztAD5Ohaq6CBpqxRU5dEsm8%2FC4LX%2FN7f5B5U6DIlaZqdFwDsBN%2B0xBiNhE8sKVJ49wPZcyRKO5o68VMRTgJ1oUEFuF4LNGGUnO4oFf%2FSxz1gcTMndP23JSA6mlwZMe3zM%2FAkRKnf2xhKUVEsLK6xncoZ96No2Ab0TO4CQ1atM%2BW2PeVORbCDHFV21uZjZZgCuVAZgyiTt%2Be7esltsAcu78ND1fSNoP6k19cjvBQxiSrQrbLcshbuy%2Bunu6X2m9Ls%2FuwTZeQ2o0cbfu%2B5CJ1WZwJphi8Z94SoT72hBY92VIiO4McPNmj6ZKdJ%2FP08iXYKoKUNDqTRBlxGTdUrGNISdpiivjB98o%2Bxp0ArroN3uGZolYQafjDf3waT%2FrgtuUBOz7VUoZxDvY%2BxZMEHopbbZt6BEBV52QCIcRGk%2BfgURWcT5TSGwqKvB1wVovPCh73wlItYNRBnOAevIuuEgtPuxva6WLRY5oWZazwJ6VUY%2FTlyUDCjzlID6TM49Vvi8LVK2VyniXt7T6Mafa45l%2BzbFFsOkMDaRi1zJ3UY8q9KvufPbGsNfMBKeacllpxABku%2FBskP8dqv01IkMMa%2B3coGOqUBVzgesBjkjWO5QW0Uj%2Fm7WReNiEHBBKt6gmSalH%2FcouW8Ah6BCL0z1yBZhbcMrXB3amkOaTgIhEitkPKzi%2BdQeT1Hu%2FxiSz9mAb09dkDWCgkTNXDCiW0cLDdtCzDaEumDDK%2BV%2FZovRZq922qphoiVOHZinl78Hrv%2F9nzRy5jauOsKB6CfY0GPecq5ahHVNBELx%2BgYxb6kRA4VDJLTMi55vgQuuqn%2B&X-Amz-Signature=aa08d9dbc38798ad2858d02046fbb27995e01512af6bafd0aa3b27211c170010&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626PRUXZJ%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQCGxL%2B58ux4UyJ%2F1FJKxE05wIh60i5UMIAXiuDgdZWTzAIhAOLrBdPPMVlHPJjQaP4lUQ9kPzjLuVeyy%2B0MpuVe1qw7KogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzOXQLDCUiiKVwXV88q3AMkV5sSIjGkXf1A0TvZgmMOCnM4i3ha39FAQJrDilXTrA%2FWiPAEmQO70kq8NwmK3RTHovv23OEcKbvemm7hYHTCa9gqzzS7bSJ1%2FuilK5fPdP6nCamOvweHU3bJfOi5CLZ6A4LM9oK9D3JqOnO7Vtz%2FY%2FsSTztTOdumlaOB5SmJhv1ckxGx5D05uKOB1eipN5hIqpkqgVqJjs0%2BnZXoljwZ17Y2jMBYXX4FLbRSWGcik3SbddH0KkYPfkdVagfMG3REhWaBjWhVO3uIUFkyya6dTBgq7vkUxgY3FYufEWG3UEw6AQ69dZJggq8R%2FmPYmSasoDLrEqNoGNQonbnJ%2FP%2BnDo26QdLwBDQ4KkHbO%2BtAJoYnM6xMigdvZt2mStIDrvd4bfjE0%2BhoF6J7Ui7N%2B46aqtq1dZ5pvVqcHdoIYWKsN4M7OoUUUX%2BrIqAVqgbcw4AZRKKqLHXV%2F3twVPt%2FF3m0jydsc6U%2Fjd5ZBbyTSHPRZdcIwJreeDwwIjVKWi9oZF%2BDEnHeyMJgQGiEoNmAs3Cw6VPoJZK%2Fqi%2FxGSWowRg6%2FhV6fWztRyaYkByClSA5KWxRZkeudf8OveNUEAO2h7IGYqbE4dwF6Wsr6hyjNTVosukhqhWDCsYEATBd%2FTDKwN3KBjqkAeFCxZ9QStbmADVAM2FZiNgBZ6aOljQ3otXDr4%2BMIwkPT3qY4oCRaGTNxRhHz%2FkEaALulMuMGReubTzHIhgOPyBaOKF8%2BMeIbJYRNh91vBXXf0rweiWaaAS%2FnJ%2FPZAi%2Ft85Yf0whBFRZqdBiweycsJSeCDiCw3yasxw403iT6AQGdE4HLY7W%2FyvmrWkeOa9%2BsWA%2BF%2BpqLFZLvVXcALVKyzQmPP9M&X-Amz-Signature=33cad91432fdc7261836d4e3604b13cdbc5a4a6c4c84d7412d8b7cfb9d255634&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU6FUGPA%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDMP9br3sYW6%2FdrlTzgreIwqqv6Cs2Y8KRj%2FtHetLiGPgIgXeRviAsMdPHHIl5q6be%2FhXu82Haxh8WBui9N2avNyjYqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDpgoczwUn7SAlo4iCrcA0Et%2FtOyhI%2BKAJ%2FV4J0CvEfyXnuFtr8yeowzeYWq3ifQeS0HaSLkrRBNEmFM9r17AlVVFClSFghjxIC%2F2rDkqOQtjcdzTuL9lKw%2BlqAqphhnkIJTuJaBghKx0Qr28E2sL9lMSXQ0yVTZWMZUX2ZFeqB3Ou7CVFcDAvpst4XbX0kifWNzBQknRbROqBnPL8GXGr6FzuvcuK7b4POf1pOA5SZW3%2FnwN9WcLbJfMlbqdRzrgmnTFv0PirNAmIa5d7sKeN6NFZ0WvJitqpy%2BwhaGefCSdFHT88gW3DLpbU7%2BDceQ4Ux0F4yadgtOvJWKaZx8ap0SCHvRyg7%2BmixHZeO7sj4dRCYheoAOUA4e1%2BHEjuCCZ0H%2FUvsi6JX9882Obv%2B66W2dHi9havT%2BQTeFuUsK8b%2FAOqLINGSzoNHxEijdbaXxuNbe32jAi2pBWz%2F3Wcw5CsN5%2F5VHfSbFiDQ6ugMnQ3%2BjY1TSqV7%2FNxxVqrSnMBKnkyKIk%2FSZqhnWz0j4GylqyLkJxXuq9u2ALdZrnGwBVRcupQ0whq79VITG6NYx4atvwmlBFXXSj5cTBldIUuXf3EWzwwg25xl%2B6PzrVWlgAesWrCug8Hws1LWzqTiv7woteaxx8JjUTGFAR4BQMNS%2B3coGOqUB8pkYoQFSFeEnO2QjmMuSsZuZkv3eg9DL4qT3O%2FF2YO%2BpbDvl2V0x%2BupYkHqBjgU%2BwBPQA7WmTWKBA1pSEoRDsX2KWQLRUSmL%2FrFity%2BXdQklobDhS2vV6Hfnrri27N57HB9s0rCy36UjKku%2FVaSPWS3xIac%2B4JRs7iiB5l28pfJu5u%2B2pttVrRoVpNBpLxorDM86dYtraJ4z%2BmhBU%2ByRcZK%2BmFO9&X-Amz-Signature=f361c3bf333364bffae0ae623558faca74feb616df1a94c4dca7fdc0a6bd4ecf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU6FUGPA%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDMP9br3sYW6%2FdrlTzgreIwqqv6Cs2Y8KRj%2FtHetLiGPgIgXeRviAsMdPHHIl5q6be%2FhXu82Haxh8WBui9N2avNyjYqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDpgoczwUn7SAlo4iCrcA0Et%2FtOyhI%2BKAJ%2FV4J0CvEfyXnuFtr8yeowzeYWq3ifQeS0HaSLkrRBNEmFM9r17AlVVFClSFghjxIC%2F2rDkqOQtjcdzTuL9lKw%2BlqAqphhnkIJTuJaBghKx0Qr28E2sL9lMSXQ0yVTZWMZUX2ZFeqB3Ou7CVFcDAvpst4XbX0kifWNzBQknRbROqBnPL8GXGr6FzuvcuK7b4POf1pOA5SZW3%2FnwN9WcLbJfMlbqdRzrgmnTFv0PirNAmIa5d7sKeN6NFZ0WvJitqpy%2BwhaGefCSdFHT88gW3DLpbU7%2BDceQ4Ux0F4yadgtOvJWKaZx8ap0SCHvRyg7%2BmixHZeO7sj4dRCYheoAOUA4e1%2BHEjuCCZ0H%2FUvsi6JX9882Obv%2B66W2dHi9havT%2BQTeFuUsK8b%2FAOqLINGSzoNHxEijdbaXxuNbe32jAi2pBWz%2F3Wcw5CsN5%2F5VHfSbFiDQ6ugMnQ3%2BjY1TSqV7%2FNxxVqrSnMBKnkyKIk%2FSZqhnWz0j4GylqyLkJxXuq9u2ALdZrnGwBVRcupQ0whq79VITG6NYx4atvwmlBFXXSj5cTBldIUuXf3EWzwwg25xl%2B6PzrVWlgAesWrCug8Hws1LWzqTiv7woteaxx8JjUTGFAR4BQMNS%2B3coGOqUB8pkYoQFSFeEnO2QjmMuSsZuZkv3eg9DL4qT3O%2FF2YO%2BpbDvl2V0x%2BupYkHqBjgU%2BwBPQA7WmTWKBA1pSEoRDsX2KWQLRUSmL%2FrFity%2BXdQklobDhS2vV6Hfnrri27N57HB9s0rCy36UjKku%2FVaSPWS3xIac%2B4JRs7iiB5l28pfJu5u%2B2pttVrRoVpNBpLxorDM86dYtraJ4z%2BmhBU%2ByRcZK%2BmFO9&X-Amz-Signature=bfb14eb7459acd23d9eca64b0c6b6b28c59078d74a45be001afbe3f42d3b0f76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBSE4ZII%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCYBjXnE4ICLsN7xXRzYPFTL0zzqf5NNkP3uHC2fmAFWwIgcfhTm8AFOYr0jBFnQ0JOJLQcsfyRO7wowmueulvKFsIqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPF7SmPvU2OXUMMj5CrcA0MiX9G6%2FcQcO9WolJkRP8XhFDUvPqSLKZfO%2BZZ%2FYSVQP0LkavDvC9WfNykLUkxyRMYG87B99Qq7l2pJTfRYN%2FOlLIVVWLP2dLvgOBIEnzlgaKn%2BSEBHSMm4lisINTWvs6zl55V7LzpXUkFd1%2F20U3zdBpLpzOIkHiAsMu9CdWASdx36l%2BPw%2BqZ12BVYQeXgnz9teuXCbcftTbbaU9s8beGXWMyf2jUgtgHRroZx2W%2FSAkn2fN6NrMblDkI3C7t8qkzjqAYn9pbhRXu6mdmYomyREvFBZXHIsx1Avesfuw%2B4W7cHzi3fzcEjyE4Cjl%2FRNu8%2BbDKzffCWfljTGSwI21ez%2FwXmIr46YhVZPnbR0v%2F0anHFL%2Be%2BlwjEd0xvd3C3Iryr6ou7vc8sVYtWUXbOOtk8f4FK4Sj%2BEEXwRyK8EfVIeKTYbsCs%2BxJB%2FDP09Z43oXd3BxjzykCGdj%2BjJDUc7horiSvydaEVYES6Pr9aODV3GyoAE%2F7NyjgUPn5FJomB7tqcZjcVW%2F5xE%2FPRZ3DR5xuTtMgNm59m4vGFfOQL32aEvRxd8F1ifxY%2FxDu7UfeCEBKNiEDfA%2BY274IcGXdRga5%2FV3FavcZtu5DCg0JsvZ0%2FQg96GDh7dSDLUHt4MJW%2B3coGOqUBn%2By9qCSqqH1AEQJ5cxQre2fH%2BRQ3B9y9Ql3c%2F3lnTgj%2BQ54zEjefdGIlau3Bu%2FN1WuUJX63LLOZCotM3kc2m8kZ00LQ78LYXOzPuZQ0iCTQSaqt7e5QgKFOi9S6NHCy01gZGzqL2qQ8xRy%2BgGHhYEKqhBeSRh9XW1y7liRSGWblQ5%2BvJA%2FNSWWqH5BC6vRzbvrWF63lmXDSdyV1tnAv6unkLqkN4&X-Amz-Signature=ae383d7fe6db88f23570c0d4a73f41245196927c0e00f5204a796101dcb7efd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCB2BLG3%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQClBNo8QUJasyruQwi%2F%2BB1KBkMhwUkkQp4QhAHlgYJk8QIhANlLKSZbXAHYiYT%2Faxj7HZPArjqV4we%2FpO%2BOYqDM2%2B9xKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2BLu9wpWNAkDXvPbEq3AP%2F7McytA3xLpfNK34ygqjjLJEKFVzWItprXSMO74p9%2FQNLGCyAZ%2FENDJtau%2B8Ps4MbogdKOPWC8widSt%2Fq1DSN0ItJ1k1fK3aAsFTZHrB42%2B%2BVsph1qkuPhsy2qZZ57lMP6AAUn0HeRrcZuOipDXdKPll8jyzkiISXobkzbRf6q1WqnUdVQW7w5GbiGzg6%2Fuj0e1nSNM7FfD8AdtckE3X3%2Fx1rnbWDfO0%2B8lebt5iE5Wip%2FEG8Ib%2FQ%2Fkf3Xoumf%2BBAUgr9SbH61JzPZeSfcV3JF6dZO2pdLI6I8zhgZ1CN%2F5WdgsjXpe0BfPXO%2F2QO9427wgigjLgLReRn%2FjsEKhcjtBa0sRJ3KbvSG9x5PwddNAhBWEppn8%2Bia%2BgDC5KfPELnNS8%2BcnlpovqqKsal0uakrqTqKQXMA1Ftbuq2Wok%2BhC1eOCleSL7PyCocaSCYW2Y2%2BXMmuL8KoXDyXBNf0fDG01KanAkom9V45rj4T16fzhl%2FNHzLZhqAor4orUNSSxAQ%2FaMGuXHYyvXLmg1qVyu9dMsYiOW6uEKbBLWXA1bARXLekKndQKOS%2FsBNDNCkoA98mYkfSlcQQrKq64YfMjvgpdJ5drnhDE6qViwyZNX%2Fib%2Bp9VkbwTAw43jO%2BTCWvt3KBjqkAeo%2BncY421PpZShnldKbHXmjUlsZYTLR9UVKKcEPw5OCZfJDurCg4P5tl%2F7cWbLh3xkWgVBL%2BwsyLXau%2FjldSenKlT79StSmevyWEDO8CJ5leij68z6mgfxZpQdVbVf%2FtoIC2a12ek78ENZCOeZqpHioYuMMRuCpwGM9g3zPr5GK%2BcfTO2a72CKTB1NUQ4nZvxsJ0LuESmlUDT%2BalJ%2FyDvqGKsGf&X-Amz-Signature=6eea8d2e9c39037695268c78ac34a44f47a45380038d89cc9c7667fc61e60ec4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCB2BLG3%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQClBNo8QUJasyruQwi%2F%2BB1KBkMhwUkkQp4QhAHlgYJk8QIhANlLKSZbXAHYiYT%2Faxj7HZPArjqV4we%2FpO%2BOYqDM2%2B9xKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2BLu9wpWNAkDXvPbEq3AP%2F7McytA3xLpfNK34ygqjjLJEKFVzWItprXSMO74p9%2FQNLGCyAZ%2FENDJtau%2B8Ps4MbogdKOPWC8widSt%2Fq1DSN0ItJ1k1fK3aAsFTZHrB42%2B%2BVsph1qkuPhsy2qZZ57lMP6AAUn0HeRrcZuOipDXdKPll8jyzkiISXobkzbRf6q1WqnUdVQW7w5GbiGzg6%2Fuj0e1nSNM7FfD8AdtckE3X3%2Fx1rnbWDfO0%2B8lebt5iE5Wip%2FEG8Ib%2FQ%2Fkf3Xoumf%2BBAUgr9SbH61JzPZeSfcV3JF6dZO2pdLI6I8zhgZ1CN%2F5WdgsjXpe0BfPXO%2F2QO9427wgigjLgLReRn%2FjsEKhcjtBa0sRJ3KbvSG9x5PwddNAhBWEppn8%2Bia%2BgDC5KfPELnNS8%2BcnlpovqqKsal0uakrqTqKQXMA1Ftbuq2Wok%2BhC1eOCleSL7PyCocaSCYW2Y2%2BXMmuL8KoXDyXBNf0fDG01KanAkom9V45rj4T16fzhl%2FNHzLZhqAor4orUNSSxAQ%2FaMGuXHYyvXLmg1qVyu9dMsYiOW6uEKbBLWXA1bARXLekKndQKOS%2FsBNDNCkoA98mYkfSlcQQrKq64YfMjvgpdJ5drnhDE6qViwyZNX%2Fib%2Bp9VkbwTAw43jO%2BTCWvt3KBjqkAeo%2BncY421PpZShnldKbHXmjUlsZYTLR9UVKKcEPw5OCZfJDurCg4P5tl%2F7cWbLh3xkWgVBL%2BwsyLXau%2FjldSenKlT79StSmevyWEDO8CJ5leij68z6mgfxZpQdVbVf%2FtoIC2a12ek78ENZCOeZqpHioYuMMRuCpwGM9g3zPr5GK%2BcfTO2a72CKTB1NUQ4nZvxsJ0LuESmlUDT%2BalJ%2FyDvqGKsGf&X-Amz-Signature=6eea8d2e9c39037695268c78ac34a44f47a45380038d89cc9c7667fc61e60ec4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPLW5RTG%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T100116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQD3BT83CLlI1rn5tRY5z5Rq3Okfddsr0%2FptqlL38C3WjwIhAPeMReGRtzdTLyR7EzPgBtqAgZxFhT1Ax0%2B0jYjMBiLIKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwbAkBfKmyioHzSk9cq3AMbwaW5abieFUXLqhKQ6pJuYxZpW4eIlDQz0bmbrX0FRDXlbmVk4Vug5jRXi%2Ba%2FqK4W92nQdRXBcfwwq1tfEzDeeJikNVs1gK2vh8JoWWHSyG%2BdS2ESKXP8NGyGXOXBmWdPImNi5hkKbzUWjSbTDLkTeACfoR0NER1KkGuoP%2Fi8h%2Fsv%2B6e%2BSpB0ja2HQKunuiufJUjrDgnTeTFnHCoFAtFdFxpu0qZVOLHNr4y70TYnAJimOE9YZsA62dUypnh9MavWANblTKu2JL78sYJhfDmb6JxLExZ47HFVEZjUnwAVvtYxLnVRY%2F%2BjtRCz%2B5Lm1UBUjjnTsggNQTzCzE94%2BMPkf%2F6Zwuq1GbGjiCSnzAwA5ZM9qPN%2FUthEgmlX0TwYZj4h03z0XwpFmONhOtxqvewRZ9bHq6cMUa0iaFy4%2BzgkQDeTgoo6AxkixTWw5nktSfJ9QDps0dX9x0xBED13xVM3KTgsVqFTtVqN%2FTG4kHRa0VKDQ97aqoT4FQuHKaXv9koekNeLp2VVRubMUuGIO%2BidEyjCLLepuidvUG56UPrWCOjAC%2FoKz0SciKVGADCjDEcMPsrRlIYe8%2FV5%2BZPoO%2BIoG4%2FsbiARcqGaQUxtZm3MXmYPZi4DMxt84BSYbDCQv93KBjqkAev3w9fxBsElY00hVVfyn9SYSvu%2B9hFlKydgSwiiR5pqS7Tn0%2BR2udyFGcR5Axs76Bib9j%2BRj3vikJD4swF4Te%2FJMF25QyQ8j9TSyAeEo8bx6fHzTYW7w%2BpVnCzcwtb1PG8b4ZPT7H6b12m00%2FpYpB%2FE%2FwLhtzn3%2FWBJUWHu0E3zXUL9tEQwW1%2BEIvEb799qZ2RtyGZZ7tEh%2BROYH1Jwas0X3EEG&X-Amz-Signature=26053bcce0be25b60709927a8f6c92162858cab53e29a9f8991e483ecb1fa7a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

