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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EQTMWU5%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIFi7%2BCPbBjghCs9YOurkgaQAylqLRduLklgD4QaA%2BUZNAiBZ%2BdeyzoaamBjGImaEg8aga%2BZiTHikHvHHiZu9nlm%2BKyr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMoxLbOuxPm7ShwGLmKtwDWBg5U3Ts1EB%2Bv1nB30BOUf8N2o5RTEEVFfLEL1YdbQ5T%2BvTIMGB3%2BmDVMU7DdsF7HfpL9bR0WLAcOWjN3b%2FIv93BiBj%2BrmmVvYOVjhYhc6nZBJFlmOAp4tMpQlNEMMy2QwArO0VN2NewBCQaExCZsCJUy9hymp%2FFsdzfnpRPLMNFiYfdAXCsnFg4cL8S8V4JhVU9p9bYu9P%2BWjiU7VUAmFMLq1J1oY1E9J8jib3yQZd5QPnafXOUKjxCX5KcUpCgLgZ1TVKdckL18zCGThZUsZqylCxr7KQJ2S3rlbBfhv3C1YUxsW9UtGgXiSGOyXJVrfv7eEpr7o0gKZPq2B3t5HzWnm5iq5vXj6%2BiaoeaZ%2BOasldOIOh0dztv%2FCyHMYst0bnc0D5TkWj75Ev2QSunOgTZubZQlTg3V252oWANB7f8P99LaouJ2tHASHp8CR5Xqw1lvRTCd%2FxT4YyGiyWBoPAiMahTF6u14RMEJpPIl5E0amX1chBDobQ%2FYhz53E8bdZm2s9pZep5Ui1K2zhhOKv9P%2BWTgW54zBOfR4PIzxQZkMu%2BvWcb5C%2BJ8BxGw%2FkJs0lq0dP9yxbaZeRdAcZ0GAakeSvKmH6x9w1i%2FUiSo6hDlaQSTKUz8aMtR32gwnuahywY6pgFVb8nGoz5ogYyptme9EcTUAwFydvLbaW2MPmxeQeRvizxRB7es2TtlmPRZMIN26GMhPHDQ0F0WhtUEmTDv3RHoRfRVgXueVl91v9S5OtxnYL2mQsfF0EeAwrW4%2B5Te4uxXqu73uK09z23ZyL7SemQcIgUE3sWkc8tTIYtB2Bfn%2BFkJi0xzKz05GnDzZxR6Yho3k%2B5%2B%2FUNOWGM%2F64MSyjo28xhnohz3&X-Amz-Signature=11bc0a8fa1d6951306f86bc016251631709c2127c18ab086dfd8d7665af7d0a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EQTMWU5%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIFi7%2BCPbBjghCs9YOurkgaQAylqLRduLklgD4QaA%2BUZNAiBZ%2BdeyzoaamBjGImaEg8aga%2BZiTHikHvHHiZu9nlm%2BKyr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMoxLbOuxPm7ShwGLmKtwDWBg5U3Ts1EB%2Bv1nB30BOUf8N2o5RTEEVFfLEL1YdbQ5T%2BvTIMGB3%2BmDVMU7DdsF7HfpL9bR0WLAcOWjN3b%2FIv93BiBj%2BrmmVvYOVjhYhc6nZBJFlmOAp4tMpQlNEMMy2QwArO0VN2NewBCQaExCZsCJUy9hymp%2FFsdzfnpRPLMNFiYfdAXCsnFg4cL8S8V4JhVU9p9bYu9P%2BWjiU7VUAmFMLq1J1oY1E9J8jib3yQZd5QPnafXOUKjxCX5KcUpCgLgZ1TVKdckL18zCGThZUsZqylCxr7KQJ2S3rlbBfhv3C1YUxsW9UtGgXiSGOyXJVrfv7eEpr7o0gKZPq2B3t5HzWnm5iq5vXj6%2BiaoeaZ%2BOasldOIOh0dztv%2FCyHMYst0bnc0D5TkWj75Ev2QSunOgTZubZQlTg3V252oWANB7f8P99LaouJ2tHASHp8CR5Xqw1lvRTCd%2FxT4YyGiyWBoPAiMahTF6u14RMEJpPIl5E0amX1chBDobQ%2FYhz53E8bdZm2s9pZep5Ui1K2zhhOKv9P%2BWTgW54zBOfR4PIzxQZkMu%2BvWcb5C%2BJ8BxGw%2FkJs0lq0dP9yxbaZeRdAcZ0GAakeSvKmH6x9w1i%2FUiSo6hDlaQSTKUz8aMtR32gwnuahywY6pgFVb8nGoz5ogYyptme9EcTUAwFydvLbaW2MPmxeQeRvizxRB7es2TtlmPRZMIN26GMhPHDQ0F0WhtUEmTDv3RHoRfRVgXueVl91v9S5OtxnYL2mQsfF0EeAwrW4%2B5Te4uxXqu73uK09z23ZyL7SemQcIgUE3sWkc8tTIYtB2Bfn%2BFkJi0xzKz05GnDzZxR6Yho3k%2B5%2B%2FUNOWGM%2F64MSyjo28xhnohz3&X-Amz-Signature=11bc0a8fa1d6951306f86bc016251631709c2127c18ab086dfd8d7665af7d0a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GYXNVBE%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQDfmFnLdPbe2LlxsHrvvuHgamEQIdKiA4Lsn54Krv17DAIgSK5J6vOfFLpy9r2wAeY%2BcQq2Xg%2FkRXpPwBfsnu8Qnu8q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDIfbcyQJl3y3egYJyircA47ULx63vceBEgbEcDBRMfvc%2BES8AfgXGLd2sISQ5VGogSOoffNQ9Ax6sN%2BedD2UFZnjYystwUbryEJQ71Q6eqvGE4rT5phKxSLDEsbjnycdtqudlfZZb3bgtTGK7GwkZOtCdIzUm2IJqUVU9Fcjbe5UO150BdEb2JrDw2u7fwDRFACToLJFFOsur%2FOkM44csqx2b4HAmpXx%2FD%2BWPuU3m78LuJA7alNTLsi9L%2BL1meABjnBkmDsaIBQsG9fS1ELQ7YtbyR9%2FPDVAdf9hOuEIQtLPgd%2FTu34jMxTzkL2%2ByOqP5TOr85jugZh9MARpSN2Jffa1k%2Bh9d4sjWDZ0no7RnlINABVtBDtoGViRN0Ik%2BwDh0Gc4brqcSlZqSWY6wWSZdIQEFrni8N0%2BhyZT80xjs8HLYAmfHpLHhohgLdxj28cRQoP%2BepvGS3Rz2mGYdCUoS6PjnagfS84uKp2kC2zi7l9ZtAuk9LPUPZGYyCJpvVSWOT7%2B%2BB6XWMJSTbV9Jqzld%2B9HLXXsRj8HVqLKAwAhw7NxDolcwKk7MmxyqTNwzD7xct%2BWpKM2LoBKPY1Lk0BykdNB%2FTbKj4cdkzqoXZKupeBtgDhFJEGwFCNRJncx%2BuS9sBingpM8sPYltN0HMPblocsGOqUBittwFAzRx1lqccj4km%2Bd2sGaHq9QNksskQ16fbbNewSFjSgTO2aO2R7cCH48zswA%2FwyqY0pOJywkT34KhzwungYGDq8T8g84QDKfk7MXJmstzgElClsKsGdkCD4vA1WJaqSMQN5NkPyURX8QQWAEZbfmCqtsV4%2FO110qfi%2BsPSGq0ITRCVtOU%2BHsL9LeQUbEDM4yaQpUKDyQDwYaYKV%2BXobymV21&X-Amz-Signature=d381bce8791fa2714c59412b503d3d1661cfa6b0cce278809de50dfc20c860f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MJO5HFB%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIDjMbfG5o2k3OZlbzHdE%2Byi%2F3b5RnPRwU%2FoL61fFZCf0AiEAwftlWAOZBoZ%2FqGzc%2FkA980drBXWy4tU1Uk02qtT0ea4q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDOdtUMXwUGThscbUpCrcA%2BqiNkMkA5WbFR9s63l3ha7kfOeQXhE9i1ysyr7fCaV%2BgEgKCM7gxB%2FyXgw0a0Dttz6I%2BX1MmmXrhMgNcsL%2BUU1rkLeQ7c6BXYzTYeMV4fT9%2FqN%2F81erJgkzxifbfJhPue4UVsQf0CJ510tQ3coIf7O6yNJDerok68Tt0pUurQ5tvNNzE3Etn3soJkj5C3C9SRUlmVUrfY8zaoYKdaHy6UBSiFyTiad1tQg3UUIBv6L6amUmhZVrEPoWwq5bmEQQk7HwXPN9JeDSyrTu6%2BKJRMpbGJQOIqILpcKpGgIkDGuxU7pC%2Btl9Kv7DpdCKUSHUGMB0p%2F4wlHoMt0feqcBuZNhrW%2BOwPBGAkoK6WQqlHQab6StQIn5hdv%2F9H02OvvI40KSXKlWC%2B%2B3RnNxNHmN0jioIdwz5d948Ykz8EkDlPuGUVhdpnRWBhwZHJkNlIjWXVgNr%2BEir7yzgd4rcIe11L8XZUJwHsNJVt9bmvSUFFdL5AtwHESmFKg8drt1Mv5m59juzzy66fIFYQFwDqfecx%2B6q52tF6BMqh7hKqWPSWBcnemYcNh3xl9PM%2BJ2ImI1MLZaLQKN74pdkgGywZdd1EBh0994lDE7fXKrtEOcn3uutYcg0JB8AxlnHOpBBMOPlocsGOqUBRV8ADTg38%2BDF6FMqZ6sDxgsaIksvrjx%2BTpuD%2B1fAGJHPGRweXQz7GnjhZ1DQb3I2mel8kpv8JwcB8MlrARtggCzHs9vE2t5qu6wpBe%2FZIr1OWP9OpQpmbYvkwAlewU%2FqTHd56sFTuIL1BvJ%2F4OO7V07NFGFtEgMR3fbwTNdTMiBkdb%2BrHeqA6CZlzIQ%2B00yBFydgYcVvFv0XaB73%2FBN6rDwJ%2FBTD&X-Amz-Signature=2c43369328db5a5d51c50a5005fcb9aafed366a3cb502cb49ab091e32a58d57a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MJO5HFB%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIDjMbfG5o2k3OZlbzHdE%2Byi%2F3b5RnPRwU%2FoL61fFZCf0AiEAwftlWAOZBoZ%2FqGzc%2FkA980drBXWy4tU1Uk02qtT0ea4q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDOdtUMXwUGThscbUpCrcA%2BqiNkMkA5WbFR9s63l3ha7kfOeQXhE9i1ysyr7fCaV%2BgEgKCM7gxB%2FyXgw0a0Dttz6I%2BX1MmmXrhMgNcsL%2BUU1rkLeQ7c6BXYzTYeMV4fT9%2FqN%2F81erJgkzxifbfJhPue4UVsQf0CJ510tQ3coIf7O6yNJDerok68Tt0pUurQ5tvNNzE3Etn3soJkj5C3C9SRUlmVUrfY8zaoYKdaHy6UBSiFyTiad1tQg3UUIBv6L6amUmhZVrEPoWwq5bmEQQk7HwXPN9JeDSyrTu6%2BKJRMpbGJQOIqILpcKpGgIkDGuxU7pC%2Btl9Kv7DpdCKUSHUGMB0p%2F4wlHoMt0feqcBuZNhrW%2BOwPBGAkoK6WQqlHQab6StQIn5hdv%2F9H02OvvI40KSXKlWC%2B%2B3RnNxNHmN0jioIdwz5d948Ykz8EkDlPuGUVhdpnRWBhwZHJkNlIjWXVgNr%2BEir7yzgd4rcIe11L8XZUJwHsNJVt9bmvSUFFdL5AtwHESmFKg8drt1Mv5m59juzzy66fIFYQFwDqfecx%2B6q52tF6BMqh7hKqWPSWBcnemYcNh3xl9PM%2BJ2ImI1MLZaLQKN74pdkgGywZdd1EBh0994lDE7fXKrtEOcn3uutYcg0JB8AxlnHOpBBMOPlocsGOqUBRV8ADTg38%2BDF6FMqZ6sDxgsaIksvrjx%2BTpuD%2B1fAGJHPGRweXQz7GnjhZ1DQb3I2mel8kpv8JwcB8MlrARtggCzHs9vE2t5qu6wpBe%2FZIr1OWP9OpQpmbYvkwAlewU%2FqTHd56sFTuIL1BvJ%2F4OO7V07NFGFtEgMR3fbwTNdTMiBkdb%2BrHeqA6CZlzIQ%2B00yBFydgYcVvFv0XaB73%2FBN6rDwJ%2FBTD&X-Amz-Signature=a10d7ba2dc6745cbfd0fd2f84fbe1d262e9c6b16add31d7dee3f572a60aa9547&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFEPWQWX%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQC2jtX%2FR8CBVC8lCfPBu3z38Bg4ieVYxMabomhBbSLXrgIgNAqA25PUeNyOcRuwLsghIurUUTuq50PEo%2BvTScK2rpsq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDNOYRUFjdo0M1Xy7lyrcAwJWycJ6OxE473Std%2FCu%2FgmO12Gsg7oTUS8zQivo7YWl6YYdBLKBeDXqm4slPeiZUdlRnr3yKKYlPKbhgtA3Nvyr8ozu7T1U%2FGdMVPVPuBs6XX7%2Bav8Gsqg0jG5D9KZ6avRkZ%2B2emv2mPsmlCcssONTVK3BrXyzsZm7YLTLOUEBBiS1I7QPGhmTUH3kLVbX830zRbzrbuq9VAsXO8Zz%2FkL1QNn6NAWfP9oolERnwj3R%2Fkk2aSNHi5RTsjNOMOZW1aJecxlynyVyJlZDewktkoP7AuDXYbLhPlDFfoFW57YExPtgZhTKfuengjhdVp07aW0xtHX1cI2zoEHFsZpkSaqFhYcU8jfZuw78vD7biR%2FUPVZE8utdryzHUBSro8p2JaNcX9FlT3LYtl3O8HV%2BGAmioeQbtNRweiqGuSWmyJy0GwvQXflXWDj8o%2Fo9Vwu%2BQvrQ1aN8ZAAPadwIkTcm%2FKNjOzOc%2B71p6aDZjCStyJPEThpX%2BMHppkbgTG6aKGOjI4j8gMPJ8y8JUZhHIYuxJsy5DX27B08wiYdxQhk%2BgIS%2Bcv3e5msDr3YCA8gd%2FrOhCbpMKU%2FwcaEQQZtra6RYxJE5Qk6dxIkHGBsfZwskZ4Mm4Lg6fq5tlWZOFJnchMIPmocsGOqUB%2B%2BWsCLfq948Va4kBzFAEjN5RlQujQcSYjDHeo2zRgxXnC6ygYnG25KLb7g56%2Bbvb81EWe1730FHpHeP%2BDh3SM7eX877eOhjTcdu2uoGYZBUWh1%2BJL2uvWijxOKGtSUzVcE8LbGftSNMjzjfTEXfvz6HoJ5c8%2Fm8BKGM1uIDPNa%2B1Zt5PpmfJktF4ydrMQYfOLSl%2BpCBkYiQsosgTcSLK4Gz2qzHR&X-Amz-Signature=8238fd73de83a393c933f8214768b5358aed56b29b8dc2ab86e2135d58b60ebf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663BZJGZC%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIF6VFlR0Zxgof%2BMONdPHAWQOfds1JG733Z6dMlRt8mqxAiBSKMHAMznqb%2B53Szgct1ue1V%2BmijXIhOqOd9khtPfPWyr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMU3dNKz6AuflqIg%2BjKtwDT9OipaL%2FqG5m7zyFf6JdFKY4VH300%2FoRE31mZPOPiiyVtQYo8kcULHnGuOJgj%2BpE6%2BiV5bs6lVOAdg4LQEF2%2BbvPNVj0uOapegMD1jgwlbsD4WT5pd7E3K09DXKVih1gm5uqKL9AFXo0JdVEP%2FPMxBrBq9IdtiKxYVWjyn5SB48hFqLsu4%2FNYlKNrsDQnwTaj5tO23YvH1yXwCa32ZHHhkg0z%2B9ycHRtHER0fUYRxxEZV5ne%2FCPtfXz0%2Fk44v8AmA%2Bhhx3tMMUu4QzzOU5tYevpz7eyXUtun6rfxn7PNh%2ByXQP%2BJYqHQ2LYZmkNTm98qUHTeF1%2Bc0z6Cp5fa9VxSnA3phQldwg6b55kACB6%2FTZOpm6%2FPfOnUAtDGzPixvjhFwboZHWdsH7mQOickoScQw7Jvdr4zgiOaJvtSf5jcIU6UNy72dQWypHksZ0%2FNpr7XikN4WHFYoIK8bPERoBSAnlja08aBtdSjbYiIcdPsuw4NU0vvjLES%2FOr1ksPJFHT6bsAbYohqPedRN9UM3gsbgCmke%2FvpTaE%2BUdQh7a67nU2qdrZFAZ5oGWOJijNt%2BTkbg7YTH0CYAQfC5UQ%2Bz%2FSVcgKYgfR7tvPHHaOv4j8py2msTQQnXxIpd5PrhNIwjuahywY6pgEJHyth3NZJ7YHyfwKs3eXn6qfSr8s6iA117ZSr0IcBAwZqMelOcPy1BLw4czauj1yumNxFY5SV86XdehEDs2Ps663ZCmAkYwi3wErAn8zdNkYCjeBlgaKCX0%2BtMXO2HvydlELZdB5Niuw1IZyyO3A9Ht1er4jI7nNW8BeygakAfRDolgTkk%2BPvIn%2FOWhafUf0INEmMQ5uy%2BJmDW5Rj0TtQvH%2BpOS4Q&X-Amz-Signature=3add2c47772a9ddbe12392c6b58def07cd41311f68a6bfe6f5d1ad48a8ea8e08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DI4KUDX%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIDl725fv3cni1QwrvMjg95GUMn7WckFYfQLC15D0DfUpAiAaSb9mqq%2FAtjfwS5y00kvUuEIBSsxptVgoao4Z1LKL9Cr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIM5k0g9uxGhegUw79jKtwD24CyfHGWHseph4mFEqU27M55U2GowB94cP9lpUOJAK%2BS1DsxR3O18UHy2TzBQwpYA5qlT%2BVLaFO9bgxzBiEoV9X9QhYrs1xxHSc3FWvwqAt0TMfWeuPAKLbG2l6V9l7P24EwhiKcMGCkVJT2bFZ1oo9YdMKmgg2SP%2BxeiL9w0Z4ot%2BnJkqcEhfvw17EITvi99Ezjl09XR6Mwf%2Bb7kJXU7%2FbQmCUegWh7TIqK9adpRJjPz02yxkYbRLJb4JxMNPqmUNjHaV6k14mFx3xLMwZWK6nlDj4hyk96tEvbbZoAV%2BspJ2QU8c2ac3FLwVn82ilb6hUT0PfdbukNMwRzIUkvoZTQ3sEsSIiCfAg4vqtZNE3QCdZ6CLgv8cSR%2BMe8WcWLJ0sI1BRmmcV%2FLlVNeic%2BPQDSC6cie3dSG8lxHzM4xjibimMG3d18n%2BZwMt0MNHZaMEXsnRNs75mlB6%2B8BtFPStcxPsxLolJmg%2FIa5OqKPRgW7aZdPqdEkyoPTyQVpx%2FQ77RDMvLSnr9odI634iUkUV2uAsNeZXJ39g0Ebnugy0hcq1bV1Wmu%2BwWPkagU%2FM2blHZOxGjqdWMrqzoYMSb50bb34CUKmewlb%2F1tyYIyR32lbLAG08hKcHvap2Uw%2FeWhywY6pgG1akF%2BhIbJmxYujR8ZM1cRCdCOzFvUpiVSx5Ho54qvv0a%2FyYyusnYRhQPHsE7sbKzBWvpcNlETBc7eXxYLNdxCklyRjEgILtYFyU8mJn2tfbw6dPClq8AaaG8lqm02chkFr0l%2FUBtuC%2B1QxgO9r38VKsxa6UkO5DQJ8d3Pd9bIBYCU1%2BNr6ti0lAjwpuB6%2FNBH%2FyrTPNRxEDJyMAJI8kw3sJZugTC9&X-Amz-Signature=fe1a286b7a7d085510604640df9ba7addc8bec0eaaf8379508180a68b76204f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IQB2NK2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIFhzU3RpFdgj%2FImv37hQIBbi0E76Qi%2B1OkL6xyY%2FRbjeAiEAzKO1GK57jR6PIfyLX44WTbxMK%2FiI6MbNCRnmSi9Mg48q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDPsgG82nfWDEJPcXOyrcAwHuXMvyymFzgKtYqZUQVjcUwVOL9RUwxr9i2Z55NdMc0CDsPa99qjy76m1u%2BQNRYFCEm68LaUdc%2FJ7ixfJ77P3zmQpueVcfr9%2BL5tttmlyfqXmAKA4K0EQ6Y51qkZ4JXODnQICWGXrC9TgEkXC2jyLlhwFoyojOLc4EH0zZHV6x401BQIPO%2FggMFKea8HniPwdzlXQtGUbih7RY%2BFatfR469yLFs6WWiX3dTJvVbnYlBIGxReOobSFWl5RYYYhudl5ZuMTkqW3veSSdhad2u0RIwZQRUR%2Bke4SBEjm%2Bardkvp%2B1Nt72Z2vb5MQht2iTdumxsdY9oMSyfPdkrlk7nw9sRq%2FhWjwEgzi0iP9mr4%2FeEVsGrRFPIs%2B5LzKTAkqBchxUzgtD8bnXrGdN0QHwtgnWx2G7Via5N6M1fHfcwAIvnlItVGt%2BHJkXesfOp6%2FRvI2VjkBUe6O9Qr7XD%2Fs2cm%2B9bsG0Q52EtpSsz9362aQCkjzfmIrW%2BBe0rw1TZn3AZI6Vw6eMtUw4A5DlwBXA7PNvnk9Bupr3EGOdVF3LtKEoQ1i45qzJPmhgUcHdOQvU5x9OZpEJv3iSbGr8wff1Ud7WxtEQWJN3bsbMugvaB1xIMuhfb6xrQzsGkncpMOzlocsGOqUBnmZWoMU1A7y1%2F6Q%2BjKauRKjJS6mpTkCNB5%2F%2Focikaw6pv1stvJmNvIdYg9CfrGUlH9yKe3MmP8fwvP5%2F8yfKpfW9XdJ80vidJXfD4edpAzyRMhvacbmr4B6Ng1LNcu%2BfnOdYwV6PIupuLbtAQeztei876pKFiG2yyycCDkycf7%2BtdGdyjc8x6lT7b%2FJzOkEXivbgNBVtS9i0SvZ0TYHnIqzbsGKV&X-Amz-Signature=41704a82ab5bda32ab8883cd4f46b832e3dd5405c2be473f9418a09bf5110e42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IQB2NK2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIFhzU3RpFdgj%2FImv37hQIBbi0E76Qi%2B1OkL6xyY%2FRbjeAiEAzKO1GK57jR6PIfyLX44WTbxMK%2FiI6MbNCRnmSi9Mg48q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDPsgG82nfWDEJPcXOyrcAwHuXMvyymFzgKtYqZUQVjcUwVOL9RUwxr9i2Z55NdMc0CDsPa99qjy76m1u%2BQNRYFCEm68LaUdc%2FJ7ixfJ77P3zmQpueVcfr9%2BL5tttmlyfqXmAKA4K0EQ6Y51qkZ4JXODnQICWGXrC9TgEkXC2jyLlhwFoyojOLc4EH0zZHV6x401BQIPO%2FggMFKea8HniPwdzlXQtGUbih7RY%2BFatfR469yLFs6WWiX3dTJvVbnYlBIGxReOobSFWl5RYYYhudl5ZuMTkqW3veSSdhad2u0RIwZQRUR%2Bke4SBEjm%2Bardkvp%2B1Nt72Z2vb5MQht2iTdumxsdY9oMSyfPdkrlk7nw9sRq%2FhWjwEgzi0iP9mr4%2FeEVsGrRFPIs%2B5LzKTAkqBchxUzgtD8bnXrGdN0QHwtgnWx2G7Via5N6M1fHfcwAIvnlItVGt%2BHJkXesfOp6%2FRvI2VjkBUe6O9Qr7XD%2Fs2cm%2B9bsG0Q52EtpSsz9362aQCkjzfmIrW%2BBe0rw1TZn3AZI6Vw6eMtUw4A5DlwBXA7PNvnk9Bupr3EGOdVF3LtKEoQ1i45qzJPmhgUcHdOQvU5x9OZpEJv3iSbGr8wff1Ud7WxtEQWJN3bsbMugvaB1xIMuhfb6xrQzsGkncpMOzlocsGOqUBnmZWoMU1A7y1%2F6Q%2BjKauRKjJS6mpTkCNB5%2F%2Focikaw6pv1stvJmNvIdYg9CfrGUlH9yKe3MmP8fwvP5%2F8yfKpfW9XdJ80vidJXfD4edpAzyRMhvacbmr4B6Ng1LNcu%2BfnOdYwV6PIupuLbtAQeztei876pKFiG2yyycCDkycf7%2BtdGdyjc8x6lT7b%2FJzOkEXivbgNBVtS9i0SvZ0TYHnIqzbsGKV&X-Amz-Signature=6a1a916df50f8a06ed970c170396477b3133ef042cfcf827f5d80d2c354c7603&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFMKCIKN%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQDW3I%2BjpnpHnIxiDiUodWVTYATy7%2BjM56ulBnXoz5CmQgIhAIqpx8frcmD3frDpRgCeFop4LWz3FzEsSK3%2F%2B9d2QKtxKv8DCC4QABoMNjM3NDIzMTgzODA1Igy5OUgOHcYh1eYhJaoq3ANGqS91YCwlbYH1YVHNsfC0FN1XsdWuLyTWT36m%2B2p%2BRXYs9au7CJzZWLU4pC5l9DheczGKq77w3OCFp0crR0zO%2F5ZRBM0exFrL2aTDVh8keQvFKja39cY1bDtX2OuwxV872gfAik5G%2Fv3FGxvb%2B8jIUuJ3TwM15o4rcpPnCKL2VPZ6V%2FIb03UcVLsa3%2F%2BKbOcekZGytmFF3xK5VHpLhn8ZbnuSaApnaUXcZjDT2Dd3Nwl8va%2FHzgYc8PrW04rMkCQGVEziFomKqYDPBO2pviFRy6dZimjbpwNn%2FGIyF2FRwBx25KF16tvCCUihhRjYteXW%2B6vJAmuoMydi27%2FyFrj6CtIFRfuH0%2BRXwPIpUl3%2FyZKJC2gwv3cbKYxL2F2%2B6Rn1D9Umz4ztaQXfCsi5B%2BOrJLlJv1VpCKwu%2BtJe3o8LMoSmv6%2F6fsi%2FJm46wzT13dUc9%2FYFC2uThf2zgRMzmvi7kjeEiXXEjzLxO%2B%2Bh22jZ6UDFVD%2BFsE4P2NnXCa7MoQmytrxP5Anz5CodqiZdgpOSO2CzdFq6PdPj%2BhY51MNVN1OfFLMJZwRXXHff0hwAxb3m43lc7Bgfcx5ttU9qyNAVeVFC35zcZGbS4Gr6pfXaNPI9blIjZCSH0ZYygzDd5aHLBjqkAX%2BzaVLl14N5345qc0kTJ9tIJVfL7YCpZKThA13eb8cXiU2gCVPJIGYnhviS%2Fk3DcSJ63%2BF9LM9RgVpiqymYJfpkAQgI7GTkS2mVRmG8EURZ2LJd9QYfiKeIuOO6HezQrGyFoDj7Dt1ZbKXnZR5h4Mkj01NBb5FB9EmSlFjFQ73SwUckqMfpRvkSj0qk3fQT0tGiNarcwA29Tocn4q87R%2F8XRb8w&X-Amz-Signature=ac35929f73ca18dd1f62a260f2c76f380b1b66f4c4f6b526c2e9a6a2f1e5464d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPHYAPWL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQC7LVRL9Rl1MAPRmc0atEnqZnUeWlWqEbtGmbw8x859HwIhAN8e2vJdMI2v7WSbChB%2BAlsgAmRC%2F%2FOfvx3MmGIlT1WCKv8DCC4QABoMNjM3NDIzMTgzODA1IgzQTx2XfOnSpNt7c9oq3AM0FaduOVP2NWa7jlMqSHSYfcw8a9iNtErhZX9pDs404S%2FT%2BePAWuVWjrgNqk7RZIHgjRkVpO3Ix2LECzruxJu%2FchF5ZtkRRRf97hVtRKZXK01BbGSPwvZvlhkTZmUoK%2Bo7Lvwy%2B0T5rWwQ4waUl%2BLu939bje1heHWKSkIIvnth4JNt5qjUO%2FX9nbYddzqxhvRa%2BBzFLDLjSPyl4kM1ZsS%2FLcHmiyjOdIilqWXFjFD2BQG6WJkpDlmYMNGipgRKiE%2FUt6lfjqmpYE5ppC6OGMcNYhlxAVqkHOlTwP0fArLx%2Br9k5aLalRGKqMBYJU3OZV0Heovort2b2CFBLA200AOjxVgh96U1S24IRSW3nZBhg2gSmmqmzw%2B9lyhZZIw0wsn8ovI16dGOkdFsQBSDkrOJirFCbT17eQjQrSMcc1U8OyGgQIyKKWfof6l256Y0FobNweUCB1CcE%2BASb5Gyr45KqYtPDrbaHtdWjoT9KeTshTXWRF%2FYO2jmMRBW7ST4oQL4QsawY9tMQPOg05NUnmcdaQvXRQpQtydaqDN5ZEyTMInynDl3gudLF%2F4d5ONa7TpKNuEkiqdOpIRu3PBdTAZ%2FzQz2k4qu2HYZJosjihfaREJZzcABAt82r0TisjDD5aHLBjqkASDitojrz3sixsDsdFA3ySBTnOqjsZ9B6zchTMmMvnEAzrC07hOrLaGewVffCNxxMQUGipdBNcLZDdcg3%2BBWVLMhdM63fQQ7uUnKXaBy7qPqypQxZR7VGf%2FhfBfmLeMlf%2BO2hEcjxAfP6eQDitv%2FkvXoiG6MJs7XGKTYWDhx%2BgqsTIDNzOpf3H3irw8iAXekTahmaBnoQDr8qS%2BgY%2FG43iL1H7%2BN&X-Amz-Signature=ebb53ef9d373590877a68b189a2ab629ca36f129b8308a855c6055af50194aad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPHYAPWL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQC7LVRL9Rl1MAPRmc0atEnqZnUeWlWqEbtGmbw8x859HwIhAN8e2vJdMI2v7WSbChB%2BAlsgAmRC%2F%2FOfvx3MmGIlT1WCKv8DCC4QABoMNjM3NDIzMTgzODA1IgzQTx2XfOnSpNt7c9oq3AM0FaduOVP2NWa7jlMqSHSYfcw8a9iNtErhZX9pDs404S%2FT%2BePAWuVWjrgNqk7RZIHgjRkVpO3Ix2LECzruxJu%2FchF5ZtkRRRf97hVtRKZXK01BbGSPwvZvlhkTZmUoK%2Bo7Lvwy%2B0T5rWwQ4waUl%2BLu939bje1heHWKSkIIvnth4JNt5qjUO%2FX9nbYddzqxhvRa%2BBzFLDLjSPyl4kM1ZsS%2FLcHmiyjOdIilqWXFjFD2BQG6WJkpDlmYMNGipgRKiE%2FUt6lfjqmpYE5ppC6OGMcNYhlxAVqkHOlTwP0fArLx%2Br9k5aLalRGKqMBYJU3OZV0Heovort2b2CFBLA200AOjxVgh96U1S24IRSW3nZBhg2gSmmqmzw%2B9lyhZZIw0wsn8ovI16dGOkdFsQBSDkrOJirFCbT17eQjQrSMcc1U8OyGgQIyKKWfof6l256Y0FobNweUCB1CcE%2BASb5Gyr45KqYtPDrbaHtdWjoT9KeTshTXWRF%2FYO2jmMRBW7ST4oQL4QsawY9tMQPOg05NUnmcdaQvXRQpQtydaqDN5ZEyTMInynDl3gudLF%2F4d5ONa7TpKNuEkiqdOpIRu3PBdTAZ%2FzQz2k4qu2HYZJosjihfaREJZzcABAt82r0TisjDD5aHLBjqkASDitojrz3sixsDsdFA3ySBTnOqjsZ9B6zchTMmMvnEAzrC07hOrLaGewVffCNxxMQUGipdBNcLZDdcg3%2BBWVLMhdM63fQQ7uUnKXaBy7qPqypQxZR7VGf%2FhfBfmLeMlf%2BO2hEcjxAfP6eQDitv%2FkvXoiG6MJs7XGKTYWDhx%2BgqsTIDNzOpf3H3irw8iAXekTahmaBnoQDr8qS%2BgY%2FG43iL1H7%2BN&X-Amz-Signature=ebb53ef9d373590877a68b189a2ab629ca36f129b8308a855c6055af50194aad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QH7EURZU%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T051633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCPPizyDBajOuvSs8BLPSfyHrYxqbXsklSqA9IOYKQXwgIgYtO5c1v27nMAKiwm3pzFraYCrmQsN9%2FQfy9jxTQA9MAq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDBx3O9OuFPVThQRkQSrcA9lbCF3enIuyvwvmgd70NN4sCv3U9319M89vxwfOwdJ%2B6MyNblu%2FmBDSX0iuzz92tcDKHyz0rGGYDuQFCjdV3fbK0shfFhz38nGLcuCedA8O815zVeueMOjawiR9Xdm2usDuRHXFGcfEdQyOq0hDMCtIQzpSOsS2hcXfXZ%2B79L2zg3lFKgcevk6JUp1BjTERq0aF6H5ZIjYee%2FFup08MhYh1xvJCetiAMOS2V3bP4HiVSbgF6rtJtAY9UYSf35LreaNqcAscoc%2FyM5YYwibt6%2Bxs7vDXa%2BuDvQF5aYCdmL6w00EqFljZubakww1WcvnRcOM9GKxmuQ95NlLdrGDR4QJ0x5dd4k20dmF0DlF97ocmBJl3X3NpKJwJYx%2B06EWeaSwzLdYlNcH0Avv1RTbR6qe5oOjxFsdHz3C4tAqIh%2BfHOL8ImumbKTLUPGLbTv7k7nb7KREIgAXfJaKhXtbftUUmbR%2FA5cG4buLJvdb8Mvk66aKeHok6eOqiPw92Ds%2FZjxA6L6%2F%2BYIchvuwQIwzc7TUTiL4DCsyX%2BcsB8rGIHR2Kv405I0d1%2FBu8YOnI%2FODGg52Ny4kH%2BoLdvP%2F27FfRupWfhSUF1HNXCjm18hh0QB8ah%2BTiFSmqsQiw51JzMLnlocsGOqUBjMXK6X%2FOZKfaQxcMM9PcehNwj0MQ5IMThgI2DqKOMdd91Mi0EULikpTQoE6OqvOxQRM7mViuCY6R7T3jZyfapQAl8C1WPv1IY2aAPJ7pVQjha1mdeIeDvgSvQdn8FdHbpWhU3INN%2BaHcOvOtIVFQX75mDhBmT51sv2vyyiHqe8A2Ff7gK%2FOwl%2BfVFJII%2B%2FUwiZrpPddVLlzJHye%2BvoTjST%2FIJ78u&X-Amz-Signature=5f0bc6cb294fe78393f11e886e2351ab0b295f57b5efb6737926afdd274fc2fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

