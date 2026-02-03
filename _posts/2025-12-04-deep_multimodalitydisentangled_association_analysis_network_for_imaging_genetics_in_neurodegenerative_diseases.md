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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3JZ3D5C%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIGySIUxUOT5MxGntZ8EA1aKZshkhn9RPG9n8fq%2FrB8gLAiEAnBPxcAZWTFMJ8N1PTNsg%2FQBBrW3YumosUkaAHCAYnHsqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAQc97ijWZ%2BsSFstVyrcA2oudaXQgRaXe1nvf52qPTtBnMLLTLZ2V%2BcQn1rjqWawEeT96ycx3Li%2BXREJLFxR4uV3nIUJUb1hjf5ekcXap98sR%2Fp0e%2Fby7AFOfbYd0AkZ%2BwseRJYhkPKz79CEtdl5qELb2M7sWTp1rK%2FGuPUVBYopDAc92d5CKByGXXh8FAAKGmKFYc33QzaCyVXwiH0qYIENTLI4SKJ7%2F9yM4p7us1xKbNU1PUH9LuRQvT51yAEhhSrdudpiMndMt2pmfVZMYP8bjJOvcq%2BludtG51S3ngFpb1ZxuW26iNNlfgCr78YxTdyOPpXCgu0av8%2FKm9NxMLrUZ5Cpkx%2F9XNCbms3rZ1Nw65wESCa6UwERZLWwZC%2Be%2Bkut0OfscLAAFJOusvgUXEE6W1xZrd3bubM0v1k4TzPHKfNSlkap33tGyrPTtc%2FPjDy%2Bizcpc1WUaJe8WTF4uXbkBv5dknzoNM4GS6pNUtBFFxP30vYSXI49L5FfgV%2FUUPUsRHTA%2FvCKxGuDziJHMfGmTmP0IqELUBhLh1oIgkw4lJHxOY4kxPMUxtjsA9DzqLLmu%2B9gCn8vpObz1ChdU6QaLbl86tzW0iA0%2BUZ2ZHoup41D5cGimE9baOxT1bYCxUYPSgM09kz%2F6QMmMMHDhswGOqUBdKGA0J09y6tO3IMxgDUzisSAC4srWorm6DTiYdp%2BakNKPZp8ymnudpu613hmOgI%2FRONbHQlgQefS8SLPx%2BbE%2B5GONggOgS4RJTquWNLRcQqHwePfwtjMDtVzFZjqnRpbDqlfsqP5%2FiP%2BroJAYRnU%2BXXZwl1Njw0E4wejjNekkNDvBHdaX5LSkpbsLdlPNY5FZXW%2BujMTbNkYSfPiv6prk4%2F4q4CI&X-Amz-Signature=61967ab955971eda4de59c22e87f663ce67c911be588df793f9427e549c46e0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3JZ3D5C%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIGySIUxUOT5MxGntZ8EA1aKZshkhn9RPG9n8fq%2FrB8gLAiEAnBPxcAZWTFMJ8N1PTNsg%2FQBBrW3YumosUkaAHCAYnHsqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAQc97ijWZ%2BsSFstVyrcA2oudaXQgRaXe1nvf52qPTtBnMLLTLZ2V%2BcQn1rjqWawEeT96ycx3Li%2BXREJLFxR4uV3nIUJUb1hjf5ekcXap98sR%2Fp0e%2Fby7AFOfbYd0AkZ%2BwseRJYhkPKz79CEtdl5qELb2M7sWTp1rK%2FGuPUVBYopDAc92d5CKByGXXh8FAAKGmKFYc33QzaCyVXwiH0qYIENTLI4SKJ7%2F9yM4p7us1xKbNU1PUH9LuRQvT51yAEhhSrdudpiMndMt2pmfVZMYP8bjJOvcq%2BludtG51S3ngFpb1ZxuW26iNNlfgCr78YxTdyOPpXCgu0av8%2FKm9NxMLrUZ5Cpkx%2F9XNCbms3rZ1Nw65wESCa6UwERZLWwZC%2Be%2Bkut0OfscLAAFJOusvgUXEE6W1xZrd3bubM0v1k4TzPHKfNSlkap33tGyrPTtc%2FPjDy%2Bizcpc1WUaJe8WTF4uXbkBv5dknzoNM4GS6pNUtBFFxP30vYSXI49L5FfgV%2FUUPUsRHTA%2FvCKxGuDziJHMfGmTmP0IqELUBhLh1oIgkw4lJHxOY4kxPMUxtjsA9DzqLLmu%2B9gCn8vpObz1ChdU6QaLbl86tzW0iA0%2BUZ2ZHoup41D5cGimE9baOxT1bYCxUYPSgM09kz%2F6QMmMMHDhswGOqUBdKGA0J09y6tO3IMxgDUzisSAC4srWorm6DTiYdp%2BakNKPZp8ymnudpu613hmOgI%2FRONbHQlgQefS8SLPx%2BbE%2B5GONggOgS4RJTquWNLRcQqHwePfwtjMDtVzFZjqnRpbDqlfsqP5%2FiP%2BroJAYRnU%2BXXZwl1Njw0E4wejjNekkNDvBHdaX5LSkpbsLdlPNY5FZXW%2BujMTbNkYSfPiv6prk4%2F4q4CI&X-Amz-Signature=61967ab955971eda4de59c22e87f663ce67c911be588df793f9427e549c46e0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W74ACTF4%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCICsQ3Kk%2BCVXjx%2B6zQoFqpxaUQMIHnLXjdq8N6ARWWqFGAiAkZdBAKu8YVv6xg4u7n56BErqXYtXJAay%2B9vEkePbhiSqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2hBcdzFDoumN52rLKtwDwFws%2BCIC5iZBu%2FaRT2eM3WtffnpSi3B0jaQVLKvo43Ww43ChMwtPTQaVpRt%2FElnLiZNbugbcWz5wDBGSr6kwWRVxrt17Qq8PTT4k5HwbbQ0sc8dBB8m0AA75DrHVvtrhsSO3p3uSO0iZG1lQVDeGuuLTEO%2FbXiHMQhppUL%2BCUQHzbdCx3BE0tdpllGhCdRh%2FqCKkPiLGbUNoOG8fyUy9WmW7ZIXa2C9phRykuQLXwEDcLKM4whtgI2yp2%2BhXNpfC5DkZvIWQCNGjNa9B76AEq1OESiQvlQEa91FQ5jtzrGUGWmhhIgY0JBHJdYp%2BPCET9sYf54RvcWIesCYrH1YTRxRqlu%2F%2BDo9eipC6mWCPuzyDPQEiHwiHoRTT6sx89%2FVxfgBU0TraOceAX119NZrZoWJVWzaOkyB7W8EuM%2FiB8t3YplvccfKb%2BQlDrkU9pwHvtPPNQFjzUyd%2FE4Fob%2FvgYg6OsY7ugKP0DTnW4Xmfa%2BoCNgEgajddzPBfjeC2dNqx2c8hCgzEIUt0dTUBSE8B4tW0ET2IBzCWWPoXYsLXn6KNjfI%2FUgCqGG3GqIYDjrKj93iLJ%2Ba5xnGDngv0poKY9YkL9lj7lwG9MasUr7l320IozL8RYUSJO9tkhrswhMWGzAY6pgE7rtrQG7hIZ%2F8g6k9v3YGy6makGOVi1vrWGv76OtGYzIsWY1sKWe1GCytrheU8dqT%2FPqrIdZV57gXduMI%2BLdd3g2J11FbQGhDdKcDec6di289bIMrjPMgWmds0DarKO963qGDsotOGguVWG1fHPDHjCVGsH2Mq0FE2qRE6yhn1Jq5C6H%2BVjWasCZ%2BT1tgvQQVHUrj3KRPm2lZeGlguAtJMeBGk9gda&X-Amz-Signature=7293cb274eaf4516610bc3c1d8151e778870e5d0efe106af7eca0fe5d478cb59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665V2ARUZO%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCID3b5i5LNSY39LpatY6CmqFZCQ0Rsp%2FbGEJN%2FY4n44mYAiA0W42eNZc4BV9cva0m7gtpQZ4M%2F18VsOq%2B9441ISPnoSqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK2KXnm36d0nNdTHWKtwDkHBvnG2o5Qxvzo5WelPhb4SAwqRRVeNwDXPzghg2EZLrSmBGqCnGQjQ8RH6yTkkWiKr8pWM602q7PTbChiIia4%2B23EwnLLVk0SBcoIVpPUj8Ko811Pp2cLWROEAZtR6p4QJ8sHjaRXNOWMHSTtfkGW%2F7sOcrmUogbEIZG7%2Bze0Byx%2BDexkpbreydOuPSDoyGXhKarnLnOZh%2Bw%2FwNYHeSzTIZztfM4c6nIQwMuCM%2BnNT8THdgUA7aeigXEOBoqMcdgKBQzhfZwfXk9FJHDJUmhQLkIW%2B3M3MYubYWnGpb%2B%2FTBXoQrZl60%2B%2F659RQ1b3lbfZyiEYIOBE59kGiZ%2FZYZbmcEaAh8ST2HgcuSmWRGRI0IQY0VULit9bGxXroGDe0QrDPJTvr5uW8oCn1FcLX4%2BFPwUrjnsM1pEZ65CrISrdMf9%2BzwykDhEb8HENQZkTTH8KvjEOBbZibZJEkzqkd%2BgSv%2FSx063PZ5s6EqAHOhq8ZwMff0KqJ19BXOzoDiMfwJdLsO55c503t49sv32LtjEXy%2FNPDAu3FqvEsimvsJqbuJIdi6gcLTU6nedGTpkKGhlR32PWkoVcrmdre%2FPcu39eby3Bezw6oUKDdoYiwU9axkWPU0Wi9g53VyMZQwscOGzAY6pgF%2FSZKHPB5jQXbT61AAeMR3SaraJa2TA8%2BRVPKbnFfNElHp88uGxbiLccEBs%2B1tiZiVjkA0wwK4cLvuY90DTma6SyJa068VwiaE5mBzpb0XF72vCw0xeIs%2BRQDbAESjJS%2Bs%2BAMnL334vK9C0lyxrn8NxyMMKg6CbloKhZPF38XGRrYIqgTLo0EuO9xntgL8a7iIc%2FDTiHdFa7t%2FQe3bs1zTsC%2BTdfQa&X-Amz-Signature=d986beeddab6c586c0894551a45ed34cba83fef25c126613acd4eeca1c636c75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665V2ARUZO%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCID3b5i5LNSY39LpatY6CmqFZCQ0Rsp%2FbGEJN%2FY4n44mYAiA0W42eNZc4BV9cva0m7gtpQZ4M%2F18VsOq%2B9441ISPnoSqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK2KXnm36d0nNdTHWKtwDkHBvnG2o5Qxvzo5WelPhb4SAwqRRVeNwDXPzghg2EZLrSmBGqCnGQjQ8RH6yTkkWiKr8pWM602q7PTbChiIia4%2B23EwnLLVk0SBcoIVpPUj8Ko811Pp2cLWROEAZtR6p4QJ8sHjaRXNOWMHSTtfkGW%2F7sOcrmUogbEIZG7%2Bze0Byx%2BDexkpbreydOuPSDoyGXhKarnLnOZh%2Bw%2FwNYHeSzTIZztfM4c6nIQwMuCM%2BnNT8THdgUA7aeigXEOBoqMcdgKBQzhfZwfXk9FJHDJUmhQLkIW%2B3M3MYubYWnGpb%2B%2FTBXoQrZl60%2B%2F659RQ1b3lbfZyiEYIOBE59kGiZ%2FZYZbmcEaAh8ST2HgcuSmWRGRI0IQY0VULit9bGxXroGDe0QrDPJTvr5uW8oCn1FcLX4%2BFPwUrjnsM1pEZ65CrISrdMf9%2BzwykDhEb8HENQZkTTH8KvjEOBbZibZJEkzqkd%2BgSv%2FSx063PZ5s6EqAHOhq8ZwMff0KqJ19BXOzoDiMfwJdLsO55c503t49sv32LtjEXy%2FNPDAu3FqvEsimvsJqbuJIdi6gcLTU6nedGTpkKGhlR32PWkoVcrmdre%2FPcu39eby3Bezw6oUKDdoYiwU9axkWPU0Wi9g53VyMZQwscOGzAY6pgF%2FSZKHPB5jQXbT61AAeMR3SaraJa2TA8%2BRVPKbnFfNElHp88uGxbiLccEBs%2B1tiZiVjkA0wwK4cLvuY90DTma6SyJa068VwiaE5mBzpb0XF72vCw0xeIs%2BRQDbAESjJS%2Bs%2BAMnL334vK9C0lyxrn8NxyMMKg6CbloKhZPF38XGRrYIqgTLo0EuO9xntgL8a7iIc%2FDTiHdFa7t%2FQe3bs1zTsC%2BTdfQa&X-Amz-Signature=4b3e5d95146330e4bdefe0fa6ea4b2032bc9bda94ebd55d275584aa56e6c0253&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJP2MCQC%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIEP6v5OeSfll%2FDWwu4KEeyaD3KUM0AdIdayyUiNlB0DvAiEA%2FUyap3mGtkgEWUVAFzAKMzD9HyzVoUX7UcUVMoKiEVkqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEibl0ZnL2XJ3wZ%2B9yrcA3XgALwcELLclflNl46m5v0rV0dQRBKF6Nf%2BX%2FVvXeQ%2BgQSv5lckuD5XAY1vPTOWjoPHnlzV9eWRvNbO%2BHKmsPAFldoWrHrdBzsg8CsBO4vZhS9p5osCxgGekqhEc3LnlEr2rbu8eyd9Y8M5RC2o5xolmHPaYofpUcB0xN0ssJQkle8NzWuFTE2l0SeoNqpB83hpvqYj0HXTr2f1fyp9RtZp8b47xleIq8lqYYYUfQhE98EjvknDhXj3G1AJm1R9kisMAANO3vLgEyXSKvutZdtR4dn5r%2BSKgnEO2DANLNJAN7mpMjA2qU7G2Q88uhRlbPvcrmJEx49v9f1dFKkwCDkb5KkGO%2BUUtpbQYHICxwyZIB5Pod53VKFkbvNfYHl4bWZqYmoDmxKv4Uvtrc9IodRzpmdFpo2R4rDMpAPEoaC%2BmjNSUr4LanCbr%2B1v45OI%2BkyvF8DBS9IjFc6bRMKLIpa%2F%2FmxpzJgqKHFj8bhFVNuTiCymJFwEypyyOkWLIN33CyBZtx4lAFRCbtkK5MRPiiyq3hcGhUmIv8DlMy7b6RZafrg9kBliOMUg368B8aWmC02Hn70aX53BrL1ZIWant67Vxlk3cS4IB0wM2gDokFEQlJ%2F9JlFlcLHrCnyfMOnDhswGOqUBCPuZMJA4I5nMp%2F9g8rZTyl5SEi2ECSqk5G1W3pdQ1E%2B%2BrS%2FbUWpEN9fy7qERrtz%2BLzQbc9mzMo2ETPgdkU5YcG05F5spTsF%2FsTN4qPuRIBROIqkw%2FUb%2B9DOE9y1qnZNI4wGQA50SlyaEAW1%2BZNzimMpa3Gs9AJU0UaQCQDXmsaKxXpTFZSZh07ttClt4iytDCs9wZeRsTtHtPLUXABec6os0LHiT&X-Amz-Signature=37cf02ce873be19e9b7862e36e813fbff8ff30d59d0dd85fc631a425f54961a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTVXL2GG%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQDwltSNyKGbSZ3SUUoHrAaSh1eN%2FmwLmd%2BDgurqRHe4zgIgd8%2BdoK03JW5PkcFdV3ROblTV3RX10ZcBqmUGmYujxXgqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHtMXUkAYZ%2B7VuntuSrcAxP0vQlzQuGmDaRpzq7cEL47mOs8FfdXfn95bZ6yi24QUjH%2BdZerHskq%2BcYDDd3%2BAMCULI%2FO5kr5xzJ8JVRhii6oGNyTkSCXfRouvRBCLmE1F6uy8wd7dmPWMUM4Y3dgW9bDcqHp9lTEX%2FWX4GJIX2AnqI288hwbL%2BSCYXYTYrwWG5TgXHeZXSEWTkqZ%2BPWYVkkeYM6jlzDJPqzCScz9XWJSrzX%2BAxjGHwqRJd4R6y6S1BZfrn6JiB6MKDuk7YdNLHGVFyg3ehG93PG19GF%2BDSBNJHvE35CdFTBqBU2cEM3tQIl%2B0N%2BSDwY0sSEckD%2FmeIDRP11b7co9zP5vKoKYViPJakDA%2BRdCIQ84qOA0J%2Ft2iQ0fjHrELy03S1IlnlITupcgSg2UIi2Ov3L6pPXH%2BX%2F6aViEczCztImsrg3Wc8WQV4V40Jd6SR4%2BBjFd2qxNtiUrA4QcCPmsOd3jQ1Qivxuw7THddkGe9Op1lBKf%2Fo971EYHFgwfoV7KKhi4wgxAIHxfbfWCW5AGmnUyqsWeF3xkVml%2BCp1Nr90llf4z822Gjkr4%2FJJCx5Ldr7w3sMkMldqXI5MWty7Hqwg2Bekp%2FWek5LPQF0seM%2Bq%2B7anRrH1Hj%2FMWq3EgdVcEJiEIMN%2FDhswGOqUBCp2G1s2uxSWvopZ0%2FFdOQL%2Fm62KpLB6rnxzG0ovHwJquQHc7yUiwROOjMIyoaQbjy%2FYDFJNVm14ThXR0lviYNPnAJSWRG%2Bc4XS2hKIlnyAxKXnjw%2BPX6ewKCwrcFi1cVB6p3dLK1SJ2WSIQaFVrxI2XimPKNSqHav4306Uub1YA3tSz3orT98mffLhWcLjhtkX39xmeyOPlP3c9MQ6Cs69Wa%2F7fr&X-Amz-Signature=4c79cfbeea792c567817c35346e92ab3bea1d890877153c09addf19c345c72f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNJCG5X7%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQCRfdjUQe65J04N0thrz0uY1GD4S1vndRhZjTMVqWF2NQIgMravedBGzwsqv9KK5xZBwVQugxf64UlKbqhklkx3xvAqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPhkn%2FAkzKwATXepsCrcAzKVuRVlvfA9rfp%2BKTB0JP%2BZOLDloOxwPeTEdN1WNukhuA4LF%2FGR1OuAj8vRFimOXJbl8%2FzOSHZO8rpXLJI8LSbptQgzHC14hr3yTDg1tr6XnIN4WwYssj6SNEY%2BKNYfbE2JJxumRRw6Y8Pi12ik%2FSgcNxnGfO%2BvIlONA2JI5wKNQB2q6P%2BIZTPJN80NcByVVl27NcpxyhlUEmppJMVfdbFaety5Dnl3YIznbBKyTlpElYojaDsGWkJ0%2Bo%2FpMV%2FEpFXP9M2wrCYbveHTddOrC9bukBMMQV27Mb9kegXSPZJHUEaKLe15dzboVyGnfIoTXfVMPJw3xGZeAI9eG3bO96vA4klcFgfSHLh89%2BaJAvtsEsiI7IKzXOnbhahNQLHw4gBs1KPu2EjUIrJXyJ4KA4DP7q0fYJQ%2Fnc9D4u5AiX%2Flere4Zmhz%2FaOLhnpzB%2Fm232spp4TiN4rLhp7dj8Our9sLRyxIe33BV5HlH3NNOQVoVuoX%2FUgXsaRq3qEriwbPHcuWj8MPppAwX2EhvMduDSilZV%2B9Bo4vKbzmUAmkMX%2BRE0acX1dB67udld3Q6sNyIcxcEil06B3mLQKp5dQ5AYRWnNye%2B8i4aKipkX7SGVHUkXLoRoxNRjVVjQyNMIPFhswGOqUBeZm5eYrs4Ve8LnbM%2BD46MlRMyud3L2oi8nos3fu%2FagYOOv4tz8i7uKj0WN%2B6ED%2F7sUNWm1MB9E7TE%2F0PzQ5bB7yRhEgFQZ77OwWWQQSIAl3%2Fcnr5aZsPKc68GGRxI%2FqPGAaWXRmuG4O5qi8SOvtbcj4dfhTS2OYJVnMKXq8YEbltMsh%2B%2Fc3rxBWadxJ8KWWE5AMCMGTE%2BWFRKyFpB9dlZi%2B1HgNO&X-Amz-Signature=c978a7f3adc01356573a57a49db3e71e4159f3f5b58b79808b530a375e2e0a7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYFP5MCN%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQCyP8EZhq%2BNsR51K8uAMLIg1RFoU4Rd13eVdYuEMnpPxAIhAN4qSZ3Om60EoTRp2pTyVp31faPhWHv2VurJkaSHHMcBKogECPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw4Dow7RiUqOKB0540q3AOLkRzA7bfOgIx2lucJR0y%2BuHIvYzydEpyeWOzVGX1%2FYKJneU5zF7P85sIwkNs6ITUJCjPDeoXJ2rsCwvmG4J6xLQnS8IDcSVY1MicQIrX%2FpjVjWEHRbiZWLvDDlJdNdU8JcGqZ4x2osHXrYtBzji1U71Fl4UEbzrpODpdMaNOt%2FOY5O8qBzpOGYqTrhmrv7RMbDCymkj93KHJ41Kt6S8vy5%2FOEVe0shTKKpdyTRJlpCo3LOap55R9LfKieTJQWRkv%2FWH4UTAjkwriyZxmbxVSQ7ykglFmnb4PfMOgthhRFfTrVoebU1ofiM0qgFtrvpiMd21eaNh6JSBAWGn%2BLSUrxMHC5nraVy%2Fb7uiOh8xOfQY68CP31%2BiqWklsb%2B8QcA7ep2gsDaEdmmHOa4mCqfBSgTsnsHH%2FGHvhGb6ItNf8fvV%2FwMHi7vkZFUPEV6inrkwMvDkVV3tuv05jREdbSeYUdwEXsK7oky1wKdur0UukF1Hj2EZQ1KmyKp5ve9UnXCvmyoaarqT5dhOnUEJRufMwh0b3Qi1xp84ZwYJC%2FOTd3geDx9e9YIMkM9XkJ%2BYBRQaaA1Xs4YNwPNBHJ2HdaLw5ChFNAeLSMuXb9H2TH7ZzmDjcUXGIjlAw6qbOXnDD8w4bMBjqkAXOfSrkLBvkODaQjqD9CTU7gxbbJ0K3b3YD7n%2F%2Bj4ght%2FBClCL%2BXDcHThQSU6uwlJky%2Be2lNsOwIsdtHjdFQ0MCNgurr1Q3Dx4Mq82ua7ioY5KmcQYCE0WqDUbmfSG%2FCIz8Md%2B%2FwgeROatGwS7QdyHygJHu2rdtja5jArOXJlhbeysv%2Bu%2BJXexzMtMYGl3DdmHZBU1WHkjqCwt%2FlFHLKGIRx2mJe&X-Amz-Signature=ccfb3194d8794b3fa335a56ae31dbc4e9baa9e991d2ae1ba7c5f959e9d91f6ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYFP5MCN%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQCyP8EZhq%2BNsR51K8uAMLIg1RFoU4Rd13eVdYuEMnpPxAIhAN4qSZ3Om60EoTRp2pTyVp31faPhWHv2VurJkaSHHMcBKogECPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw4Dow7RiUqOKB0540q3AOLkRzA7bfOgIx2lucJR0y%2BuHIvYzydEpyeWOzVGX1%2FYKJneU5zF7P85sIwkNs6ITUJCjPDeoXJ2rsCwvmG4J6xLQnS8IDcSVY1MicQIrX%2FpjVjWEHRbiZWLvDDlJdNdU8JcGqZ4x2osHXrYtBzji1U71Fl4UEbzrpODpdMaNOt%2FOY5O8qBzpOGYqTrhmrv7RMbDCymkj93KHJ41Kt6S8vy5%2FOEVe0shTKKpdyTRJlpCo3LOap55R9LfKieTJQWRkv%2FWH4UTAjkwriyZxmbxVSQ7ykglFmnb4PfMOgthhRFfTrVoebU1ofiM0qgFtrvpiMd21eaNh6JSBAWGn%2BLSUrxMHC5nraVy%2Fb7uiOh8xOfQY68CP31%2BiqWklsb%2B8QcA7ep2gsDaEdmmHOa4mCqfBSgTsnsHH%2FGHvhGb6ItNf8fvV%2FwMHi7vkZFUPEV6inrkwMvDkVV3tuv05jREdbSeYUdwEXsK7oky1wKdur0UukF1Hj2EZQ1KmyKp5ve9UnXCvmyoaarqT5dhOnUEJRufMwh0b3Qi1xp84ZwYJC%2FOTd3geDx9e9YIMkM9XkJ%2BYBRQaaA1Xs4YNwPNBHJ2HdaLw5ChFNAeLSMuXb9H2TH7ZzmDjcUXGIjlAw6qbOXnDD8w4bMBjqkAXOfSrkLBvkODaQjqD9CTU7gxbbJ0K3b3YD7n%2F%2Bj4ght%2FBClCL%2BXDcHThQSU6uwlJky%2Be2lNsOwIsdtHjdFQ0MCNgurr1Q3Dx4Mq82ua7ioY5KmcQYCE0WqDUbmfSG%2FCIz8Md%2B%2FwgeROatGwS7QdyHygJHu2rdtja5jArOXJlhbeysv%2Bu%2BJXexzMtMYGl3DdmHZBU1WHkjqCwt%2FlFHLKGIRx2mJe&X-Amz-Signature=85a25d2e7ac82e03120ffa4cf8cf31a6836267f46a63cb708f7f7e5d6c0510df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKVVBOU4%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIDQteB7QZ%2FErC3BzVQmQprrJnN30tlnXAHfCa5fDoO78AiEA%2BWXUzKLzk%2BZqUtzo8U%2Bg4KhSSfXGCg4FApQWpE8lijYqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBnzkBwZXTVH7pOskircA6GOYKlcKTjHr6wjDFjxckQCJ%2BheWpEkQFj1rf2FXPwDhhO3amXWYbfa5CTWZz8i6d%2FLazPgyxBB8gUqRLaxk4P%2Flv1sPLX2OcWWC0yGr0SbnnOb86Hym6OwXRjCdlR6QZBieD6sh9PfpjAwLFy9ahbRFvgdToTY2zSGJU2WtRzFrXX1ihK34zXoRN4Ct8AZ8qrtM5086gaodlAkk38whxiOoPi%2ByxOyk5Vi1uU2CcBjBFMn6qGwBmQE%2FteKWpYdfVcfboYDC8x2VIF8BYknz%2B%2Bc55Yv0xXKbq2WPRYLw1RVF6SbrNVENKtdQ5NOLh7NhAgjcxcExwuJOR03O4irEiQu%2Fjmg2YTacDwCy8vs1xhGbBAFCwtYSys9y%2F%2B%2B5kSFUt9KSDoVSP6S4aoTUSEvkF8H3lRm4gxdtqKqGyZExu4W4tZu66Etkh8MVTWlxCZM2gxY7DQrHx%2BH6XQk83csS9%2FLcoZkyS3cO1Wf87668xPeOj%2BG4H54wVCZjftfS9R6fmTC8riTXSgFHeqVt%2FL%2BAv2ph%2FLSo2HQrjT%2FqwCt%2BuRxC3HCUuPgyvl9DcSt3p7SHrLveWGt7hjs0G1mquothpBesXqK6%2BSfekCfQjpVsM1X5SMPt8kaxLS87A4%2FMPrEhswGOqUBLeMNHKp1uG0jFFkHsiDZrSiHw7RBUk0dYWSgxLZda4IuL9ZGTAnVuOb1Y6e4XR1sUCSDl%2BGZoRny8zwHHTAPLbVNYqdVC1xa8vFdW8n0go8gJuysOSr7EJXxn4%2FUitSrGkFGsdwD32JufZQQwlx9g4o1sDMBOsZ86kP2Vk17BlG4M%2FS8P5c7hooF0LVhpAvivWf%2BdxP7jP0rwzPe7MaE29uf4WWZ&X-Amz-Signature=0c7c7c2cdd16bb2764b6f9bda83229b90961c2395bd9f3ddd3d9ed1b484019b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVHDZELK%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIFHFL7jKglO4pUqvCLh5n2hX8z31h6HejSLkm6IqEGxaAiBkofa5BjfEkn%2FzTBo7fzCrgVyF71nsACAFMLkmSp7wLiqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMiGPcfd5j4jurcY1MKtwDIGH7sZpozDxfw%2BBIVVEecLOoTfqdyj5%2FQL2%2FTYxEjbT%2BlwLnLumH4AAFf3t%2ButdcxHHXCo%2B%2BJ0c6qKbiAg3kn%2Fwz8E%2B1T0cKVI%2B7U3j3iIYcAHR47f%2Bhpcbv2s4TdvDZme5WSTNramTsgwV5X8wiz4J35wGSZUwRhjpnokBYTJlu8PzLHR4k%2FueB2X8fHoJT%2Bb6QZ26tHw9P7VZRYGIKCtIWdEK%2BwGklpRTYnKoycemGKtJdqlxl8o1ECNVDK31cZm9XJN%2FHrSq3h9X%2F15YTaK8syxZJG1X9MwzkSLBhPpPneQMsqs62R4pwiKAnWetTENUJ8HxPUjfbjNFRkIy%2BrC5dLxHfT0OS1UoDmdyS7br0rHbx6YRfGr4vDzYgIGR4J1Vq%2BclgJEytZaIh7Dx3VmisIErK7%2Fe0oe21AwZG19J6H5GtajCG1nuZPFGFScBPJoQinRy%2FRlaLwCP3Q07haOI50akyPes1PUnk4wplZ80limX1yQgROyZIkkMRGii%2B%2FD8vhfPpqi7SlJSKZiqbhbbTOPMc%2BpNaVVuOISWdl3viTyu32WLR8tg0rHznpE6z7a%2BFeJ%2FjstWFNBLdlZpHKva1FLfaHinKDU1cefEXnIee39EsEvj29FCCruIw%2BsOGzAY6pgHSBhzg0InBT3V%2BWkobU%2FYT1nD9CIauq0tLlETar3cXayu74sId9l3Y%2B6qkN2FaeyuQeDlYyIasvlF%2FlJB5qQwyEqhVU6O21LtqQjUpcyyKZBwgT6wIuG%2BIXwW1jI5d7fevYWJ7QQAtFzCyiBhPl3Ho%2FIx1H0rw6fWlnDpyPKiTtDFklF4qdBivqM85obShpnIAPh4F4wRSPUjnv1ODNXP0bbREih3z&X-Amz-Signature=5c2acc0e5b3339e2db67a8f0fdbcf8329f25c6cd56cc27853411103d13631886&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVHDZELK%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIFHFL7jKglO4pUqvCLh5n2hX8z31h6HejSLkm6IqEGxaAiBkofa5BjfEkn%2FzTBo7fzCrgVyF71nsACAFMLkmSp7wLiqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMiGPcfd5j4jurcY1MKtwDIGH7sZpozDxfw%2BBIVVEecLOoTfqdyj5%2FQL2%2FTYxEjbT%2BlwLnLumH4AAFf3t%2ButdcxHHXCo%2B%2BJ0c6qKbiAg3kn%2Fwz8E%2B1T0cKVI%2B7U3j3iIYcAHR47f%2Bhpcbv2s4TdvDZme5WSTNramTsgwV5X8wiz4J35wGSZUwRhjpnokBYTJlu8PzLHR4k%2FueB2X8fHoJT%2Bb6QZ26tHw9P7VZRYGIKCtIWdEK%2BwGklpRTYnKoycemGKtJdqlxl8o1ECNVDK31cZm9XJN%2FHrSq3h9X%2F15YTaK8syxZJG1X9MwzkSLBhPpPneQMsqs62R4pwiKAnWetTENUJ8HxPUjfbjNFRkIy%2BrC5dLxHfT0OS1UoDmdyS7br0rHbx6YRfGr4vDzYgIGR4J1Vq%2BclgJEytZaIh7Dx3VmisIErK7%2Fe0oe21AwZG19J6H5GtajCG1nuZPFGFScBPJoQinRy%2FRlaLwCP3Q07haOI50akyPes1PUnk4wplZ80limX1yQgROyZIkkMRGii%2B%2FD8vhfPpqi7SlJSKZiqbhbbTOPMc%2BpNaVVuOISWdl3viTyu32WLR8tg0rHznpE6z7a%2BFeJ%2FjstWFNBLdlZpHKva1FLfaHinKDU1cefEXnIee39EsEvj29FCCruIw%2BsOGzAY6pgHSBhzg0InBT3V%2BWkobU%2FYT1nD9CIauq0tLlETar3cXayu74sId9l3Y%2B6qkN2FaeyuQeDlYyIasvlF%2FlJB5qQwyEqhVU6O21LtqQjUpcyyKZBwgT6wIuG%2BIXwW1jI5d7fevYWJ7QQAtFzCyiBhPl3Ho%2FIx1H0rw6fWlnDpyPKiTtDFklF4qdBivqM85obShpnIAPh4F4wRSPUjnv1ODNXP0bbREih3z&X-Amz-Signature=5c2acc0e5b3339e2db67a8f0fdbcf8329f25c6cd56cc27853411103d13631886&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SV5SJESV%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T082253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQCD5op8ZmNq2ZCF84Meltux4VKiRiPgT31wMSTtKVNbfQIhANc2szQbEOxCeGPJ91o7W2M0zTVK4LZKJy5JZs0DizZgKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzcZpluSyUn7qXHkeAq3AMkWv1sROl0XrV1vZFSU4sp1QRr84E%2B8Wu%2F%2FAAqYzPG8KOhPI0mtJ%2FyhIyr7N62YN9ZGcbJsxYbJqecO3Yn1eM%2Bc0jNzDoWCH5eFCM8G7sg7g1uOl6Sf4YZi0vFbugUq5W9o3b1C%2FsICXSsmChKjsX%2FQ%2BM%2BJB5n%2FS2s7Vg5N3ft2nZKcchy7rhYCsTHdD2fdIEJsovww69e3nAMhac9UPnOa37uhg7wDrXGHNRtI3H6ILO9tQL1v6jfzE7bfHaF5baHuW8I7sQ%2BTtx2xJxhorgGNbVtauizyEUd84PCzhyaSRUT6tc74REsKdDQPmltXn%2Bf3uzBG5fKp8dAOqDVaEacOXaPTXdCLx16wZ3zjUTWdD6k0b005MPbTy1Bs8IGDRjzrQhUObKer8Cub%2BeQEFc3VWm9odq7kmZ66c1pPItZ4w2k7zMNvrT%2BR1BZMyBWI%2F%2B8eP7Ddx%2FaOh2tDb7zFq2y66qbmvfxteAcg7xdKq2yLZX8tAx%2Fh6N1O2cAsdjlzfLHTYwrj4eaVo%2BF2OY%2Foct07H%2F1TWQdjNq3Vl4QBxG9EZwkU%2Fcoyur%2Fnru4%2Fd4Asoje%2FZgRrDoiG2zjckpNrG7X2UJDnxJjLVxSohCyolAbb0n0GNyCL0aExn4rwzCSxYbMBjqkAYgcExFPt1yR2Bb%2FbXpaUJmxxYyxYccHHEgebjjoTp2xEO0eCF6urp9s8NM%2BAqzCb9V6ITzlleA9nnXgrYKfATE93fNDekMCNVQdPkhJu%2F65NszqiPJYNDq%2BYmTH8KjKGhSBAVxuY6qUMjO5Qo3l1ifpywGRttvIp%2B4NIUeNYYIlf9IdZoKqpGFS0c9bUoSaoRcp2S1bMqyHdR%2FcQQNHS0kKDv7H&X-Amz-Signature=e02218ffe0978366326eb4ba70c4b1d34771d9f2e57be94d99f7950ac39bdd7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

