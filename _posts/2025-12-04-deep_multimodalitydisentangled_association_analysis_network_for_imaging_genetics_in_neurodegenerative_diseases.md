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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466322I6BMK%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA%2BqXF71d5QlGXpOAYIYJBapW5prwXKVFU%2FoDkwkrZ8mAiEA%2FdtOjgXj3XuXO%2B6IuRTNeALp2qv3jc%2FVanT2jOs%2B%2BnoqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA8QpM3si0BZsYNHCCrcA%2BpWFEe8G%2BtJN2Xa3FPAeMVbLhJg1t2QfF%2B0guKC6bFgoGm7FveHSzRoUARdb8AU5hLBBB%2FH5fR%2F5tXvkaaHVAH0o4KX3yPJMhi2Y64EdieHoX%2BxQB07w9zPdgqzeD627Rvd93%2BexFxsgHjJA1BPaagqBCri3fQMa1r%2FrsQQH%2BMGy%2FD2QjlUqySMLPLHa81bHP6t15DWEM5lrSKcxvg4CarcBwVsO4R%2F%2Fv5DinhsYcbIi0H8Y9pmzPpi%2B5n%2Fjqy3KYNnOyoVvocfXuA8LRbmrolzuQy50LeAzK3lp1Nl3IbZJRd2mvf39CxWstWcb%2B5N8RqbR5V4Fb%2FtGiwVrY3IsNt3lN02%2BHiOK63FKkGM4kIAbhH9c3OWczzh%2FsAyeMQBEJ5D2bvp%2FrdLNJ%2BDg%2F9Y6kzyqxKCxRZcIx60pbYg4ZDwFqzgVaHRrn2z0Q7bAH6p5Ib252HuAm41vQMZLZRvht183a%2BhGZUMHsRC5bLzQvREkEmUk95ZGiOw1waA%2Bmyw6NcOY%2BDRrPprDnpo3mm8is1eUURsgVxKikM3dZQ1vSE%2BXPbwf%2BQWWrl7qmhgnmhpkJUgNA1uKK1N3TtCKG58Upqf%2F5STjprOQSvZMytw004RjBad%2FpXafIGsef6wMPXass8GOqUBtczU3S5GQuzAtGLHM03R8EFkuh5zkIA4WoyL8r1RfG44cTEXgeYSxVa7g%2BEzFWWPEUTZ58LOPQAql5k34kR7z4Q4oZnTGOuEET0CVpMOyVAZK5yV9dF4TMJGRgN%2FXiqm0OI3xJOBdd0D44umk0NDLaKiIZxOfNeXDaGJaZejYWSejxFgC7Pg%2Bcl8LMIB%2B%2Bl4lg%2BVo3HeZe6qBSu0LQfSRGpQA4y6&X-Amz-Signature=f608a955867edf77bff62006e53554b6bcaeeb6ed61112d2061f2eb871d78d4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466322I6BMK%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA%2BqXF71d5QlGXpOAYIYJBapW5prwXKVFU%2FoDkwkrZ8mAiEA%2FdtOjgXj3XuXO%2B6IuRTNeALp2qv3jc%2FVanT2jOs%2B%2BnoqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA8QpM3si0BZsYNHCCrcA%2BpWFEe8G%2BtJN2Xa3FPAeMVbLhJg1t2QfF%2B0guKC6bFgoGm7FveHSzRoUARdb8AU5hLBBB%2FH5fR%2F5tXvkaaHVAH0o4KX3yPJMhi2Y64EdieHoX%2BxQB07w9zPdgqzeD627Rvd93%2BexFxsgHjJA1BPaagqBCri3fQMa1r%2FrsQQH%2BMGy%2FD2QjlUqySMLPLHa81bHP6t15DWEM5lrSKcxvg4CarcBwVsO4R%2F%2Fv5DinhsYcbIi0H8Y9pmzPpi%2B5n%2Fjqy3KYNnOyoVvocfXuA8LRbmrolzuQy50LeAzK3lp1Nl3IbZJRd2mvf39CxWstWcb%2B5N8RqbR5V4Fb%2FtGiwVrY3IsNt3lN02%2BHiOK63FKkGM4kIAbhH9c3OWczzh%2FsAyeMQBEJ5D2bvp%2FrdLNJ%2BDg%2F9Y6kzyqxKCxRZcIx60pbYg4ZDwFqzgVaHRrn2z0Q7bAH6p5Ib252HuAm41vQMZLZRvht183a%2BhGZUMHsRC5bLzQvREkEmUk95ZGiOw1waA%2Bmyw6NcOY%2BDRrPprDnpo3mm8is1eUURsgVxKikM3dZQ1vSE%2BXPbwf%2BQWWrl7qmhgnmhpkJUgNA1uKK1N3TtCKG58Upqf%2F5STjprOQSvZMytw004RjBad%2FpXafIGsef6wMPXass8GOqUBtczU3S5GQuzAtGLHM03R8EFkuh5zkIA4WoyL8r1RfG44cTEXgeYSxVa7g%2BEzFWWPEUTZ58LOPQAql5k34kR7z4Q4oZnTGOuEET0CVpMOyVAZK5yV9dF4TMJGRgN%2FXiqm0OI3xJOBdd0D44umk0NDLaKiIZxOfNeXDaGJaZejYWSejxFgC7Pg%2Bcl8LMIB%2B%2Bl4lg%2BVo3HeZe6qBSu0LQfSRGpQA4y6&X-Amz-Signature=f608a955867edf77bff62006e53554b6bcaeeb6ed61112d2061f2eb871d78d4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDSOYOQW%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC0puCgjCCyTWeBbA1jnnFxmb1FDuORtlyf9RwY%2BhxUDAiBxjoYrQ41PlrSf%2BXWUiv7TCi%2BrfwwIWSBs3qAidVoAQiqIBAiX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM46P9Bwg3oRHo%2BYBDKtwDgdUQiJCAEoCf9MKmtHFyq%2FkeeOJH06AtOG2vwA5AkzJwXHu8VmCuKa5zvLRwbmaok5ZY8KeJ2PBRtF4%2F%2BRon4KSBpO52j%2BMtfFoy8J4qZDiA3Be4HfX%2FsFg5ZVgJwmDeNlfv1y4cnHjgejUdUshzVwDdCidAq1yM%2Brx6hV4qtWMRAq0CmPUCWSnnCi%2BlAZRRdVZEMwssUdKmXGySBOFMl1AmOxOReTZlYtZpkFfeQsosa2Cb02onqDgoAyMp29jXS2HSaZiaL%2FaXP%2BnCtvzV06x6afK2tWeqXofpC6HTvs5fahKpbk2pix%2Fo2RXWSdSALHBfdKzwNegB%2FcNKftsLhmzTcQ70hcCxElV%2BSxC%2BVpnhddEIUBdLV8PaDM4VCMWn2fVerkBz%2F4flVhdhwDeTLbNPTn1a1XvB240uUpL5o7PvM9ygw2NHhgPCgkiY0WsDhQGEhyMXt1b%2FtQbWRwt9HUJq0Y%2F2V6F9AlyOvcUFLmYlHDhI5G70N%2FDKr6LiUBqa6br4mZmaSMmq%2FPcgh7JZny%2Byfcorp6SYZBew1mcwfC1Zp4D44LgkLFM95rQd2rJpa01IdmRUafPmVf805KsrNQ9lybSPmaxBcnTJX%2FW%2FQP5P2ppe0Lgg4UhABTow0oWzzwY6pgFTAdvVxloTUQflX%2BsxjshygoqsVv%2FfXeJ%2BplGnNJwnwqQtprxS0Tl5gU4sIiXAj9zanB%2FK4Jl4iepS4Dik9km0HlFEZ6fi02ob5Wa9ATMSbtkonC1rDjuASKcB6C3VqJNoxkiBhUtM5ipUEkse3PxfFoIqGTqOLc7uuuO4S%2Bh%2FwHQUzFtsXyI86gXHR6tRNYWZmgksNgLBPLb5uc0BBz4a50X%2BkI3R&X-Amz-Signature=7a337fedfa7940ca0e6681d3b6d1843cf40d133b65271c126f697ef393e10be7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHBGPEQH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDzGg5qhaDJ%2Fu%2BcAlpyL9VV6S9eXBQVv8HR0R%2FgiII8fAiB5KYfXokiBi8EYwxVksOF9d%2BSLvxT8DomU8pjwjfIKdCqIBAiV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjtKl1mmCPMEQ4CddKtwDDZrnInZmVtOBtdx8umywe289ibKeX45gybIF94G4fiTos2Af%2FRcqAE2Hb3HvsMcSk0vBU6l5oUmDLPd1DYFi3LqTLOujJW0XfGhYl0RWr%2FwEBNTQEBbeTpF4rSc9o1OF%2Bi1mwntN8gI2xOUK%2FyMwg1HeqBbhXizmQFntR5LzzGblX8Uzo2%2Bwxp6OhDidBLqF2DBCcl0VdEFmChhYai7eZ12ev8H5S35MilbzRyV2n5o5oyj19ibDCtiSwo5xfiJk1ErfY7ybs9loBdqBHHWJM9lIzs0VtwbbZwVfzm%2FmLjEZFuataiClrpHNM5vtBNPsxXJ9PRhIK1ULA4QQEWu%2FQc2JhFK1%2FFnrKN95NQRmfebI8hIvR7VHxLruh3KlK5ItDu7ODw5OzSprCuIecF91e1utLYfldl0E4Umf2QyVBPAgHXzH%2BAcA8CAbDEn4aWa15fi746P8VQy5O4eOR297CDnnZmmwSTX%2B7CXW5K%2FwF2xlf7dUrKW3Fav7al9puTJaRPmPqkL0BNbO%2F%2BRNzDr5%2Btzwt3kmgUWeXXfeK%2BN7%2B0bjKSQzn8QkFdt0IRXDvEJ2nQtTO7VSIkNYMXGqJZecbFaOcohZltkwJfpm6Nnb3sbFS%2FMMv9ykAcA27gEwht6yzwY6pgFxqfI54YdQE7LyJRU4T2nn9ULsSatBHycFGtKOdW1gn7%2BeGktk%2BEV5tBR4BsK6P%2FIpeDpEg0O3I6AOZbiX4s8sP9JLJIadD1TdSw%2BlmFlRsC%2BihIz8Iefn9P9ry0wzKmvzYo0QH%2Fw17%2FewtP%2F2NtO4reRPDIcQ%2FTNKWR728elKhLaSsLyS2yAIuvpmzKqZgD0vKk0snvEIGIR3ZRa3PjM9GBs61yfv&X-Amz-Signature=b5ba7a68e97d5e79fada8d331a580ef9a6c8652355a6c113fdf200b7fc12386e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHBGPEQH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDzGg5qhaDJ%2Fu%2BcAlpyL9VV6S9eXBQVv8HR0R%2FgiII8fAiB5KYfXokiBi8EYwxVksOF9d%2BSLvxT8DomU8pjwjfIKdCqIBAiV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjtKl1mmCPMEQ4CddKtwDDZrnInZmVtOBtdx8umywe289ibKeX45gybIF94G4fiTos2Af%2FRcqAE2Hb3HvsMcSk0vBU6l5oUmDLPd1DYFi3LqTLOujJW0XfGhYl0RWr%2FwEBNTQEBbeTpF4rSc9o1OF%2Bi1mwntN8gI2xOUK%2FyMwg1HeqBbhXizmQFntR5LzzGblX8Uzo2%2Bwxp6OhDidBLqF2DBCcl0VdEFmChhYai7eZ12ev8H5S35MilbzRyV2n5o5oyj19ibDCtiSwo5xfiJk1ErfY7ybs9loBdqBHHWJM9lIzs0VtwbbZwVfzm%2FmLjEZFuataiClrpHNM5vtBNPsxXJ9PRhIK1ULA4QQEWu%2FQc2JhFK1%2FFnrKN95NQRmfebI8hIvR7VHxLruh3KlK5ItDu7ODw5OzSprCuIecF91e1utLYfldl0E4Umf2QyVBPAgHXzH%2BAcA8CAbDEn4aWa15fi746P8VQy5O4eOR297CDnnZmmwSTX%2B7CXW5K%2FwF2xlf7dUrKW3Fav7al9puTJaRPmPqkL0BNbO%2F%2BRNzDr5%2Btzwt3kmgUWeXXfeK%2BN7%2B0bjKSQzn8QkFdt0IRXDvEJ2nQtTO7VSIkNYMXGqJZecbFaOcohZltkwJfpm6Nnb3sbFS%2FMMv9ykAcA27gEwht6yzwY6pgFxqfI54YdQE7LyJRU4T2nn9ULsSatBHycFGtKOdW1gn7%2BeGktk%2BEV5tBR4BsK6P%2FIpeDpEg0O3I6AOZbiX4s8sP9JLJIadD1TdSw%2BlmFlRsC%2BihIz8Iefn9P9ry0wzKmvzYo0QH%2Fw17%2FewtP%2F2NtO4reRPDIcQ%2FTNKWR728elKhLaSsLyS2yAIuvpmzKqZgD0vKk0snvEIGIR3ZRa3PjM9GBs61yfv&X-Amz-Signature=995e69f6c17251215c580ba5258d84e25133bde48f3b706e6e89e24cc55f2eb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664A2LQAVF%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICKVIB26pYR%2Fb2kF0S%2BhheoYwTneAUs%2FLB%2BnndzUsGbJAiBTXy70sTUw0mEGXLFK8w1d3s5Un3l7vO59AjgtBJiaXyqIBAiY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9jdvWUnBkxRNZlXKKtwDjSn8uqwRwyrbh1DBgi6Rb3fFW%2FJhUPg3SdKVqGPK3BsGLz9O9Ko9mxfWoFpQdv%2BwGGu3LQnuSD3%2BwrNM6Ujly7ym8rv0B9lLgfqX1UUelOBaq7Ibr0NOW5m4x6JOHDcd%2BvjcRLTyQA5m0C4zdxKZEDjeV2RxobyhvBEvPHuDB4XnDdQEMonHfI%2BIEP95kpwbUjk8MY3b2%2BcPUgZGJGnpD2HpSWok3QUGmK2GjznWso9ndOe9VOCDErIENPKm4k%2F8GF5nD42aGEkH51cMEGtgQd43Qzge7SfIDzV21nK0ay8loak4WFioHrIjfE4wFIOQljI4XGzlCWDEfIGJ4P6VXHdTRGNKDlhlhjlnt9C1WNKcJxCjLNrfUZH6RYgbC%2FIqfkiVBhWGKwJEm87GIh1UzPJRDpG3juvGqXC3%2BCGx%2F7b7WWf1da7Mk6qR6jscc2E%2Fa5Sa4LTPSOy8rKthUOoNnIzDQaDUqVxcGrlIculvlOOAvLKrtLYvlJU13VUOQefMt94BWufYhFoTPWKSDFEc6vfghIV9lx%2F%2F0r%2FezulS%2FGql42oc%2By1sXh88SlwuRIoYwMNtQapXs%2F0RuKpSUBF1AR3z8biom5rZ8ncq3tyCIdO%2B8Ec3YJN1O6yRwWEwuq2zzwY6pgEevqMDalMD1srO5DHjHlmsQVfYxrxnDIcwq33aJwXwAOGfWGAuYvQAfvTXfoTPWGYR2Rsqplm5alCcmVE6aBOFYZAFFUiw54ncj1ta9NFgdWpQTHlHoOcCZGdT%2FSwlNpjCsnUPPabqOmdMmkDbimEq6BgNabTiTguws2yHPvufcIbli4G%2B2wgYw%2BAjTJYBna%2FSWt%2FWdkoAeQOaWQKXc2SDURX5JisI&X-Amz-Signature=2eca2f771775f6a0f5198f737637b905137a331c8ea9b0839f6b9581058b755b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCQI3BCM%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFrVLEdzo4G9gba6tLDldO%2Fpm4kEUAVXuAMS7MEy8nxCAiEA6kIDJMQPCTBzmWs3Bfh%2FgJHByN4%2BP%2FEcr6RTD0xlWVoqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP7JPbNK%2F2%2BK6n8YiSrcA8%2B%2FIEJ0NtQ%2B9gwSs1qBQ6sV%2BJL%2FSQFej52P90TUTbHlYlNjCW%2FruG961G1dNKRiqcSuRiOeCIUkrEI%2BsVlbGLkqMNvOk3Elh6V5bBwadf9NuBLImied0zJw0Lg5D%2BEB7%2BP%2BFExdzzDO0fBw%2Fa4lid6JDutvmgZ8uC76qrnqaGyvEI0apG99ajE87%2FyR3H38L2Y9nj5Vz17%2BGUX3PEWxhQ6fVD13dl6dS9%2FfvZ%2BdzHALmovScFCS9K%2F2E3HgkETvv%2FXZ4BwpSEjuQTztSorI%2BsbDIY2zdM%2FuUKKp7QmwqUPt4MFAcW5zIOKT1FwTPP12SWXX5T5dNbzmAnFpdRBbxyZIPKVmlg0dFxyqtr2Nh1GctFClNUAY3NHVrEPy60DsY4IH0PgpFqzfrcl4JssgxrTvNsFsJdK04FYDbmO1srIgWVI6DzAyoBE5JshkR3IkyftaKj1xvamedELQ%2BpMXbNkcMb2sSuCVGdqBUUP4yoEzz5Zj8HdgDuPtVKi2fencnQSaxoyZRbcprlTQaIh8qgLHwR8%2FDJPPD3siR2cocco%2B6wCpn9%2FO%2F%2FsYfL%2F6wyhKzyElSSyUEGPP11mFBheDQ3Tmz0UdxjpgANnwj1o%2B6WC1SETB9BtBeQgpA5zZMMDXss8GOqUBQ%2Bu5Mz4HVopOHLDFMYBkpOsUzRGPbgkYMVRzLHEAVU6HaU3DVGCHT1aijVrFcavppm9zpT8cyfj7IPFJQcBOY9gaGNXvshb4K51LK1OvHYPJ30d%2Bn81uepfuOOAK1SL9BaCI0lnEt%2Fu8kmWaB%2BbALlmW6UHtpePSutT2RhMs%2BvkBcq1dt9Q1vbdcHKBCRUTfVQVk8%2FNQLcjIQ6ON4iQ%2B2HnJiIe%2F&X-Amz-Signature=355ac177b474eb61397aa5b0bee86ae5d6a6a0977935fda127d9566283de619e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RHA5IPB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHdhk6PRrN60JHQiO2%2FcQ9TEsi0%2F5KTrT7JEjxgs0o9AIgZPWR%2FVEyifAVsIxNqh6qjnumXklXdqf8GqzW4NAraMUqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO6crEHOGxN1SjFiZyrcAx0xZb47te%2BI6s12uQXyOi%2BuVLq3jN7HYqAhLW4313ETnnbnId2KhRpRFAGDunk%2FXHF4G1DIhToVro0pIuyGZXp3%2FSin5POgMmLXQFHJOkhuNJoyopcaTJvecCDLU8JGpcG2XHG4YCNrA7%2FHwcoPbxRksv%2BTOveUUZ%2BC%2Bh2wD2srjC2y4EklRh0y9yHY9o3p%2FADYgurhd1aIjXLfesCTZe0cuGMNFKmA6pE0zUPJLZv04fd%2Bbde%2FulNxPU90B0JEAyFYyyvQKPNBzHhFj0GoZEcWpCNS8%2BYmQrkm9vBML44hGzyvdiXLrj8D2IozgBy6fzA3Lh9e0LoUxeJ2dQVALtr3PX%2FLtTB7%2FC1xwy83mh4tHs%2BDw9QPQQkP%2BVX3DDr0ts3gevPodKV%2FGteJTXcejIPEcQSUPDHAgxPzcK1%2BQQxukP8rQBlTkAluj8XkC7SwrsBEKWgcp05ju0iWFmTitCNI0detzGfWAJIHK69v4bTp%2FVLW7mRmKKLHcooovJvlXxultf6PA%2FbaC4GjJFzrwR5RJRpSbYKyF4C2DkQ%2B9%2BWXyAVS3K%2FoJPMHRY6U7Q8nktMlAw7lKjp9%2FJTymhr%2Fn0A9ykDEg27jw5KNX3jgU%2FDUrOUZUleTdovkj4fsMIzUss8GOqUB2dhrktl%2B3eJUzBDMhea1BKaXf%2BFeSeH3JDsVoZI6dFe6uNEDvhfmpqFQBfu8xULeYNYBqJyvWrKzJeOjMIiGYQ%2FTcm53BpNQWVVTBQgU%2BfOKTMQrRuHt%2FfUeqfqluTx%2BQ4PSCr4szb%2BaJBau7sWC4ltA%2FmigmATtL5gsT%2Fwe6e0nUypntWe6JMReVcummITM%2FI0GBCJcY%2FIYm90YpOZeuK4ITrTT&X-Amz-Signature=b0a158cfb570eb712fe8c27e8ed0cb572b0d3bf3ba274dee345f9e24b77d7c06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647EJQSQZ%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC2Zz2cYr3IUxe9Zn6KQcgf0afDNcxT9FGsHgksnTa7MAIgexCG6RpzAaFz5gx5vvkqWqD4vtqojUikRXQDiMzhE%2BwqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG5HKnqrVLk9EUlxzircAwgiyMpRIrqQxEpuWrE5mCfIPUMcawQJPp3iDvLCn2V1PU2ImkheZR7%2Fb7HzPgdM20BT0H4sIqCS66r2Qn4vocRe%2FF%2FEJvfIgJVnx9WlvfRE40O%2BrV0zZ4yETgcUSFDKVHziFUEgcTDffOAKj2wdBrM5y6C8osoiZKSHsO1KMeJVH3BKUsH81eM38qsfmhCQ4hpOXqk4%2BQ4yXfjzI0ZgKotnS%2FU4gFbzlj2FmfjYRJ%2F8b%2BfEMHlbzqx7tJYKlbpLw%2FgFXLC%2FN%2FXJ5doTA2t7BsVdVvJp5QZvsratRW3G4cYZbncynf%2B8ZE0QgFoqL21HFLMpyohxZLShFYgQoISk%2FOo9R%2F4Kkq%2BuPaO2QDqwokfkhTtgM7WE953JxW3iNk53Q0lRSZX186KqDB8CorI2%2FGqp%2FkipWJ5zqaO1s63p2w03nC9AwP29p1QlwbyADRZmOh5TBbfDMa4XXzqxH%2BtvGsTnl1jjHI%2F3v5KtZPtICfjduS5%2BZjz5awWPfAfyzcBzT2BeAoLku6CgNxgWDHwOXaRnUTVmGKdB1JkujlFOUK3YnprAix59H66%2FqjkRlYDUIjXt18KMvUCMZYE3ZCatSUpUzqazjx%2F%2Fm7dsRqe1ZWmeCfXA1%2Fhv546Sn6FiMLrass8GOqUBe4woLkEC40h7hy4whkaG3DCNsiXBqd%2F08jI1t7jQx3EKkD5%2FxcWgDhay4QFFycEN8bAQKvj3L7lSYfC2uKtHful6yFQJB1S%2FPPwWDWT5ukjjAfhco61dLX2BBCSREnEhcyzwfxnsSlLfsNIIymKG%2B4zchgvlmlLzy6NjHJ57%2FXA4aKijlLOIt1kjaGTT86r79zg7IQxZBfntEvRiNYhpBU9iOZfa&X-Amz-Signature=e3488d8ea1e91877335775dcd59311136d71a2b492e0c6e9216b29f304c8cf04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647EJQSQZ%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC2Zz2cYr3IUxe9Zn6KQcgf0afDNcxT9FGsHgksnTa7MAIgexCG6RpzAaFz5gx5vvkqWqD4vtqojUikRXQDiMzhE%2BwqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG5HKnqrVLk9EUlxzircAwgiyMpRIrqQxEpuWrE5mCfIPUMcawQJPp3iDvLCn2V1PU2ImkheZR7%2Fb7HzPgdM20BT0H4sIqCS66r2Qn4vocRe%2FF%2FEJvfIgJVnx9WlvfRE40O%2BrV0zZ4yETgcUSFDKVHziFUEgcTDffOAKj2wdBrM5y6C8osoiZKSHsO1KMeJVH3BKUsH81eM38qsfmhCQ4hpOXqk4%2BQ4yXfjzI0ZgKotnS%2FU4gFbzlj2FmfjYRJ%2F8b%2BfEMHlbzqx7tJYKlbpLw%2FgFXLC%2FN%2FXJ5doTA2t7BsVdVvJp5QZvsratRW3G4cYZbncynf%2B8ZE0QgFoqL21HFLMpyohxZLShFYgQoISk%2FOo9R%2F4Kkq%2BuPaO2QDqwokfkhTtgM7WE953JxW3iNk53Q0lRSZX186KqDB8CorI2%2FGqp%2FkipWJ5zqaO1s63p2w03nC9AwP29p1QlwbyADRZmOh5TBbfDMa4XXzqxH%2BtvGsTnl1jjHI%2F3v5KtZPtICfjduS5%2BZjz5awWPfAfyzcBzT2BeAoLku6CgNxgWDHwOXaRnUTVmGKdB1JkujlFOUK3YnprAix59H66%2FqjkRlYDUIjXt18KMvUCMZYE3ZCatSUpUzqazjx%2F%2Fm7dsRqe1ZWmeCfXA1%2Fhv546Sn6FiMLrass8GOqUBe4woLkEC40h7hy4whkaG3DCNsiXBqd%2F08jI1t7jQx3EKkD5%2FxcWgDhay4QFFycEN8bAQKvj3L7lSYfC2uKtHful6yFQJB1S%2FPPwWDWT5ukjjAfhco61dLX2BBCSREnEhcyzwfxnsSlLfsNIIymKG%2B4zchgvlmlLzy6NjHJ57%2FXA4aKijlLOIt1kjaGTT86r79zg7IQxZBfntEvRiNYhpBU9iOZfa&X-Amz-Signature=d20df358ad708d80f02f6921dba535ac3eaea2e2a2f3758fae9c3932a5633ccc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGQ254IP%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGQY2wX4dNK%2Bft04LL%2B4iM3Dpeoo%2BINVUEAVktjRoKKyAiEAz53VL%2FWce1tC%2BAj9%2FNcg5mPYHIBfdDYYQqQa%2FeRFHQ4qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLCR1huS73NlXuQh0ircAzkvX2idmCm%2BaKGV3mkGJZQOVcJVYUHdUs9ziUi6bypzOvGyoCF9Rnkik5obhrXXy1bSZ%2FcK85pnEv0xNltDaeKp1zv0H5TystKsLf%2FIa9OdVtw5MP7cyMBf7oYvLM1UDbCK%2FEhws2yRIIec46NmA9RBM7AU82U%2F7yG0Y1SHHz37wqeka11LhN2cHbqPSXzIGATCOqryNZ85zoI9BbFhoXbyveXQ3lhe6x2TWRxCl3XBQHT9rsrBMp%2B2PUwRADShFJwx9OgcgnA6sL9htBYOEMp3%2FAQOyyU7BUDYtVYIEVMeplaD4UxpOHs3%2Bclq%2F5pWAw2Fcnv1Ojlzuk7D1DsuSgyXWNcwJ74DutE4OlIwARPYUn9Q%2BcxylpRkpWWq%2BCVMtJEJSPCvXC%2FM8DhRQaez1EA0DVvmaxNmX1wwfuHTG9302Qjs2NJE0T%2BHuAIEk5Z4yMM3cGIdkHHE%2BaAV21CNlOacIWnIYGbatuiKghsfeODdXZ3xGSO0N34j4gz8jPiSihNPwSfvosrYljeNa2XMEXRi7WJxrx7YstWTAwonJEUonP3Ne0Bebf9XexMJi8FrhmoSZeuj%2BL9r2TVyjL0toNA3Y8NT8nQSdIkynrtJfLCSNRO%2Bfe4wC6eMJ1qEMJfbss8GOqUBpTrMK7%2FgN3votxa7%2FdeYfEAVB6FwonMLvUEHLyf30Y%2FDYpl5s1y6vnorJlAl2iSqzYXY1JzvGrfxaeaOIQPpBGBTwuYcqmei4QcF6GFOedCl9YVAEKgLrt4iIdFsbMzi7SFkXtJ1Ud1NRk50e3196wVT4ctQK8gLO2xgYhP8rBobhxccpn78%2F7UPgFqWfwAwIZ%2FDLaqSQdXcTP3%2BLwE4Yh92BZFH&X-Amz-Signature=901c1366b2bc3f7fc034fb61c05160e5486cead2b872bc638333a867cb208727&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTB5LC5B%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCS%2FZFNyb69qFU4waXiK8sSFUbtrrhXEWqBY%2BR7EdrUbgIhANAXQhBGcAXgOPEu4puNOmoJjgizBecqlUgzoDNfq1MVKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzfGsLtKiPczAjflCwq3AMiikz1dFqvUKTm3utKslYHFStbXC4OhDjRskpap%2BpfOcydPKX%2Ffy5cIxaWNFKADcLS4L5p94AyXZBflN%2B1Snl4cxYSAkf4rWlDvXvTJThDvPGgPwyVp%2BZf6Mwtnl3QKMM%2BpOmNhRLRRyTb3GjcHqm5jtGUiwJbpVCA0SoYb69lgBuvZfb2t%2BTu0YkZZvKC%2F8HOgEFiNLMlJqvu1kipTzgeX52xau27v49RXGxCdWFucobdCNFRX1MiUEzZEg5geQM0HSmie7ZxmyO0LnNbKipmwswiwf7IBkqmHRPymtnNlQXv%2BHb0Q8vgI6i8XgyVFOteK17ubffo%2BVMhdNB8kuXZWZMOr406%2FWgejPZVYaDcFJRT6s7FOb%2F92GrfJUWfOzVswKFAfFsG6oMyG1WASNEddGAvZN1B5aDhHZ8hlCHKgE4v7Seb9%2Bt8vJKoVBWRRr%2F%2BEvXDoyp2NcpzZa7GcefzXMIh4Cgf1RIE5ST0pXBL6Ju4IMK1FPnLvBVbWJBsetGkGgBeckpsR9UE5xrRLvs%2BsECYkyadbA3wYA3zfUqHOAQ5HznkJ4zNQvdLKffEqo4taKWn1Qc3WLIkXmtYtxc0iX2lltwgsK%2BLKTW31zDBuXxxDz47Bxv%2BXFANrzD227LPBjqkAT6jR8AEU6NP%2BYHHUIqQN%2BWE17aHlwqKIkd%2B4PVTxpxoLbY%2BG1yyOw3AfGBPYe3nNvtZ1t4fZWKosesI2J4chgUfKr3cB4d3jFDLg5X7zblGtiIzfRNpxpsty0TpROOQI1YgXlngWbg8XowrDyPLNsMe8VWbYCs40oCsjjYKJ2Ff4R9b1OwlILnSEMPifG9cSqZ%2Bvy8HdwYrmSMJT7Ik%2BBs57SM6&X-Amz-Signature=f1a9c9fd4a097d898e26aab722ab56bb70ec0ab431a9ec93d2bc64d9de6c93d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTB5LC5B%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCS%2FZFNyb69qFU4waXiK8sSFUbtrrhXEWqBY%2BR7EdrUbgIhANAXQhBGcAXgOPEu4puNOmoJjgizBecqlUgzoDNfq1MVKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzfGsLtKiPczAjflCwq3AMiikz1dFqvUKTm3utKslYHFStbXC4OhDjRskpap%2BpfOcydPKX%2Ffy5cIxaWNFKADcLS4L5p94AyXZBflN%2B1Snl4cxYSAkf4rWlDvXvTJThDvPGgPwyVp%2BZf6Mwtnl3QKMM%2BpOmNhRLRRyTb3GjcHqm5jtGUiwJbpVCA0SoYb69lgBuvZfb2t%2BTu0YkZZvKC%2F8HOgEFiNLMlJqvu1kipTzgeX52xau27v49RXGxCdWFucobdCNFRX1MiUEzZEg5geQM0HSmie7ZxmyO0LnNbKipmwswiwf7IBkqmHRPymtnNlQXv%2BHb0Q8vgI6i8XgyVFOteK17ubffo%2BVMhdNB8kuXZWZMOr406%2FWgejPZVYaDcFJRT6s7FOb%2F92GrfJUWfOzVswKFAfFsG6oMyG1WASNEddGAvZN1B5aDhHZ8hlCHKgE4v7Seb9%2Bt8vJKoVBWRRr%2F%2BEvXDoyp2NcpzZa7GcefzXMIh4Cgf1RIE5ST0pXBL6Ju4IMK1FPnLvBVbWJBsetGkGgBeckpsR9UE5xrRLvs%2BsECYkyadbA3wYA3zfUqHOAQ5HznkJ4zNQvdLKffEqo4taKWn1Qc3WLIkXmtYtxc0iX2lltwgsK%2BLKTW31zDBuXxxDz47Bxv%2BXFANrzD227LPBjqkAT6jR8AEU6NP%2BYHHUIqQN%2BWE17aHlwqKIkd%2B4PVTxpxoLbY%2BG1yyOw3AfGBPYe3nNvtZ1t4fZWKosesI2J4chgUfKr3cB4d3jFDLg5X7zblGtiIzfRNpxpsty0TpROOQI1YgXlngWbg8XowrDyPLNsMe8VWbYCs40oCsjjYKJ2Ff4R9b1OwlILnSEMPifG9cSqZ%2Bvy8HdwYrmSMJT7Ik%2BBs57SM6&X-Amz-Signature=f1a9c9fd4a097d898e26aab722ab56bb70ec0ab431a9ec93d2bc64d9de6c93d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFLJQEIH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T152901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDZHX6ZPr69HLfZZ6CsYcG2K0Oo5%2B8JRxCkGuukQy8aLgIhAIZ67ECOPh1kYGMG8djsj4HsTmgMvBwhvlBS0hz76ZS9KogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzl1q2XMPub39sEEBEq3AMcd07iyQ1KSJIjWk7pPz4pHqRL3Prbi%2FhyCO5rK62J%2F%2BUePn7BQ0AQCQsV1E6gHxb7lmg6Xzx6Y9HeJHHcWDlMF425jhu4g6kvtnvbKo7WixrEY1x9feUpW2xZw%2BmQW0SEnF5%2FYhXW1BUEuboamLb63p9eQ9DgTlv421BpHxYJ8SVSoYTYSkYWIyucZ3pDIij54gCYbKHWoHE%2Ff5EBoMOar2n2lhMo%2BwWwdz1kISFzITrGcgLPV8aNZ4KoGQwslM2sQ3NnhLJDUuio%2FmlM5HIaxww%2BMb%2F7Tt0XaoW2s%2BO6OPDawi%2FOs9rlCv02eSFi663tyVSdXcEOZPfkIrK1i1T0AfqbaLuN71UOnzSxSbVkSAdlbluwlTSK%2FU7ncKYA4kpQQUOq50N4yOAnNCETp0Cvf%2BJzdXC0U8%2Bxd22Ml%2Fq%2BHK82B7TrOS9wl0i9nlDwL6rTRT61%2BtpJdF4MV4AyMJACPoicis8pdmFRmRqtcg90c6%2Bz7W%2FwVZRSYALxN5zVoD61swBIR%2F0VPlSQfQGiB%2Fi0oUFozQ2aXlP2XC6iTUXcfC0INrSkTGxZ%2FMM5LwTuAzVjCfjblWD5uyOsF7VbqRxdpLiSViKCZ6cWqOvSPRF9PNaDTLClzFJ3kH9p8DCV2bLPBjqkAXlx6hRaRjcbWYaUDb9ASGjonbVfszgSZ3fgo1VIQhGR8Q5n%2Bb4GoS21%2FjlRuz193ZUsKtjSZ%2BowMWT1TNAVGnIRwDSP8QaQsJmYvUOegYaYBXaIungnWgrVFYlHBWxCduqleRe05EMvtMhHZAiAze%2BHAiGVD72msXCuPL4rH0KsEI4zyKPYYG64sfFAQWQ2ml008hYgpMPU4Br%2BM%2F0V2LfuH6CT&X-Amz-Signature=cf357e962c4c94e5b954f627454c6401577b027ae5e9aafc03b05483437bf417&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

