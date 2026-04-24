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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGDFN6PO%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCJSlZofwgyzkhJdChEM8KoeDeOL9M2MjP%2FXI9CnZNIBQIhAO0cTmbsbwJET8hwN5JDkaXS0aA64mGKn2x3NOgsUusZKv8DCHsQABoMNjM3NDIzMTgzODA1IgxbHZmKyEJHCliGdn0q3APy%2FVHQ8RIf9fXoDdXnXJIiOaXdpzOc7S253tUMqLuQsDf4Xowgj%2FiYGhgubTsFqSo3EWW9hNSCAwOE6R%2Bfv%2B1gl1L2g%2BYONMM21snYd7d9xEGemzhapTwvqwgsAeiu9%2BprKrIw4Mq%2BfeJiBVSenKjYpMyzo8k8RSQK60TFlgnwQbMZfUrGVHBr9vgMHrUultC6po9HXqGhtBXJCFRl%2BespyTJbE%2FTQSYRfeC7SUfw7h%2FK6zYkR1q85i2lsA7Z4t2uqh1Xzmd%2B%2BHmQQH51JbfYfZ1awAbWvQrqGCmYAXQvJmQwplhWaLC3kv%2FX9d1EOG3ywfh2LBDzI41jGRHo4VJKtSKj3t5a0LJT4FrFpAj%2BVAaWI7T5AdqqipO%2BzE3%2BbKpFTgPcokGAO8xrKxd3Y1YHQiHvLoCOKRZjCeD4MXihzZqtC2OVUv8jCpJGit%2BuJkbpk7rXGITZU%2B9pkS6Rdj7W%2BbasOpSE4FvZzTnKHJHeGDFVLf3eq0Hcu3aTkt%2B44Z2kDFngoE5bzbNZtywhsICLAp%2BMndVrt3kd%2FERMiUM65KSWM0K8yatLt%2FtS6zmlGhcANx%2F29iSLAhNAmQKwhMprIeFg2bqOmTlAbWB5DN1pttT7R4ilgzEOALn8i8zCO%2BazPBjqkAaHBgkBGn5L9A%2Fwyp8WN2clr%2BmY%2BiRe1u5RPwAryN3H4wIuEsH3MKGzfdpGNG4PljwsQKGiCiBoZujtkG3xNnzSoRg5hcXJfgYBZVQq9NBU379VppgUIlBb%2BAgTKpu3Z75X64tcEDvuV7%2FmO1unuAb9lRNrEbZEAcjVeI8jg6va%2FEWeZVUei4NnMmQkd%2BhHxnnoLJzmW1jMFUvM9PUxk2cWiLzZ5&X-Amz-Signature=4c8d40c0438a5e10a2f60f73c4a1215eff4a96bd480466a998f31ac5f1388985&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGDFN6PO%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCJSlZofwgyzkhJdChEM8KoeDeOL9M2MjP%2FXI9CnZNIBQIhAO0cTmbsbwJET8hwN5JDkaXS0aA64mGKn2x3NOgsUusZKv8DCHsQABoMNjM3NDIzMTgzODA1IgxbHZmKyEJHCliGdn0q3APy%2FVHQ8RIf9fXoDdXnXJIiOaXdpzOc7S253tUMqLuQsDf4Xowgj%2FiYGhgubTsFqSo3EWW9hNSCAwOE6R%2Bfv%2B1gl1L2g%2BYONMM21snYd7d9xEGemzhapTwvqwgsAeiu9%2BprKrIw4Mq%2BfeJiBVSenKjYpMyzo8k8RSQK60TFlgnwQbMZfUrGVHBr9vgMHrUultC6po9HXqGhtBXJCFRl%2BespyTJbE%2FTQSYRfeC7SUfw7h%2FK6zYkR1q85i2lsA7Z4t2uqh1Xzmd%2B%2BHmQQH51JbfYfZ1awAbWvQrqGCmYAXQvJmQwplhWaLC3kv%2FX9d1EOG3ywfh2LBDzI41jGRHo4VJKtSKj3t5a0LJT4FrFpAj%2BVAaWI7T5AdqqipO%2BzE3%2BbKpFTgPcokGAO8xrKxd3Y1YHQiHvLoCOKRZjCeD4MXihzZqtC2OVUv8jCpJGit%2BuJkbpk7rXGITZU%2B9pkS6Rdj7W%2BbasOpSE4FvZzTnKHJHeGDFVLf3eq0Hcu3aTkt%2B44Z2kDFngoE5bzbNZtywhsICLAp%2BMndVrt3kd%2FERMiUM65KSWM0K8yatLt%2FtS6zmlGhcANx%2F29iSLAhNAmQKwhMprIeFg2bqOmTlAbWB5DN1pttT7R4ilgzEOALn8i8zCO%2BazPBjqkAaHBgkBGn5L9A%2Fwyp8WN2clr%2BmY%2BiRe1u5RPwAryN3H4wIuEsH3MKGzfdpGNG4PljwsQKGiCiBoZujtkG3xNnzSoRg5hcXJfgYBZVQq9NBU379VppgUIlBb%2BAgTKpu3Z75X64tcEDvuV7%2FmO1unuAb9lRNrEbZEAcjVeI8jg6va%2FEWeZVUei4NnMmQkd%2BhHxnnoLJzmW1jMFUvM9PUxk2cWiLzZ5&X-Amz-Signature=4c8d40c0438a5e10a2f60f73c4a1215eff4a96bd480466a998f31ac5f1388985&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKYSFFGO%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAFjaGGScMVLQ8wO61qyUqtFJy6Nuq2yBZjUoghtSNhCAiAo%2FMiCyf8nybRt0cUGortd4nf5dfTOEHukWBhdZQ9FPyr%2FAwh7EAAaDDYzNzQyMzE4MzgwNSIMJpceZkbH%2BfHTAZYtKtwDmwus7dcPwYi%2BzOFNza6QdNEZgwjUsscy9ggmO08%2F%2B8PqDjldFdRXlJ%2Fqm75BnCL5X3TJXzH9tXd4C6cdpYTlGRkYyfLA9bB1FhQWaeZ1mBDodDZaVlomNkj3hp2Rg3LKlBzHaSrqDU45EYh9aHPBfqqPg598cuBRFiGijXcavU5EOVBj7vOn2GGNS2%2FTLE6dKgvWOD%2BDqa87FeKZtsrpCMo4ssDtNNuQag%2FrSkZKan0j9u%2BIciMhZNduuTSZWNcyw6u5IaZDQKJSzfvakZZqnYRWzrU5zjjd8xVZUaOz8UiwXsec2Ef65PtNnVUiSTrtEllTSWde9XMER%2FDqrarMn%2F6yOOoV5aaLy19ocQf7NLQkVmjkk%2Fr9dmILNxI0zeTYocCBD08GQqS11LgQE3o6YX52YKriiFwoWL%2BzM3oo1Egxq8P8C9WATR0JqF86QAjBzOk8fbhkJoviO343DPqOsGNBzsQuFyWDjtMip3balkaB%2Fjko4s6N2cwEEYq3ACDaHYfGJur%2FQrxEe3M7sqJWseBDBAdbv40M8sPQGepLSLYSUUbkYlPMWwNEuP%2BBi0gPMPLvjhTgCSlzE6BAxmlCzSJh0Y2glqjzKSLclEAZLWJ8EbqKZ592m2mE3IQwvvaszwY6pgHmDkmNaBeFnhWGjxsKyvmZvIBMWCsJSz2F3FMHmky7iHHGZbDAVLOKfPaQ4pdnzj%2FiglLy%2FqsQzADeCOcnm6SgrAe%2F5y6LKFLdLvrWtn%2Bq3FzOEwU%2ByehBsmS4CAEDAQadfzZ%2FpJzZ1JiWZ8zQwdA58UmtWCNvTmey2nQCQm6NH9pIvTuoG6YjQRUeP85QX6hRBFZT%2FFJmq233x%2FiDUtfpsUOHoVM4&X-Amz-Signature=10716837f253651c665d7e4c31aa96c22c8e442a83c3770039c9ca42e01549c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YYXIMTN%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICSubh%2Fdqfuirr25M1sNWJpQGky%2FA2H0efMhE%2BsB0bbsAiEA66rsafozKRlTYqkLYvULi%2FuKSVoUiyWZ1LK9xfj%2F3usq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDHVEy73wO0DKrnKsDyrcA2WY4b0Hqi8YQ7cOy5%2FfuVMnB2GHW2sGKJRXybSjbiVQrDw%2BfSElzOWurcSfglvQipHGeJiQgzUm%2F0Juoq1OuNEtLkh17FYhBgODUv0F7x7IYTgDLEX%2BjEWgmKXBB%2BFW37n9bQh2RKLSKY%2FqzRj6jcsEJamlUWSMgWMwh%2BOp%2Bbb0N81tYIuF6H%2BBleA1NLCHW5vhBcfWl6QXyLBh2mYampg6q8O%2F8hzw84EkflrjvuyGHdMwxIpbqd9VHSLWWjCRtDTOPOfXx6zWI9plamP44xv8LVzj8iEmrFHByzeM10qr8SUYF88Sy2IY0pwKOI0UbKte0JXDgDWz4rVmeCcgkku8usjyf%2BiFguZgnoKUNFx6p3YIVOwn%2BB1%2BGsYx7fuVfBI5WkYdqByhYZ1oeVAali40J9tL3LR4BKSQUB9ZIdbuWXpXL3FeOk%2BUGiLTTJLBS7W%2FW4smc7ggAqO4UZc791B3UMEMtAyt9v%2FkTcYFUx8Yw1QoxPC5bMVgyrn192T9cJ9otftqRPUYMMlERvclKhXoofvsCZbNHrRAH1qDBdQXs%2Fcq8i3fr6PZ87ldaUYckWklrkmjWcS%2Fs0zuX3wr%2FzPB6yqt%2Fy3S5ZVDsu%2FOqsvqKZy%2Bx0mupoVgKYPkMN%2F2rM8GOqUBHXMLXXkYNsp6z1QjQMs3Njz9hlzasFC818o%2Bof6IH8q%2F%2FWtcqSjlZdYWU%2Fgk6rku91sFF56EsjE4WgX%2FZ3ezHjOA1%2FsApx9NoMrBuT8GdgaLX7Q6JYqgTBKVuEI%2BB%2BaE%2BVXLDTc4nOVmf%2BUQjTrOZrJ9MWlieO2JP30o1%2BIcsjSokUVW%2FJu%2BOgKGvmc9ZM0JpOIWLCAJWq%2B4kbezvftIT9dLDHiF&X-Amz-Signature=2ced0381a478ccc258db9735103e62a64165d297481eb1dceea4e64bf33944d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YYXIMTN%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICSubh%2Fdqfuirr25M1sNWJpQGky%2FA2H0efMhE%2BsB0bbsAiEA66rsafozKRlTYqkLYvULi%2FuKSVoUiyWZ1LK9xfj%2F3usq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDHVEy73wO0DKrnKsDyrcA2WY4b0Hqi8YQ7cOy5%2FfuVMnB2GHW2sGKJRXybSjbiVQrDw%2BfSElzOWurcSfglvQipHGeJiQgzUm%2F0Juoq1OuNEtLkh17FYhBgODUv0F7x7IYTgDLEX%2BjEWgmKXBB%2BFW37n9bQh2RKLSKY%2FqzRj6jcsEJamlUWSMgWMwh%2BOp%2Bbb0N81tYIuF6H%2BBleA1NLCHW5vhBcfWl6QXyLBh2mYampg6q8O%2F8hzw84EkflrjvuyGHdMwxIpbqd9VHSLWWjCRtDTOPOfXx6zWI9plamP44xv8LVzj8iEmrFHByzeM10qr8SUYF88Sy2IY0pwKOI0UbKte0JXDgDWz4rVmeCcgkku8usjyf%2BiFguZgnoKUNFx6p3YIVOwn%2BB1%2BGsYx7fuVfBI5WkYdqByhYZ1oeVAali40J9tL3LR4BKSQUB9ZIdbuWXpXL3FeOk%2BUGiLTTJLBS7W%2FW4smc7ggAqO4UZc791B3UMEMtAyt9v%2FkTcYFUx8Yw1QoxPC5bMVgyrn192T9cJ9otftqRPUYMMlERvclKhXoofvsCZbNHrRAH1qDBdQXs%2Fcq8i3fr6PZ87ldaUYckWklrkmjWcS%2Fs0zuX3wr%2FzPB6yqt%2Fy3S5ZVDsu%2FOqsvqKZy%2Bx0mupoVgKYPkMN%2F2rM8GOqUBHXMLXXkYNsp6z1QjQMs3Njz9hlzasFC818o%2Bof6IH8q%2F%2FWtcqSjlZdYWU%2Fgk6rku91sFF56EsjE4WgX%2FZ3ezHjOA1%2FsApx9NoMrBuT8GdgaLX7Q6JYqgTBKVuEI%2BB%2BaE%2BVXLDTc4nOVmf%2BUQjTrOZrJ9MWlieO2JP30o1%2BIcsjSokUVW%2FJu%2BOgKGvmc9ZM0JpOIWLCAJWq%2B4kbezvftIT9dLDHiF&X-Amz-Signature=a280f48f76daf06281e42666bf001f0e7f47bc7aa27a640ff60f5830979a86ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VISCXN7D%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDogOi4JVzuKazLAHM1NpEiepTAFNM6VuCDvwibn4jnCQIgRBM%2BrVxUOk7yXYDH6iqiaR02cw4JiBU1OLVrmB%2FS7HUq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDLX9lJUWwW%2Bxsy33FCrcA5eoISM%2B7TKJJ4xTCdKCaGuV9AsroCj3dWrPQsNblZas0SgNWg%2Bu7NerwlMvJjrYw5EixBrslL%2FRDZWnPeuzJkPOAfnVJNRys7Y2mBWJmutZf4zszjXtAQ%2Fnud3jvaEOlry1roy2AMxP7IDpCN8mw4s4MljolDhrftGuPnUqrg803Fwi%2FtgT1x0M6UEqdtfT3BUgycOI65MVtcwtCpnQ7R2Yhhaw4AdZ9eXLW%2B3FDJHrWySTaUcl11VwM1uVT2uVsCgH4lxAT6fgUoO8CNfzG6jpcE%2BWMRSEgVVvJ0s4%2BL3npgB8q7ONO4qpxXJjHGMBsX1E3B3VeKG5E3fl561fLH9koDgXyv1Be4mTfFaSRmlY9bZTA6tVLjrL%2Fpxtn%2Fi%2BLKSEkIt8LkUOnYuTktWtVATGyIBMtpdEBA4ne0s71U6LwiFYVt%2FoYDfsKimY8hKKEvCVC6z1gh64sjrmCoC6LPst4%2F5kceOR6fWKpo7j3s%2FGg6TRBE9d3zu0TQOLjTggCr9VRWrKa%2BqS5EzByULh3TuuyCcPhCT%2FRVFXtAk0ojoT%2F2SqgYlLeq3P%2FP1uBia8D2JCo%2FVxPFKb3YAHFCjQ1S9EGbjEJ7NQL9LfaWKK9HVyTmwuHjw5aW%2BTeT1UMOb2rM8GOqUByvVIxh90nvXY618wbmEZvEZUXMrz770tJ3HcBJfe%2BYRlzexT6eECETkXRYfVpAUC71MJk2N0KAfXy219yVUmUh3w8WtNolw8PiQ0bj6AH6gY1vOzuV3wdlftOAEpI6KlIFSknXUpjMWr8mZZpQT5a%2F1QI5cZkU5N4zCsfFCn%2B07KC%2BHbM7A7CR0RdPt1PJgh1Mvk5wgq06WjSjwx2bJhS14dlXwl&X-Amz-Signature=82a084ea3d5f779dcd80980a59915d332a2ad75ee077dde5f7c16e8a8a33f689&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VINMN3OA%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCNuWKDBun24pwh51nlMt4CbXe6lN8zleeVkWWwnWRepQIgOsjaip4lqNHTKiRl2geuLFhKWzvga5jqgpct0GK4NtMq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDInSBODS%2B%2BSmUT3YfCrcA%2FtRCn2IAbeKENIGP7TVkSrc1ID1WVmtx1w3tejM9CsWb8P2dtGti7ek1Xc%2Fr5TA9N2FOu%2F6w2Mz773aEoaD9WdMnWb%2BmI6%2FEMRff%2BsnfrtOZ%2Bn3AeUGrpa90NGc%2BON9Rrb1BWDL9pxnB8TTDhqb%2B3fFUDDPlP8sZQPGDti00OHjd6Letm5xRu6cxJIK2co7rTNdqtnZ%2Bg%2FZz2PdelygmXYPtBKgmzvY2SAWEoS5k%2BvVCAExZwgdxGUcbj1O%2B4gIQAtStJSOXuMA7F0HQCh1%2B9UqiIBeiEP8UwPtlHVSnVOU2CoDT5479QDWJTSesNdhsiMWm5GjzUKcnVdV%2B%2F12XhtzvlkPE5nOE%2FGVnv2vmWuS3w32eEqQ6I7u4C%2FLEeW%2BcZ5zKtJP40u%2BD1vxwbxRSeom6avfQ1rq3V3V9nTsZ7rWbDF1WMnRax44UpL%2BkhfvVhch1UTXitCS%2FnP3dQhy01O5UXEKLCvbB3hAoFf65cHby%2BOQodIcF3d577gvJyCXT0%2BJi2n2itxuajj0qI1%2FsuqqLqHvA8Ud%2Barqs2%2FVnUw%2FxWkediHXQJhp0nuL%2FmgxZ1eFkl17T2a6jFubAEFWvRJ3rawH0MMmAJaseo%2FeZpUN7dvtjgvVCdWZMvEgMLeCrc8GOqUB3k5%2BDk6DEk2cB5oMaQ7Zgohr2xNlkjzcGKw4Gtydti4lHH7JAQ%2FezGnoXCN%2BTBm323RBsDocI7q1x%2Fh2jblGE2p564u%2BvNUf6mGJNgW5TgHobFe72TiE6uiqVhnjafkhSer3xZpvZEi64iVurWUwcZqXQd06x6RI4T0lqOk8Oy%2FmRGy2wJefWbY2%2FrKsRjbCv4znfeiqL7%2FzKyIyUACZVd2z0ZlR&X-Amz-Signature=1faf24d25a619064a8cb1d17bcd6e1347d6cc853ea38906ef9c0ce13e8d875c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667L7FR3PO%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGgdcyK0h%2F5t3IsPKC6H3M5kli17Q0dHeNrP7ZZliNp8AiBo8QEmeTj9oCy4knKFun%2ForZAn7krb028b6At5cM2Ssir%2FAwh7EAAaDDYzNzQyMzE4MzgwNSIMmab6um7nsvcn8tU8KtwD6OD9fvK%2Fs%2Fw7yTAxbjxPIcrechNW0GBtfJfovxTx0jYnuib15XOzmtkqMZG%2FBGCC1M2XDmEc1dDKptsPXaXMuiHrC9E68vn%2FRKopOcx2SmHM5591BN6Oi6%2FaPlgjX3%2Bse1Loh90OfM5Y7oU7hrOl3Z7MPSgc%2Fp6w0xzvd9N9WmGHhb2EDdmqlQRcdYs%2BHyaqfgHKWeWSPWCKtYSgB4GmBgjCAMsG5BHgWC7jNs6bfeYNILUEGocz9pwtOyLaNlCFMxXfdlocO9GKBfEFxmDCFMK9aXxSwSvGlDxR1hacD7urT9Nr%2BBapjDGa0SeoObXLywW8ZbDiy1jJ2RHl0n9q79caUtJp%2FLuBLrz%2BqtWUYZDxj1jr25bPA6TckFKzlY3ZW4k73umMq1%2F%2B2pJXiYJf1pAIE%2BSNqeuEe2jltcCcje8m8%2FsFYikYdYSH9%2BGYqtwFuQkf%2Bg6FPRHbFCN%2F9WGPEq4mP8Uk2H73o36ghobpZorcPFhdktq%2B6Ax%2BmorBfyovrGnPBNtxAayAy00iYMAcaC3PI0B3wp7aZfhoHD8BXP7YgTnbakSKCTh7OlcCLL8nP7mO6UuOA5oOV4Y3GHrlbT8Pch1k4BmE9N3qnwBbn2XUphTtoFok4bj4GiwwqPeszwY6pgFu9MlidNyylJIU%2F1JyDGZmxjC%2FDwlnO1bsOFWOy8aA9g4ZMiWIf4tQmUfdTIB8R2NpaXV5JkPcmiz21eqUBxwBXmT1lKJ8O5KqPA9e4GJsk3XEU%2BRJKkg6VEz7b1sNgiULW1DRCvXPdcZXyVFsGLf4wm7T8sK7dKQ5uVCcOMCVSSUUTT%2FwKkcRH6J4Mu8QIWa6mHOYNP41mAaOHb2B%2F5zxgWpk9aLh&X-Amz-Signature=bce95b577cb2826b5f5f58f5e401323ea088abe1537274f5371e42ccdd07a344&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3OVTFYN%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjMnEfTADN9vpCgVvFnF8dwJrhRGP%2BCjmgCiJO8eRFawIhAKLaQaEJ3DSDvkAllKJiBba6G9%2BpQOIIoqzBQiKyOglHKv8DCHsQABoMNjM3NDIzMTgzODA1IgwaaUe%2FMWGo1AbKjkYq3AP7mCj6iItClxCV3ZcTaNujyn3amhZ9WvhdMeXDki%2BbhCdVPxFMhj2Wgsl8QCFnoKiNXvDcvj26iNuE4DZH%2FEgI9ghN6f1vfPc%2BbraWKRymDdXcS%2BXeEJ9HCdLJ58guCFdyNbKHzANUrAG904TSzmRiCMRzbCHGY5HOHXdR3bPaKhfRnDImCNLbQn4cXS3EKi0uypBIyhJR9XTCj9wHYrlQV36lomiH4%2BxFLVMXpSC639uH9880dpdPNUlDkDVAqpG3ACxzBAHoxBLJgEraf%2Ff2MFB3Pmb0TtQfUkUNAqjHGwgLo4c6VWxFk1x63atk1rtb%2BJRoupFZz8X2WMmElGmEgIb3EnNF%2FidMuK62p0rCgfuB7jDLKfwOYALt4jDxg9kaNZuUUgCcix1bNGefpLbDlV1Q1CtSth6Dxwd7jApTV9YN%2BVylNWbvOn5glVBsVADpN4y1WyOFxK%2FTSx0UNK8a%2B4gZ%2Fhph4aZ%2F0Dqmyc9W96edLPctZ%2BxdY9gwv72NKoRu3OWZKTZrEL2QzU46RBEiPGQVKJONR507Ojb9U2hPTz%2BbbJJ6ubYkhggkzwjA78tD5gi%2BCFtUj7S6EEihF7QxkDxz0LGYvLw%2Fli0omt6bFwoAd9Mdr5dke%2F%2BegDDR96zPBjqkAfuWTHVACalEQYNMDnJ8Hgr%2BnjbHcUCwn2UhcAgDBzXSslt3G6m9zP1F4mcy%2BNEhItT44252%2FmHiwueb6OBadLrE33MABxxTxhZzHTnZlVxtVOSGcXtk0juclpW5Oeskg6oXtyQ6uT%2BMaAvPH34lElp7cyKwoAsV645bMS6ufRgZHIU6VPVjOG1Z1clObH3aeJX7IInhQ9L09%2FKzxYxja0pRxD9D&X-Amz-Signature=98d1b1f4aad401166506a5233a6823dfa269cc5da693d44ddd186522c000f99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3OVTFYN%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjMnEfTADN9vpCgVvFnF8dwJrhRGP%2BCjmgCiJO8eRFawIhAKLaQaEJ3DSDvkAllKJiBba6G9%2BpQOIIoqzBQiKyOglHKv8DCHsQABoMNjM3NDIzMTgzODA1IgwaaUe%2FMWGo1AbKjkYq3AP7mCj6iItClxCV3ZcTaNujyn3amhZ9WvhdMeXDki%2BbhCdVPxFMhj2Wgsl8QCFnoKiNXvDcvj26iNuE4DZH%2FEgI9ghN6f1vfPc%2BbraWKRymDdXcS%2BXeEJ9HCdLJ58guCFdyNbKHzANUrAG904TSzmRiCMRzbCHGY5HOHXdR3bPaKhfRnDImCNLbQn4cXS3EKi0uypBIyhJR9XTCj9wHYrlQV36lomiH4%2BxFLVMXpSC639uH9880dpdPNUlDkDVAqpG3ACxzBAHoxBLJgEraf%2Ff2MFB3Pmb0TtQfUkUNAqjHGwgLo4c6VWxFk1x63atk1rtb%2BJRoupFZz8X2WMmElGmEgIb3EnNF%2FidMuK62p0rCgfuB7jDLKfwOYALt4jDxg9kaNZuUUgCcix1bNGefpLbDlV1Q1CtSth6Dxwd7jApTV9YN%2BVylNWbvOn5glVBsVADpN4y1WyOFxK%2FTSx0UNK8a%2B4gZ%2Fhph4aZ%2F0Dqmyc9W96edLPctZ%2BxdY9gwv72NKoRu3OWZKTZrEL2QzU46RBEiPGQVKJONR507Ojb9U2hPTz%2BbbJJ6ubYkhggkzwjA78tD5gi%2BCFtUj7S6EEihF7QxkDxz0LGYvLw%2Fli0omt6bFwoAd9Mdr5dke%2F%2BegDDR96zPBjqkAfuWTHVACalEQYNMDnJ8Hgr%2BnjbHcUCwn2UhcAgDBzXSslt3G6m9zP1F4mcy%2BNEhItT44252%2FmHiwueb6OBadLrE33MABxxTxhZzHTnZlVxtVOSGcXtk0juclpW5Oeskg6oXtyQ6uT%2BMaAvPH34lElp7cyKwoAsV645bMS6ufRgZHIU6VPVjOG1Z1clObH3aeJX7IInhQ9L09%2FKzxYxja0pRxD9D&X-Amz-Signature=debe493da9bcf9759e24010890553d9a39ba50a18fdce58b7aabb874966f783f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665E4H36XL%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBVMRl87Xm9ZS3pNnZNCk3gx8iQOVdr1xGQEOJXPEESQAiALbV3ThUaFYbiA0Q6wy7gaof5Mp%2F7gEYcoVr9%2BqUSCESr%2FAwh7EAAaDDYzNzQyMzE4MzgwNSIMQJGgVJe1MGDtH0FPKtwDtvCj3ZCSe9CD%2B4qTCoRln8CfeiahLHVvCxgD25NG0vr9JIshRnODfXrB73gPK5usL5TUlM7AAev0hILO4BI47ArcVo4tCnxqJrNFhS26EiMeuNGkhJ0wezG1XX%2FifFm%2BMxQ43TKuriNcec%2FWyqGVfjeeBVVPIO3RjpfHF5Oi4Gf%2Bq92s2ORq%2BcTWlnhDsBqn%2FoJB0mXkN40DqCFF5Y0C2lKiqjycGYGQ0v%2BUZ6ID%2B%2FG3oXBIxOHYv19Ll4nxq6yFAkOhUQTzk8fXRqmFuBGfk6mVi0Dxq3s0sEuEWBhLglfZmHNwO3BfMx485zgC%2FJZ%2Bx4QTmPYktjCLL%2Fv68OqpA4CRz35bP1WOFE6Lg7aMoLEUEZFBh3dBbzSZAHCyFP16Qc6Rv7fpEakKKKK3dMzW4sg%2FiimVCLJRBYBm2mGyiAC7A6TUFQNKQXLGnBgRNMgssJpGdazhAW0qmUE%2BMeBhTQCaFQRH3LdXQvqCq7%2FjrrWQeXLTayXstdnOvtTQhQ2J6kqbDAgykG19Q%2Fx0zK98nehQQp2Up0FO1Ofszcc%2BduZ0ea8zcIk2NLLgWi7jFCc9SP7yjbvl7KQzkCiDdvWkZj1lkmFXkjJDmR063zfSMHihjUBkrbnI9ZajPSAwxPaszwY6pgEi5eqK69FMIqDNrIZXWNQ6lqll0LAdg5F0ByEBIvYQxJrdTVl2vUJ45ih9TOxKWQqUwrNjjiT2qCQDSf9ZBqUv6J0sn4nOGJiGgj5PnwB1qABTu3mmfSJNLymQ0rMA%2BSC99M9MVKnWfJUXTdxn8wws1shagblqnY8qqZmsnM7fJfkMnvBRhwTmUpUzxhvpcGqdU5Hn6JrZXd3D1MJgfXRuA%2B3kw9sb&X-Amz-Signature=9d3ce7b77744d9f3785bdc67bac8e3bd48cbb31b1bb861ab518c6641cb1ae839&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MON2VJ3%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGtxrsaCjnPVFLVW8yytYDO2uqwQ1rvCA664X4EspOcjAiAyyyoAeY5ktOKuUt5RzdJLBNoJtwpk9l9Ilf2glsNHACr%2FAwh7EAAaDDYzNzQyMzE4MzgwNSIMI7%2FtRTwxhj0Z9ILxKtwDvBghXDw6aPuiGrhGhsWVyVKFtNI2OpJvsripFoKEAQTEPrn2x3dagRj7AVuEaTFfZVBLyy0GDlLp53RXzjCgbR%2Bi74sZrTQZ4aier4t7Z2YGZvC14kluvHPHuEo%2FzwmMY0k34UwO%2BhmZrGKDFkMdlzEdnhpaAzLFkNUvyQTeIkiTfBpQndhYj%2F5MeMdEchHlkbMD4Js7MUsNGMx7IjlXBi9YnZhdh8Z5kCgs22dr0CIQsdMu6DUq76ewpfsqD8U2pUM%2FY6aom8q5DYmAPureluMnGeg4JNt3PrcBOa9gY%2F%2FANRaTBIM1ExO%2FXLb%2FhVkXsy1oLIR7USRn45mo5PYwXrkcZwIhg16tgF%2FF7RRJl6ywG6ym1flw%2FIhF7tYlY4DXPQCb754g5hneNnQ5XQ3l58z0pUZh9LadKfV3krQ0e2Tp5HOagRPWR8hXnu%2BiGKM2xUxpdW0gQpb1494mayAqSMb2Skr2BAaNj57NPEVO6glMpOPWhWJtNvf2DAoCcRuEPSJfX0Wrq1Yl2s0RQ8MI%2B%2FRlLm88kjIJR0hQ0aV%2FN%2BfOo1OilYZjOB45i5jWivOShSIOUtFxhKyKqCicEK1GMZqsgpdxBobGbuWsyoHe6B2IkFoM6DOJEKjS%2BCEwg%2FeszwY6pgFGtIBg8qamXJ%2BFsN2c%2F0uEHwAX4zaSLq%2BOpxKw%2BgmZ3%2F6bXnr30cq1FVzNKV2BqLFcNZh90Dut2lO7R0%2F1cAi7BXBwGG6tg3k44Ak5RdE62wh0jfv7GlGPHN5KLKXAPcmDE2j%2F4YWIqH8kMvSbdmYvGeMpNBzNcjhYMbJoHmk%2FHKMBdTFVzGeDIeFhqyzlEJuXBZbBiJ5GRn5jgqOgC963mi4dZbmO&X-Amz-Signature=d661aaf2646b41101ad65192c7f3c60cde04db2a4ec2939ffdc21bedafa31520&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MON2VJ3%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGtxrsaCjnPVFLVW8yytYDO2uqwQ1rvCA664X4EspOcjAiAyyyoAeY5ktOKuUt5RzdJLBNoJtwpk9l9Ilf2glsNHACr%2FAwh7EAAaDDYzNzQyMzE4MzgwNSIMI7%2FtRTwxhj0Z9ILxKtwDvBghXDw6aPuiGrhGhsWVyVKFtNI2OpJvsripFoKEAQTEPrn2x3dagRj7AVuEaTFfZVBLyy0GDlLp53RXzjCgbR%2Bi74sZrTQZ4aier4t7Z2YGZvC14kluvHPHuEo%2FzwmMY0k34UwO%2BhmZrGKDFkMdlzEdnhpaAzLFkNUvyQTeIkiTfBpQndhYj%2F5MeMdEchHlkbMD4Js7MUsNGMx7IjlXBi9YnZhdh8Z5kCgs22dr0CIQsdMu6DUq76ewpfsqD8U2pUM%2FY6aom8q5DYmAPureluMnGeg4JNt3PrcBOa9gY%2F%2FANRaTBIM1ExO%2FXLb%2FhVkXsy1oLIR7USRn45mo5PYwXrkcZwIhg16tgF%2FF7RRJl6ywG6ym1flw%2FIhF7tYlY4DXPQCb754g5hneNnQ5XQ3l58z0pUZh9LadKfV3krQ0e2Tp5HOagRPWR8hXnu%2BiGKM2xUxpdW0gQpb1494mayAqSMb2Skr2BAaNj57NPEVO6glMpOPWhWJtNvf2DAoCcRuEPSJfX0Wrq1Yl2s0RQ8MI%2B%2FRlLm88kjIJR0hQ0aV%2FN%2BfOo1OilYZjOB45i5jWivOShSIOUtFxhKyKqCicEK1GMZqsgpdxBobGbuWsyoHe6B2IkFoM6DOJEKjS%2BCEwg%2FeszwY6pgFGtIBg8qamXJ%2BFsN2c%2F0uEHwAX4zaSLq%2BOpxKw%2BgmZ3%2F6bXnr30cq1FVzNKV2BqLFcNZh90Dut2lO7R0%2F1cAi7BXBwGG6tg3k44Ak5RdE62wh0jfv7GlGPHN5KLKXAPcmDE2j%2F4YWIqH8kMvSbdmYvGeMpNBzNcjhYMbJoHmk%2FHKMBdTFVzGeDIeFhqyzlEJuXBZbBiJ5GRn5jgqOgC963mi4dZbmO&X-Amz-Signature=d661aaf2646b41101ad65192c7f3c60cde04db2a4ec2939ffdc21bedafa31520&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NIFFD2A%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T101234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGe%2FYYOh8JL484PONO8G8bvQZ2n8k7N573sBgG3g1AehAiEAqurpT82FetR4HXMC7X3u7OfiohS5EGOfUqqG4me7xKkq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDEeJlAwkip8EHyxpFCrcAxnHke6Qz2ITLkk95t7xWWSzoeDusdDFpEoRBUgKeAT8ui2CQff2Hz1u4Y9DH6AmexE%2BKS5MTWMTiTJUpujK95KhKuuimLSK2aVUUwC5XpS8T48or4koSg237enbtQFUbxgqz%2F99a0zGkrxtEDhiRaM%2BDWehiuK8WxOOOZYIfBTMgO%2FR6a2WBzw4GzKdQvVHd6pCW%2Bg%2BN3yIodnJkERhEqi3f%2Foc6AjtS1XEevrGOuq7243okAgmx0F7O5DTyT4MDua0zfMfAJZvtt2VOCGgEF%2FYpgQUjp4nAoB2KreZ8hIk1JGU1ryZR8PZKfMTJbaChDGRo2%2BlIR2SZ8TRiP32IclhZhALzWzzik9IJ3AOZg%2BIDjYK1vnujjKycxgolnygRCEnzB%2F9Iczp7pnoeGoXMhDsFOwJl4Ff7DpOeKgKObmo7FOM5SM8zC06W7iPu%2FwEOjgh47WcW0DCUDoEdYktA1FJQGRBFw56aMFBDTcF1S%2FrJsE8bNtZnnuyB1EqyMiWwkvZJP2gmWvSjQPVdjpotFBzytJ74uTnehC4yyCbdY1WnE6Yc52r9TuUjYZR2Rb3u9%2BzUQRvAUS6zWUzJUZpu26iMFsCzCJJyzBTKsMALdNd4ZJur9Xer9H1ZHwuMND3rM8GOqUBnJ613N%2BCRYbW8O0GtEuunbo0uUuSaPeab3WmuX8%2FyPLTQKVdHKZVKgUhg82BUkgSBsohuz1OC3AwI9nlAWdxld%2FbbYTgrYavJ%2B%2B0hHRFAYceE0tgtoNc11yv7bvHbzbmzmZn9DG53aj80E3xav8cfVX3R5I%2BFIb1CWfkYVS2vxPW9nLHQpKZVy4aBag2C0irqONS8ags9FAlJ5KkFuT3FDBX3hWd&X-Amz-Signature=b1641a3a547814a0ffd8e835eb2132f3797cc2020b9032dacfb9a4e4fa6a87d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

