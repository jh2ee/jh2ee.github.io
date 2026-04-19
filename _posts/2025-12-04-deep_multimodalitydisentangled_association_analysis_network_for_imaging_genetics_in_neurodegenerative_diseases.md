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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4JZQIFQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQClun9Wdj%2FKrvlZbNxIEO3Fa9agf0Cb0vZn3yAlD4RRqQIhALnYbknYxruTuWvh6%2FusnybXbOhGhJQWXQOYXBwIOLJ%2BKv8DCAEQABoMNjM3NDIzMTgzODA1Igwg8WtBxMPLkRQZuK8q3AMhgbItuDK3eAamvkgmLNuRSj7pkUZD62icWCuY1d%2FAMh0NEU2XjGMCwBwPeVVzHd8dyID0iqq%2BLcJzwaIKxrynRzmJ%2B0G5l3UVsLKum%2FjRw3ECBoT6badG3v6L1e4YscmTt0z9tMMX6b2ySsD8b%2B2RZ9CqCWCE4V1BeI2w3wN2szXymqMWgV42cNT59gBfae7L%2B81HOUl%2F6EMUTb%2BxBHy4M%2FGTGLa1FJccTE6MKG2b5%2FIvFH2f1V1Q8DrP1fPIunNwboSODA%2BfnIiJQBOXswMuSN7iSRuyDCwhT4J3q0%2FN%2FkZYi9%2Bd%2FQrbRuJR3zSNb74VuruQPVpNDL%2FiaoMBKgHzsjFEmpm2Z02aOVnK3qF55joT4BF3uE8CA%2Fslz7rCCvsR%2Br4a2xypEqeww2ldNHr%2FG41C242bLJbsVIsYRpb334KLEi%2BA9amRZkLPn7FusTC5dlpAFmKZD6LZVAiRYoXrXYtbpJSzkP0%2FwB5USPComMBwFuaNLhutKoFfv%2FZpyk9T0Y%2FU0u0mE%2Bgz191%2FwKW4sZYJbJsYPggb4GYlmCfm8PjeRdjMgfRHhPhSQUC0vj4yUNBpX55%2BrviKcDOJfMaYTravh4okYf%2BUF9q4xSmJt4SC7uznufKgK8GoZDD2lZLPBjqkAdidMgQYhcQcb36VcRXPMV%2FWZEnCUPea75JbGBro3Q5QoMsrny6HaWixWPIiuKhvL3TROVWZgReb76AQ7s1U6JB4wFTvuCBknMaRBcyzJ0PehmsmQRwLkzn32U0AzqXxKv3Je1nWjROaGboAT%2Bg0V82FrbJ%2BJBwTjaXY3d0hqQv36FN7ZvAzQXv8UcqENhtTn%2B8AJX0yrsri%2FSK5B8NArUA1Cfxk&X-Amz-Signature=824033a2f29192dbc64d05e6f551d906990eb5591910c82d58f2aa05b82ff91a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4JZQIFQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQClun9Wdj%2FKrvlZbNxIEO3Fa9agf0Cb0vZn3yAlD4RRqQIhALnYbknYxruTuWvh6%2FusnybXbOhGhJQWXQOYXBwIOLJ%2BKv8DCAEQABoMNjM3NDIzMTgzODA1Igwg8WtBxMPLkRQZuK8q3AMhgbItuDK3eAamvkgmLNuRSj7pkUZD62icWCuY1d%2FAMh0NEU2XjGMCwBwPeVVzHd8dyID0iqq%2BLcJzwaIKxrynRzmJ%2B0G5l3UVsLKum%2FjRw3ECBoT6badG3v6L1e4YscmTt0z9tMMX6b2ySsD8b%2B2RZ9CqCWCE4V1BeI2w3wN2szXymqMWgV42cNT59gBfae7L%2B81HOUl%2F6EMUTb%2BxBHy4M%2FGTGLa1FJccTE6MKG2b5%2FIvFH2f1V1Q8DrP1fPIunNwboSODA%2BfnIiJQBOXswMuSN7iSRuyDCwhT4J3q0%2FN%2FkZYi9%2Bd%2FQrbRuJR3zSNb74VuruQPVpNDL%2FiaoMBKgHzsjFEmpm2Z02aOVnK3qF55joT4BF3uE8CA%2Fslz7rCCvsR%2Br4a2xypEqeww2ldNHr%2FG41C242bLJbsVIsYRpb334KLEi%2BA9amRZkLPn7FusTC5dlpAFmKZD6LZVAiRYoXrXYtbpJSzkP0%2FwB5USPComMBwFuaNLhutKoFfv%2FZpyk9T0Y%2FU0u0mE%2Bgz191%2FwKW4sZYJbJsYPggb4GYlmCfm8PjeRdjMgfRHhPhSQUC0vj4yUNBpX55%2BrviKcDOJfMaYTravh4okYf%2BUF9q4xSmJt4SC7uznufKgK8GoZDD2lZLPBjqkAdidMgQYhcQcb36VcRXPMV%2FWZEnCUPea75JbGBro3Q5QoMsrny6HaWixWPIiuKhvL3TROVWZgReb76AQ7s1U6JB4wFTvuCBknMaRBcyzJ0PehmsmQRwLkzn32U0AzqXxKv3Je1nWjROaGboAT%2Bg0V82FrbJ%2BJBwTjaXY3d0hqQv36FN7ZvAzQXv8UcqENhtTn%2B8AJX0yrsri%2FSK5B8NArUA1Cfxk&X-Amz-Signature=824033a2f29192dbc64d05e6f551d906990eb5591910c82d58f2aa05b82ff91a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4GKOF5M%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIG9fIYQZywfSVM1aTkYywG8d0T4DxqkDLCZ070%2BsBH1BAiB3aO1zDKd3pSNcL60py13BbxHbjwtHBWuCC9b%2BBUQZjCr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMYZrq%2FTe%2FYGGKtz0KKtwDX9TaTSrJ16GqG49O8gYNptVzmYHlVnYlJfdMF00IXEmvJAU1iDRl1mW9UW3O3yBqxnDa3ghxTfWSNoMhysHNKaQAWwOHF7UoACjXCFV5s1R%2BWvdNikGAv42yS5pG9uiiLkWjAoiS1%2FQX6EUWzll1SitkB23anhawNHOxHLUAwjtLYGcQnZNhQeBkKiTU26HsmJ4lZdpY2XENn53C%2Bpzz4SaosgIE0hnyv9%2FVm%2BEKBrMISLRMZjNBBS48fZ5BMtEpg9vu1qtq3NYcPIY29EwYR7P3MIf1L4scmDM77P5%2FVsdufYB0uuttn1Juyu361XY905k4lNiZHCasDAqG%2BAv5Tgd284trBcylyOjQ7XSFMJpFQfVmiqdyn9Xgjykyl9M50WVIH4Qla71s1WNwoBdx1kQ6CA7uKjIY4sP5wnvNkOLUw9ktyEf0A0fc%2BzPMZ1xCnx4lJOIcOe2DaCgJOrhHitcOy0AZUwL%2BsWGUdCCbt9xtJbk6HvCcYFpKaTr2Qx6FAn1yW4dsO65QX0JqicpJmSxym4gIAaqgA9%2FUS0Anglj5%2FJHlvUNlhxs6ckSY2X5Bzvu%2F%2Bosi9A8Y1QIfLkb%2FnyDc0qxH1XiWoPnwXpifscUBg7PyCNhWMr9slNIwv5aSzwY6pgESE0%2BF%2BDKg6W1tJ8WLqF8JMYTHv2tf8GBqpbzMjascDEIUN2rwCLQ3VUqsHOiUCQ7tYUKjkM6lwXOJg4e2Gle6Kt1hTe3Xf7XF%2BiSPuFwo%2Be%2B%2BbIZXENEKI8Xq5660zIphtyNK2D5xyJraZHsnn29Tsz5eUkdUcBJssR80sAbNhq5KcoGK8IvRSyGfpPm8QSKkF4DqU%2FqdUK5Rpv5dsGQTJ7NWyTeS&X-Amz-Signature=6e8273cf73b88b8da39a677318f6fadf46a7183dc96ae56d517a614df6948a2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XEZVCMI%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDIPSv7Iz%2FdJ8u7MdhszL1K5X9PNSKYmCZGzDA2ING9xwIgKl1D9NEMWw7BqXWQWEt6sWfKxT9X7LI0htIeOIULifMq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDBa%2BnJb4XB1OLNUnISrcAwVlS93AVl%2BbGHsGNYSWxLkB1s1yFpB4%2BNUwkpt3PnPHwkTvcbHdIfUomBr%2BB%2BP0qHr%2Brdu4UPnzVnXuOyUTo6yFG7fasQIkPQlfnAFg0j4PqIAJ8j75AoXDNob%2BYBkwhrz6BdyVWnfApFbGpUWg1DmMl0AY2iFb2Yaw%2BLYz0njDezKIlbnKzgUBRyj22DjlbQ8CL3mqEGuv3eYE3WUiBB9x7ZDBK7FE%2F1MUWryhPK0moP08XLsszJkwDo9ZkJl2WlsVyVRPenAXcMce0R4q3X%2BsEvHEPlq8maq%2BjxPu6eUFKKKsNjqOKb9Nho1BKYd4snTRVb9XJ5d9L5Y5yqh%2FGreV9AuPyPg5SwNTFDyCP%2FTWs%2BZRtjqRLeB%2BM%2BwljniM5sQ35ryFNLEe45UaSoxyjnVhIgKvLj5KHtHiHFi%2F8QLyE0U62w6Njbr0FXMouDvQkHtI0QKVMTkDAgLX6zYCeOoAJDaHb7KvJyjavhV%2Fg0v2fGAXGY87vavAflfMTGPcZfOi0X0mxOtgpDYZTI4wu3CI5I7g8QH1%2Bu0CLWzvpzSC%2FOtW9lF0jerA2IVrXwmyF3Qw3Rw5GvLsQcM6OrEAmGc3aw1tyLxE3fmCjpANDlylSh%2BT5yatPKtBdguUMMuVks8GOqUBVgJmpsOceh9gtpAKhhI6QzMvDcYblAkO5cvXV4lWzsVw5GP7jchTdob%2BdjNP5HF5ANJekz%2BLtbsaVg8mttqIdomE%2FFdtBU%2FtjziLD1CVeljbnyqswlNd%2BnrEvaF2L6LLLpWLtvigkj%2FqFqPKQ%2BhLtCInSw7rXq2dpQGPUGEnaP3e0zgdhqlydVeL1m5TK1zctgyGqju%2BPU08F4t6LLsw9OfJwaB3&X-Amz-Signature=fdeb314fc35580f783cf0914549023f7c7a96da78c565f7af201ccf1e71748ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XEZVCMI%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDIPSv7Iz%2FdJ8u7MdhszL1K5X9PNSKYmCZGzDA2ING9xwIgKl1D9NEMWw7BqXWQWEt6sWfKxT9X7LI0htIeOIULifMq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDBa%2BnJb4XB1OLNUnISrcAwVlS93AVl%2BbGHsGNYSWxLkB1s1yFpB4%2BNUwkpt3PnPHwkTvcbHdIfUomBr%2BB%2BP0qHr%2Brdu4UPnzVnXuOyUTo6yFG7fasQIkPQlfnAFg0j4PqIAJ8j75AoXDNob%2BYBkwhrz6BdyVWnfApFbGpUWg1DmMl0AY2iFb2Yaw%2BLYz0njDezKIlbnKzgUBRyj22DjlbQ8CL3mqEGuv3eYE3WUiBB9x7ZDBK7FE%2F1MUWryhPK0moP08XLsszJkwDo9ZkJl2WlsVyVRPenAXcMce0R4q3X%2BsEvHEPlq8maq%2BjxPu6eUFKKKsNjqOKb9Nho1BKYd4snTRVb9XJ5d9L5Y5yqh%2FGreV9AuPyPg5SwNTFDyCP%2FTWs%2BZRtjqRLeB%2BM%2BwljniM5sQ35ryFNLEe45UaSoxyjnVhIgKvLj5KHtHiHFi%2F8QLyE0U62w6Njbr0FXMouDvQkHtI0QKVMTkDAgLX6zYCeOoAJDaHb7KvJyjavhV%2Fg0v2fGAXGY87vavAflfMTGPcZfOi0X0mxOtgpDYZTI4wu3CI5I7g8QH1%2Bu0CLWzvpzSC%2FOtW9lF0jerA2IVrXwmyF3Qw3Rw5GvLsQcM6OrEAmGc3aw1tyLxE3fmCjpANDlylSh%2BT5yatPKtBdguUMMuVks8GOqUBVgJmpsOceh9gtpAKhhI6QzMvDcYblAkO5cvXV4lWzsVw5GP7jchTdob%2BdjNP5HF5ANJekz%2BLtbsaVg8mttqIdomE%2FFdtBU%2FtjziLD1CVeljbnyqswlNd%2BnrEvaF2L6LLLpWLtvigkj%2FqFqPKQ%2BhLtCInSw7rXq2dpQGPUGEnaP3e0zgdhqlydVeL1m5TK1zctgyGqju%2BPU08F4t6LLsw9OfJwaB3&X-Amz-Signature=be27efc68d40028b155faafa16d0ab275be80b1440df81301bf1b48179a6b26d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EX4KR36%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIQCgHf%2FCtruAHHTcqLgwRixhiFPioQpJ12hut%2B3AdGFtNgIfNSBdEAP48zCYAYRErcobzZ5QH4K%2BGSY7F7S4qe4GXCr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMBf6RtI%2Bx21cpREIuKtwD2Waiq5OtmTyRRaRNMW4wDEMkhUkvns%2Fwu6sIrWQMR6nZtB6UoBIXEh5WgF0uBhxsRKqtibK9VAjF3KERNRF6s7%2FcB7%2FrLwjJkfJB%2FMQFviLKfxHfunffviiR%2BqcILXVTi31onVdUBnGxZvbDYIBRgLqnXXwsTYcwbCaLSMV%2BCFNsDd3p%2BH5jGuWomlZmBF2pWwLzxpei%2B5KfuaBcqqcHtrFlHEWcdf9k6xjTnBhhTrQnrsmeOa%2BEyWi5FmCpNteXBwStC%2FZ3mvmiLdpdjgyxigoleutKrb6rlUCQ5nGSpBnUTQ6f198QckZH0Tho2F4mnM2kDqjM0Gd8hQt2AFHOdi36M3zfs%2F2qFQWFrn9%2FKa%2B52%2Bzx%2B7XoyZXUt6BzuwOCFJ9EOeNBxkdZ36MYlwhtOy6m8bGL6aqiW6PmwcHj%2FVOTbUTlRXakx9CD%2FXJrI4umfvVsqYMXvBOCcG6ha2B7uZlNbiypG4Gqkfza%2Bhflfie9ifbydgeDpKs8Z1vgV6m04w6tNQRRFeK3G234ZvUwKZtQug5Ci%2Fw8%2F1jY1VfaXnf%2BdeCn2hE3jBZMnQga%2BR7HNlaPwxSqMTJt5IWBUoaRr8JjZn4Z9KHEgaj1ZG7dI319b9KjJxOatbF2%2B1QwmpiSzwY6pgGeUGOD20guUGcHr6vIhAYhgR3MbD2RX8Mk3HjO53ZJwUyrKrp8YuVQMnMGo7K27SikRyIqxwbnPiq5x2MzC3lDW5thKH4nxJ%2B7icsSawntMa8uBsOW47IizZkmRIvjtHwMt2Ln57Tghaw6D3ljjw9HY4ANhorlvTKHzpKZK%2FgU9E5%2FKWKmRd%2FajNfSF9wBu9qXTV2wGlKzfhJyKC4AhS4gROpAoGWu&X-Amz-Signature=5d208dadedb4f51954dff164dec3129680676b780338e24100bb5f032959f289&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKLKVEYK%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQC1YK6ugj8cTe74ZMlxz8%2Bm2U%2FUNA%2FnhJBFAmg%2F%2BbdQHQIgVme5Z00uKz%2FRNJIIMEspb6SwMOKzqtN%2FpVrdjPEao90q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDC%2F%2BYwbxrRLdJ5beGircA14xWSQTDVw5FjcXT%2FDwbLQhXmbRhdMXVR2u9ORIFatGZPNcGwrURAuV%2FkYoBcsO%2B6bT0w7ztW7g3fzOmdFqvvAhCvLzBaWTQAASrIEVZrhtvUTjlR%2FRpzDbXlk2wQzXK%2BeRPN5NhLuWaq7YP8W89TpcItQhSv%2FfpG%2Bo8d3RsviTd6ZT8Xbo1tKzC4DCiVuDRJAZlwoHLH7Vsfrg%2FFNeEki47Nt44K6p%2F%2F8E%2BAjkKjX3Vup96onxMuVlnfniRYXbH2Ln5WmsC0ZSsDXQERbuwYqyWkKvBXenTFzkKYpMw4pjo%2FNCP4JNDDPG1v3gw0JZ8xaqFp32Oz4vGjFg%2BTSiewYaPQv%2BKv6VraUAgrVNZdjVtJDMwMGBOT7coYXuahS%2BYYKKI7UueDYoeaMdapqZlMnhvLbePX8Swb%2BZRtX%2BfXj1wTnCuuOAs%2Bo%2BbBB3%2FAHjWWoF2cLO6Mdco4qy3cjzi633cnsHOkS0DqKS0qizGZx8Y8Cfl3o0LaPT%2FPf%2B%2F0K%2BruAB9YRSJR5JrY%2B1pluyim9BWrvUXO8JRsAT23QkA1DTmBbOdEC%2BQlJvQOkjOBNpC5LSBsWp20cp3qqWJNj21TwuYz1PV841REhDjK1i1REiGOAUiEm9FJefkveLMPyWks8GOqUB3QO3pU%2BTJI50h82iWXHJhbFScgGmm%2B2UDmQN5CDrBpKsXpOkiIFvwujnyIu7E0N%2BB5w%2Fg6MP8L%2Fd7Baeyh%2BO2AZQds5CsrufVz1l6j2u1yvMBOOtRK64C5sQ%2FzqhxTYBLCUkLprAo1cYjRAETXXqZGxKtibGh26R517Z%2BBwd7Rbawmv30ngOG2q0%2FP4HX6F2uUrp2pX6oRNwJZgvtpV0PV6V8R71&X-Amz-Signature=07b3e8a00447e9dc551bde6bc3d2a7c1a948940f40557fc2183051c23dbcab8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QODQSWXR%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIE0RHXFZQZRNPkJcv2vHTSIo1SzrZtx7gG72Pu2mdCcjAiEAuVob0u0nq2T56suT1C8dqkmX08zTN0O%2BqAMoBoxihSUq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDFxXsOgU6eUBykRQ%2ByrcA0bXJyMB5EkTcWb5etag6CLR6AqrM2D6f1oXXZD9%2B0ro2YwXUU9kGPZEpDhd4XDlH%2FSRPLkcdxuLjHVmMK2LeIeh5%2B0jbKcaqGczXpwyktVaR9%2F%2Fs9iBhzfuS6sGA8v65zwveCZysLnXz3LXotWIU5MIhrq9Y42tiK4i83pFu4dbQeFuI%2By6YiChsTi4bwE74Mvx9aA0Q0Ld%2BnNeznGObQrx2sxwcEFwy787iV65w6JrT1xseP8pt3%2FDu1lwFUsnAYzu8NWyn2ZdYaL18ESoJWfx0SXxFQR0H2Eegq5TlXCklmKWRrM0iYYCpV1nYBMQ1cPIHKHlvfKtdpirP6wicrmTpKXk67ZlyFa73sszYuCaYsngYWtIq7SR5g6V7xr4Jaxl%2F8267UlauPJGT0rlUkXmbZLs%2FsVL7gLjZyaUMyZW00lcQdRQC3ufUFjSOfzBaItDVBC6E97d46js3dzj0i2vNIZD3Sqk18sOutMhwhjzFNm4P%2FeaLJgqQ7ThipOT8YSVDx4GRI8W91zJ4cKOAn7fAdrnjtEcqpcc7NHRyAXsSg8wiIjf525E1kw3vOXK3KqvJUWCcCnNgLZ6AcS4gcL6B4qqyJNYGS5e82UHwdSkDTjQSNTpO8uP8yhsMMKYks8GOqUBqI7gAz4Lu7m14qRAD5Oc7tOfwJGRL92GOFpouK2yZefhUi%2FjINGzDr%2FtM7qe51PQUryBy5X5MGM19YTHTxCUnZKBPQuSPHk4LzPNeRFMpHRK27GF0U%2FAY3d%2BBR7UJJaNljH5txYgUtTSHxm0g7xyAxhGGXXxF%2Bis6jPjdWhZNE1AjOdZ8IDJlU%2B%2FdxBm5RYH03cvi4eSRYsFa%2F%2BPv00YZEDNXlZR&X-Amz-Signature=3c4532570d3b349587e5c55211cab0abf4528b31a8c782a6e9c1c58dcf5581dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637LVAYWA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T135000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDlHG7gGaqh1NqLGON19cCGQwlKcd16bNv6IfSlDOrxIwIhAIM%2BsGbaRkcdsX4Td2lsYgav3AR58sLH887iBUdGrMxCKv8DCAEQABoMNjM3NDIzMTgzODA1IgxvaNQc1OmBfOV25mYq3ANhwO8d0Ensaw8C2DQdRflistHsV3QgWCB4jJQTdCjReA3gb4qrSYZZJTk%2BB0qHPDuOuJ6w%2F6dY4a73B4oqxM1NcOzJEpG%2Fga3MnrwLwVHVvXaEhhs6c89bnSDshosBOZW99VL0FouXkIVPbR9VC8mq0sknmh5UWjw%2F8MZnCa5r1AWjNZP3mXCp%2Fqn2FMxrvVitdAezpBYQ9cP2HFNcDdafu%2BEgvsdVSorA5gdVAqIP1neUEg8rhffLBBDOqOdikvYehOSBL6rHydZBflYmHL8kEALMcY6C9%2BcXzo%2Bal%2BE8mb927aWr4hXo3bJnfnfKBlC1DjY3XelvWDm7tiXtMy9G0zJG2QQZt1AYRuNmD%2B9qGprftF2LbEM2y8xYOvEXeiyZyiq0HSjoO3Eyyi5LVo%2BjG3XvdOawFtB4LSRQWrWCrfSoUv9v4xE6XSlmxJRnKVVhAaebXrr%2Fy%2F2EOm0uYdch8uG7mQOVVqg6PgMk3UF7t4TKRA6srqqLUbRj5M%2FILnww4F%2BhC1%2BFn5jfZ%2B%2FktoPBVJZGhYcszU5tIXf8DphpOcz%2FCj3DlZMRMtzgpBIww7u%2FGiZnymI4jGbu%2FDPHwaTUdomYofRmcM8tSNF8ah%2BgJQGYkc39Is%2FepTchSTDLlpLPBjqkAa52kFKBLxo4lAs2BQP8xslsv3j1Bu6zeWwnqPt1SMOUP9tiG04dZ%2BEMd6ortCBZ8B8zxcaVc7nEfLm7%2B3xYZGo8H2fYp5%2BCA6ErNocpyT1I6zOZOqqj8n0ATJM%2BP1htTT7v24qG8XCqP0FodDfGfVPms%2BFj8T6c%2F9DNb%2FWx8%2BJ8iBFQqTzj1MQjWizNFboNavMKHYl3cmFXh4Q5Q%2BdorrAYWts0&X-Amz-Signature=8223e217cb48dc5e1e6ebf08d180cf9951b90bd0b9556336c3a2068a2ed68367&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637LVAYWA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T135000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDlHG7gGaqh1NqLGON19cCGQwlKcd16bNv6IfSlDOrxIwIhAIM%2BsGbaRkcdsX4Td2lsYgav3AR58sLH887iBUdGrMxCKv8DCAEQABoMNjM3NDIzMTgzODA1IgxvaNQc1OmBfOV25mYq3ANhwO8d0Ensaw8C2DQdRflistHsV3QgWCB4jJQTdCjReA3gb4qrSYZZJTk%2BB0qHPDuOuJ6w%2F6dY4a73B4oqxM1NcOzJEpG%2Fga3MnrwLwVHVvXaEhhs6c89bnSDshosBOZW99VL0FouXkIVPbR9VC8mq0sknmh5UWjw%2F8MZnCa5r1AWjNZP3mXCp%2Fqn2FMxrvVitdAezpBYQ9cP2HFNcDdafu%2BEgvsdVSorA5gdVAqIP1neUEg8rhffLBBDOqOdikvYehOSBL6rHydZBflYmHL8kEALMcY6C9%2BcXzo%2Bal%2BE8mb927aWr4hXo3bJnfnfKBlC1DjY3XelvWDm7tiXtMy9G0zJG2QQZt1AYRuNmD%2B9qGprftF2LbEM2y8xYOvEXeiyZyiq0HSjoO3Eyyi5LVo%2BjG3XvdOawFtB4LSRQWrWCrfSoUv9v4xE6XSlmxJRnKVVhAaebXrr%2Fy%2F2EOm0uYdch8uG7mQOVVqg6PgMk3UF7t4TKRA6srqqLUbRj5M%2FILnww4F%2BhC1%2BFn5jfZ%2B%2FktoPBVJZGhYcszU5tIXf8DphpOcz%2FCj3DlZMRMtzgpBIww7u%2FGiZnymI4jGbu%2FDPHwaTUdomYofRmcM8tSNF8ah%2BgJQGYkc39Is%2FepTchSTDLlpLPBjqkAa52kFKBLxo4lAs2BQP8xslsv3j1Bu6zeWwnqPt1SMOUP9tiG04dZ%2BEMd6ortCBZ8B8zxcaVc7nEfLm7%2B3xYZGo8H2fYp5%2BCA6ErNocpyT1I6zOZOqqj8n0ATJM%2BP1htTT7v24qG8XCqP0FodDfGfVPms%2BFj8T6c%2F9DNb%2FWx8%2BJ8iBFQqTzj1MQjWizNFboNavMKHYl3cmFXh4Q5Q%2BdorrAYWts0&X-Amz-Signature=104e85f6c99c21dbcea2c2d5e98e57313fe704df034da36777d8329fcc551c76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QQDDJ3P%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T134951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQC8piI7TRmKnty%2BdGWbvcL4lEc5PMjO9OAtdip1ut9zrQIgAYI4oJuEFoeVQjSkSKpqXch1%2Fho%2FqVeEK9FfcPD62kkq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDIn6Hf4q0nXNWkQ7RircAwqZ2ENpCcdsjjV74HWXwXoCg3QjUqCqbTHvZT8AYEDRbEZlPJTHAdXFXISPzkvRa8HR65I1%2FN9Z4LceRk035w4UY0PBsLsdmmOT4Xgm6016n63bBjc5Ao5cA1YzbdtB90Z8BxT5wuEitnrzBRX0Zz02tb10heldc%2FMrMD1oVqJa8dE4lwx2bvkeedbmIVxlLtu6Os%2FpjRW9vTxM%2Fj08sbdR5Tw7e95Fnp38Lnk9xMyhNjyy88vSnyJNsyddL2koC31h9ftyAkH0jSyaPKzR6EIRr7qCXec8jOnXU0chynDdxi00No9jOjjkbRVB2HLTyKB8vJFM%2F5wKXrEWNjeiKcDz5SlIFAbycDeRoo6nJbMRbP6dq0eovZyc0lAfM2LeRIe8RYaNZBXEz22r4kQpArJ%2Fj9CnlNAAXk60Q88iIu3L3zTQ8kESfEaY5iFr8QNGq5XDJVa0YMv2UAvLS74mMHVT4zHuX2XEBYGAtrbNceZiXTRnvI2fkCUYDok5gS2aYJqjiOcakVCCLp06EZLiiO5yKxHVAhUY8Pg2J2hzaxZ95rzzl25cAjbedzuhPAgBVShjBxFqm2tVbYdRWfKMat8TDXXZlS05TrywyRJuPcAbGNCOTAW2YntCeDYPMISvks8GOqUBlN7QQlPVVo9LFmq1OzFbDI0DbSXYOvLv4MEyKK7un9%2BqzyVt2yRnt5regmp3kRJPPPhN2t3SNWKigJqaB5ZxKvwJS07d6rKhMu55KIqx2ADDcMGKOqM7cHNOoD2slSNwLo957qTwVgC0JqxOYNeFvcp3dP%2FtToph%2BZbzeMpGML9UmygfTqheWtYwSLF%2BwTS8NMVw70bf4jdoKRX6xgNrPdozCGtt&X-Amz-Signature=d5146dc36ee3a89b43aadff9c1950184a8446c20c9dbd21fe813e6d731ec2572&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654D6EUUW%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T135003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCn%2BwD77dGRrn4ssIlTpRwi6uuNBjNhfVXlcisOlwaDtgIgN%2BBqAfK02aFLf%2FwgAXT9ARDm8yJDynCW8jEqx%2BqKl9Uq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDLBgMqIiLVmoidm8PircA4HJrPiu6lJ9Sco4DuSN84E2xxnAT6fnZXPpYdSxKFDXUc3C6GcmKbeXem4jQRUlbOqttN8Uqukdu6KMXoXj65oWe7A94oApn6BeYB35Jho%2B8OujPmX6pM4c98t%2FI%2Ff6WzthHHIFKeq8mWswn%2BqCa%2FGADhidJKjj8GpogeBB%2BRMUPhOswE83m67COO0eMlWfN8XJHoZ4C5Zf3LaQuDEFk%2FxkiByH7yCyp1ULEFbu%2FBn4cChRAb%2FOR8hMvVxI2Y6DrI3VlqMoQQlO7poCGqIxUeXhZf11AybpHh6ECyHKL6tCv%2Bj3x2rfirODlq3rSI6irmNuEivb%2F5VvwW%2FktL5DlfJCNoatkINOtajSHtu6yBU44WKbGzDrTStuedZ1NZbyJTOwc7ouMtf5FWKndFiGsF1v40Db%2B%2FJ8oqgvGq1FTaWInBpTTtJjSLRQkfR0mJKDACbylxS922%2BCfQgMti27znxoPolW%2FYaIxeXA1NpIp8byY03OP0ekUnqcOoDPLQZCs7gJwozuNEKaPRJpRyESBgJzu2dtYeWHUTkxA7gLlJVft4e8s0snsyuKopncZauCco3NYyU1uwFZJE48foJIeqlR7xjwxcGo1rbGq60KwYBjvE8XMRptjnFZ6NA8MO%2BVks8GOqUBcoQIZdl%2FfrCWNA6QRVOkdclEKZYq%2FIr0ilq7Kd1OnLEmkgmMujyCTwO%2F8tPp8tghac7NQz6tv1XuOmwAE5DLZDBBtNSgqZh3GBWp94Sm9zE2YKEQVNxWlx1KAABE%2Fpv9CFTVNDgXSANthg0nC03jG76DapDf7LkcKU5LP35frUFazo1SBsh6T7Y0QK2Sz5%2FFT8IP98wBQ91%2FGY%2BNg0JEi0P2ZgpO&X-Amz-Signature=ae0e77dbbbb3bac92e667a7bf0b0d41d1faae9976010cd7cab6f6ae3adbc73e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654D6EUUW%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T135003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCn%2BwD77dGRrn4ssIlTpRwi6uuNBjNhfVXlcisOlwaDtgIgN%2BBqAfK02aFLf%2FwgAXT9ARDm8yJDynCW8jEqx%2BqKl9Uq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDLBgMqIiLVmoidm8PircA4HJrPiu6lJ9Sco4DuSN84E2xxnAT6fnZXPpYdSxKFDXUc3C6GcmKbeXem4jQRUlbOqttN8Uqukdu6KMXoXj65oWe7A94oApn6BeYB35Jho%2B8OujPmX6pM4c98t%2FI%2Ff6WzthHHIFKeq8mWswn%2BqCa%2FGADhidJKjj8GpogeBB%2BRMUPhOswE83m67COO0eMlWfN8XJHoZ4C5Zf3LaQuDEFk%2FxkiByH7yCyp1ULEFbu%2FBn4cChRAb%2FOR8hMvVxI2Y6DrI3VlqMoQQlO7poCGqIxUeXhZf11AybpHh6ECyHKL6tCv%2Bj3x2rfirODlq3rSI6irmNuEivb%2F5VvwW%2FktL5DlfJCNoatkINOtajSHtu6yBU44WKbGzDrTStuedZ1NZbyJTOwc7ouMtf5FWKndFiGsF1v40Db%2B%2FJ8oqgvGq1FTaWInBpTTtJjSLRQkfR0mJKDACbylxS922%2BCfQgMti27znxoPolW%2FYaIxeXA1NpIp8byY03OP0ekUnqcOoDPLQZCs7gJwozuNEKaPRJpRyESBgJzu2dtYeWHUTkxA7gLlJVft4e8s0snsyuKopncZauCco3NYyU1uwFZJE48foJIeqlR7xjwxcGo1rbGq60KwYBjvE8XMRptjnFZ6NA8MO%2BVks8GOqUBcoQIZdl%2FfrCWNA6QRVOkdclEKZYq%2FIr0ilq7Kd1OnLEmkgmMujyCTwO%2F8tPp8tghac7NQz6tv1XuOmwAE5DLZDBBtNSgqZh3GBWp94Sm9zE2YKEQVNxWlx1KAABE%2Fpv9CFTVNDgXSANthg0nC03jG76DapDf7LkcKU5LP35frUFazo1SBsh6T7Y0QK2Sz5%2FFT8IP98wBQ91%2FGY%2BNg0JEi0P2ZgpO&X-Amz-Signature=ae0e77dbbbb3bac92e667a7bf0b0d41d1faae9976010cd7cab6f6ae3adbc73e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSCNMH3P%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T135003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIB9Yhqvgm7IyCiWxBTzZ15lDDK0a2oTp2ryrVKmKhdvsAiBDQMFeu3JQvlIUm8PgXpwXhfctpoF9Hk0IlAfgvKqKUSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMwWi84Q11ZR%2FiL%2FqNKtwDBL5XjDZBDvN%2FHkAglITLTiBLyvAhvF0yBtt0%2FIyjJvc%2Br76inqJ0A0f4D5s4Xk2QLtbP28YALHP18LZpC7W5tIhwLK7yFBv1DDzWHZ004GzrvMdSmAHp7CsMKAMCr2Q5SwLakSQNdqRaeV3jyaP2NTtQUX3QVA4%2BDhR7%2BOwvSv%2F7OzVzKEYQkk2H3Fnse1rD2P9foTEolxEnMyYR%2FqWsKHq%2BssRKITVaDqNPmhlPpoQoT6R2A%2BqH1QSphxycZOWvn1%2BNpzpmeGy3oCCAw0Wqc9IZG8U5QH1rTugs0znv2We%2FcKet9LlJsDV8GFxIAEjtmIKbhtwdAao%2FwVUgg4l9T6cRQPDoBtz0r8IWmx85HICj2jxlh28aIDlUwKnUMyL1zHP4oH0c4dWRFbsJTE1YWA6BezHklNH6Oo0KMuDg3Mk6cmoyxdMwWOnHPZqb955gEi7W3MNWArBafJE6Yip4NxwTYdIGFvzNvhVEQHEZ5ES87V39Saiec%2B6VQiRZhb%2BQ6rBLcwKgq8TAki46SeOzPtH4VVF3g7akXDKctWBSIZEr4f5QOtnK2grE3AzAe%2F7tFGduZG%2Bc5VIgc%2FnewISgvj7wMJSyBKosJPsnR%2FZtPKpbURdHqbq2FJFRvFYwm5iSzwY6pgEdFzxxVcCk3jreByfSiByTZOkTV6cBgZ3cf0K%2F8mTAouD%2FZSGk6ZmnB6cDeU2%2FtBBOzlxB5swponRKXf1je2gJg65b0AtTeFiDdCgIiYFbOMHyHmBPfyr3e02oO4mKIFjX%2Bj%2FQnDSjHF08LaNttroK0SVNT5CWW9JXejj8N%2BKFPKvFGB6z2ZuRZcZrrw%2FQNrOgYWZHtJ99Wnx9PnAKyfqgk9ifhJzQ&X-Amz-Signature=41aad869f359a3a678ffb52b67d6bd6e95d5e2c532b5b87e0ed79c492e92e297&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

