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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EGGAGF6%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDfRhhVXGIjTuYxF2rYVWl9ByXR5kE4xZbgkwsgzlEqkgIgCDRT2B9NiKQvzsAj46CNdTpZxpqrEU3%2BUcy8RP%2BOOcAq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDB58DgWedlPKmyqVCSrcA0%2BxU3NVmd9h421XrZRuUMO4STl7oDe9XB1vlmx%2FqCPxp3fqIq4gKtGkFO%2F8bzWr%2FwrYPI6lRVlfaZ%2F3B0AYtwRgq0jc%2B7uD3W%2BDS3UYvJYJsHTcmvhg4ve6%2FqtIAJqsRLqMjW1Q2qxg9SUpdSbgJcp7NNijEGt55HHirtaf71oIRN7UTlLvT1%2BztHkyVIuCmNCTis43KuIO0Ml81XC62emCxYHB6OEU%2BmOzRVay43nffTdCfHPfo7PCVKxOcFtuiHh6te0UDCtAdVjuvcLjjVnqOzd74A334DVK54pixqitcugto0onoewdaOoiw0AJG05xLcq1a8Wko7CH55NUekkQCO0fBViw0MjJaoDrI1Q4kein0BEqO43nwZapOWTOCPykYUq%2BYbblGFHupP1eZVJ5IkZvhxYexRTRpHhUx6KYlfQCYm54%2B098g%2Bry5gWjPLPlkxXI5QLPoQAyZtV0xlU5x3YaOD58pSop82DJd5SUmZ%2FH8KJ3thowAK0TIFCS9yWaoQ%2Bn%2BD0SyeY75rtW8fTiBem%2F%2B4SakzV6mACY7FKKpiqr5SU%2Fel5knRCGkrN5PoODADcxYZ7WMTGgpBsDAGL8Q9i2B2hwYLUkwyagqnerNS9c%2FWsNvYKBX%2F1EMOmLlM8GOqUBnzOG10mrv9tBW3ALlr%2Fy33iDsEW%2BxfDlz0YT4yIpPfc%2FgGN1xGM71OcewynkXEZZnZ%2Fb5G8ImrCzLI3NaBeupXXIvhM98ieENyXSoJenyzdugXqEoTdNUv4cixH1aSSrIXGRL34zUHOuOjT8Kdkrw6QyZTxbe2x0jjCfpwfnncaNsAoNeTZaKSs12a3Jqh2wRGGqlPTdgHrHcsz67nkn49lrOyLz&X-Amz-Signature=10ce4f2e48973c4bce19e1873faf081fe11c76364b4bd769c992bf9473cc8dab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EGGAGF6%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDfRhhVXGIjTuYxF2rYVWl9ByXR5kE4xZbgkwsgzlEqkgIgCDRT2B9NiKQvzsAj46CNdTpZxpqrEU3%2BUcy8RP%2BOOcAq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDB58DgWedlPKmyqVCSrcA0%2BxU3NVmd9h421XrZRuUMO4STl7oDe9XB1vlmx%2FqCPxp3fqIq4gKtGkFO%2F8bzWr%2FwrYPI6lRVlfaZ%2F3B0AYtwRgq0jc%2B7uD3W%2BDS3UYvJYJsHTcmvhg4ve6%2FqtIAJqsRLqMjW1Q2qxg9SUpdSbgJcp7NNijEGt55HHirtaf71oIRN7UTlLvT1%2BztHkyVIuCmNCTis43KuIO0Ml81XC62emCxYHB6OEU%2BmOzRVay43nffTdCfHPfo7PCVKxOcFtuiHh6te0UDCtAdVjuvcLjjVnqOzd74A334DVK54pixqitcugto0onoewdaOoiw0AJG05xLcq1a8Wko7CH55NUekkQCO0fBViw0MjJaoDrI1Q4kein0BEqO43nwZapOWTOCPykYUq%2BYbblGFHupP1eZVJ5IkZvhxYexRTRpHhUx6KYlfQCYm54%2B098g%2Bry5gWjPLPlkxXI5QLPoQAyZtV0xlU5x3YaOD58pSop82DJd5SUmZ%2FH8KJ3thowAK0TIFCS9yWaoQ%2Bn%2BD0SyeY75rtW8fTiBem%2F%2B4SakzV6mACY7FKKpiqr5SU%2Fel5knRCGkrN5PoODADcxYZ7WMTGgpBsDAGL8Q9i2B2hwYLUkwyagqnerNS9c%2FWsNvYKBX%2F1EMOmLlM8GOqUBnzOG10mrv9tBW3ALlr%2Fy33iDsEW%2BxfDlz0YT4yIpPfc%2FgGN1xGM71OcewynkXEZZnZ%2Fb5G8ImrCzLI3NaBeupXXIvhM98ieENyXSoJenyzdugXqEoTdNUv4cixH1aSSrIXGRL34zUHOuOjT8Kdkrw6QyZTxbe2x0jjCfpwfnncaNsAoNeTZaKSs12a3Jqh2wRGGqlPTdgHrHcsz67nkn49lrOyLz&X-Amz-Signature=10ce4f2e48973c4bce19e1873faf081fe11c76364b4bd769c992bf9473cc8dab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBS32KS2%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCy807WdKz3SsFurQK8Q1xzconL0IoIP6nraVJjgadHxAIhAJTC2a%2B3rtVWKl%2F5bzcn2%2Fp1J9BpxHHU6jt7cEzPX1%2BUKv8DCAoQABoMNjM3NDIzMTgzODA1IgyWtW98pnpEL6YhRh4q3ANONwbYn0axuxKGJvyl6gVVF8nzHu7ne1xaXZo8KYKISWPZsAKS4ABYFIsdTH42R%2BuGBwXeVPpkxZ65TrCIRJXAcQJxkwWOUySHlKNlK2%2BvYljFh6%2FVT1d9swD4pTQhoAvu8wCsSn4fZXeTKu%2F7we1I%2BNQfjmJLcqaOgwMWgnNSFfznDHFwBC9txQcqRL8koaOaaEl4TEvyis64XBUkPIpz8EfTgXBN8EtUb0xga2kjYYXei%2Bt4aM45xMLn33VyUCtmum6ugDznWfTaVwJMwiJNT6X%2BIzqaRMJXNEW93287W6faGjdyre4nugMuvTy316lnTeNeNeBueSPqtDd4kXKPD63LiAttXGcsqzJ15sKqHQ4VR6hPWRDJ3%2FPr36oyT28pEN6G%2BuQ5dNpOcNPgRpAA3qutH9B2sIuKldYjwJLy2ofnpHKIbQIP2cwpvXrwAoMVpCG4l7jcA%2FP5XJy4zG0mJewvbY24qN%2FdeF7CLioMxmzdfo1M%2Bg7h6tKNRgMdff5CK%2F3byQ1MrAYIbYZccXcQpzRmZczCuOn9zy6G4zp85smeltGmNr%2ByWnjQvD9lZa1demkqHb7N7b7un2K1WVxH7LBgJFTXPIeEwivTm%2BJuvY8mqIY0M6q7MU9lUzD4iZTPBjqkAW2PmROSw10AxQ11dPjxA2pRgiwjahTDCMsP6PHBc3yb170RUtysC%2BK1LW%2FybvswfExkblooRloDt3RpSctgRV3AgFT624WEc0BUesaz3J2xjpuxd7jvRrwxN%2BkxlxefUNailJAh%2FlKJYcSV5iydF2JA8yEiaK360dP171m99nu5BL0VAY3fPQyJMPi6%2Bhc3eSlpIUDQBPKSzI0wA7bgo8zGiKX8&X-Amz-Signature=60428460904273649d1e49d853a7a99e2ee0f8e8a6ea95175e07511c7bec5556&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BKBHIHX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQC91Hh8FLab00%2BPJt1J5%2B9FZFmSui%2FxKKAAOjQQueGE0wIgAVP8o74gh%2BxmHZoZdFfbGJMnbYuUH%2FnZf8hBrXtg8Roq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDM5bioERm8WmWRsAhircA%2BA0VrcLMGoeXyDiGFPLz%2Bm8UWe64kjMoeFditWUmLM8gqPInw9V8aceRUmeRVGH3Yi4l7jZCv%2FFIyVkgZAp1cD0nrzvLzbVHh4mWjdXQtJzr%2B2flidW6SwE2N8Has%2F4EWcszD%2BSvtLKLxCTVgTWY8A%2FMHTJrmUf2EVx6VZjVbVlDX3S3zzgV8MoxSz2f2SOvsjHCxUFITnIZuNqSkfXpP66SfGq2%2BmxTn%2FisChRXiLbVnBntmRX%2F74V1tNFA%2BtKMlMndKL7DlPPIzOyeoyRbCF8E%2By7BzAhEcEAJXP9rMZK25sCTGZp0D9cgBaRVj%2FbnAyGfcBudKvnsJLLc%2BRc5ym4p0CT7bW9aEIslPkelixu7wLMs26SJJSnNWhfXXvLF9gw9buQ39O1kulmjhzPpwforBcD77THOkhvGYUT50eMyDEOCRykx%2FpZOizXO%2BuBvIqWNcMINOyZNX2NCTz92jymw2rH9HIKt2sSGsvJ%2FgK02op6AGAQESU6D1ItEh4y4%2BQEbgfxpq7c4yIBSHA8FLnCeoKzJ%2FMt6uNG8spvQfEm%2BM%2FpseUwTUGNoSzuELYPOo%2Bt6FkeVCLnoIt0LCedTox%2BvZhDElt4XQA%2BzUFMljtzPqof4ICyZuqjvvcVMICJlM8GOqUBvLXNo%2F9gMhTRiI9mu0Q%2B47RZ%2FU1LpI1KEHqvGnNfj6TEKMiaGhtsE0dTRPEccmcBQy5TIONZmaHa6zKCVWum%2F3BSQw5pYR7d5LCDk9idqbEftZznHo9sHy5MPb15lMZYK96KsKqLn6HG29oAtW2rFAF9PUhJbLJ78T29evXRqcZZ0wNk%2BA7fDD3shFY9yKOencRd6zn0ketI5DuPa84%2FY2u2jqNf&X-Amz-Signature=f2e59f050997a55bd8f33b1563a4c84f15d1dba42e66f885e091243564ced188&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BKBHIHX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQC91Hh8FLab00%2BPJt1J5%2B9FZFmSui%2FxKKAAOjQQueGE0wIgAVP8o74gh%2BxmHZoZdFfbGJMnbYuUH%2FnZf8hBrXtg8Roq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDM5bioERm8WmWRsAhircA%2BA0VrcLMGoeXyDiGFPLz%2Bm8UWe64kjMoeFditWUmLM8gqPInw9V8aceRUmeRVGH3Yi4l7jZCv%2FFIyVkgZAp1cD0nrzvLzbVHh4mWjdXQtJzr%2B2flidW6SwE2N8Has%2F4EWcszD%2BSvtLKLxCTVgTWY8A%2FMHTJrmUf2EVx6VZjVbVlDX3S3zzgV8MoxSz2f2SOvsjHCxUFITnIZuNqSkfXpP66SfGq2%2BmxTn%2FisChRXiLbVnBntmRX%2F74V1tNFA%2BtKMlMndKL7DlPPIzOyeoyRbCF8E%2By7BzAhEcEAJXP9rMZK25sCTGZp0D9cgBaRVj%2FbnAyGfcBudKvnsJLLc%2BRc5ym4p0CT7bW9aEIslPkelixu7wLMs26SJJSnNWhfXXvLF9gw9buQ39O1kulmjhzPpwforBcD77THOkhvGYUT50eMyDEOCRykx%2FpZOizXO%2BuBvIqWNcMINOyZNX2NCTz92jymw2rH9HIKt2sSGsvJ%2FgK02op6AGAQESU6D1ItEh4y4%2BQEbgfxpq7c4yIBSHA8FLnCeoKzJ%2FMt6uNG8spvQfEm%2BM%2FpseUwTUGNoSzuELYPOo%2Bt6FkeVCLnoIt0LCedTox%2BvZhDElt4XQA%2BzUFMljtzPqof4ICyZuqjvvcVMICJlM8GOqUBvLXNo%2F9gMhTRiI9mu0Q%2B47RZ%2FU1LpI1KEHqvGnNfj6TEKMiaGhtsE0dTRPEccmcBQy5TIONZmaHa6zKCVWum%2F3BSQw5pYR7d5LCDk9idqbEftZznHo9sHy5MPb15lMZYK96KsKqLn6HG29oAtW2rFAF9PUhJbLJ78T29evXRqcZZ0wNk%2BA7fDD3shFY9yKOencRd6zn0ketI5DuPa84%2FY2u2jqNf&X-Amz-Signature=77142dd3176cac8209ffaf9a2cb243956a2b817248340045a6b7e353b2eaee8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C6B3WWB%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIG6y3hSQVQsAdsO0nB7QSDHSF5mdvGByxa2EbH%2FXF1%2ByAiANbJEuEOmuF5MS0rg8Z691G8pwZNUhQPfx1cDuhtQRByr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMB%2FRZTrge1WTV88CBKtwDHJP0DTd5umCNoqx5w%2BtXHAZu019Qo4av0gt7idhyynb%2FThmAL8V7Sem%2F4hAIjTggQec9bbk9pS6MIpEk6CDoDaetuJeN6%2Fk1Dc90pvKTIhAKlgnhwk8fFCq53PgWcK80Z7UscbZV4TbadV%2FUqR2dYmdMqW57XXsWg7MooRaNykjxH39he8v16mvEWzSZYILgbCHyphJ%2FXoFZYKoOmiXziiVkVt0K7o0OLJ1OG8F83DA%2BQXYfZ6dQVSZdqkMZ3c5pHARwpimb65hWUvyDVzjKJCaB32px6tH%2BCDY3TVCmmcliUTx%2FmGfuI6U1YhH7Rnp9OLKav431w64GCNClJDiTRq90p3jSI01Kw0PWwlu3EzcmVn31cJkBWIvJF%2F8o%2B6HYaXsKCnCAOHgnY3NwpKOzFGKe4ZiGGz6x9FIT2Z52rUI4up4Fh9ZJaVVHkv%2FREngwZvhmPVeUv8x30MsTJLbiaoXmrlatDZABlT9oy2uyEcc821l3nmUmD8nUcyl2VYS6rtgD7BAKXQCjIinOSuUPAAFeUX8SoBxaOAO17qrb08h%2B5%2BbSuwEBRizm1B0eMf5KcTwp8IkDJXlwhTAwAlTnCz1HvqcJ0JWFcQJ7I1qNHMeug7P%2BlQQR1G9sl24wwIuUzwY6pgGTeAyPlyW60cjzZIADkFg41VBaiRWZtGcp0h8fF8DLwrcwLTzuqvdrulV8d8QnJmv6rTekc1vRWKXfZ7wsIostP%2ByPN5qMjcwtd%2F6RNEcU355aIY5tKZdUR%2F3nv5F9%2BLrk%2BAgmpJvQZ6NlRzBOxrozydLiDCoSBJBPzA7ZcMUt4nVreh4SZu4apxueAGLKpigSPpeTnaGOJPuUxqhiEG9S4plXnx%2Fu&X-Amz-Signature=b7d7fd6f720350a38ba8a6f5b981e6be8df2bfeee08683b0dd19ff79b1bb7a98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653UWPAX5%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIDX5x8%2BW0Ynjp7AaUEqSdxMzGXWToKRKZ1ZRyu7EAeKCAiEAt3%2Bbrak6FrcRtzU5VvxRv%2FpFRbl7LiSlmp0fNTWKankq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDChuwAtZhVZvsgR5UyrcA6qisPx1FArQ%2F6SGrQbClkbnf6HmyFPkuy44rxUaLIxfwCBwEnSDMoA%2BxjUEGsQvMzTjv3uCbxlOEsGgrT1pgZjypPHQVHa%2BlcRsNaYRS2sKZiT8D9M7mDS0IReUHWupspY7ZKGDV%2B8mGQ3dDl0GGd%2F8qj%2F5UQrubaBG0yBqS%2FYYxuY3vCdNNdjGf7NnPbhZ6HRmwA3c%2BWYYUvV%2FHVo4XA5Y4ev2LCZ4uyIntj30jobMPE1RQ6tdr2PII69WwA2Sn7dBBr37inEHoW0l0izeaIHS5GuPWXMKe7ukmfuqj4E8gTp47Fu09zOZyVK4hbwhOokh0kunLI2w9HOi2ccEh1aKswYjVuHxxZc7wRyHbDqwcIaRokr%2FSwnq%2FAkl09ZRkUAV%2BPFeErm2348fUOC5rbJy3vRxvgRR1%2Bt3Pyg5WkpuLnxlMIoPYaMcBDaTdi9n18yzqkuXKS7sOg%2BKPDS5KyyMtM9%2BG9749lOVfoYOuFedWlY9GJTEl3hUesc4mo8XDEpg2CWeihYj0bwUCHybw2dWFKvAkCjxe1fFS8BhbuA8jlGlt7DGBpdPwQlJqzh14%2B2%2BmB0BFAIbUuhqkjUzHFDD9iICKUbQkgtNrRDd8T7Ww0AXGN03mDInJO3tMMaKlM8GOqUBOhn8vhRk9ttX%2B9vFemUiDNXlYeDZ9FscThcug71nTbQopxHa%2BX7q%2BsB8ROYE8bdAH%2FMybujSelewJas9akSh0Jd9yB1YwfTvwaW%2Baq260x4jwxBpKELSTjTYy1q25PG893LfAq5Ygh4LZu%2BMCKuVXXAx6c3aHQn13rc0CBsg2KXW%2Bl0hAwPjfKxPHUmL2cpBeb4Bi7TqDLivCOAtXcx2njSS6lm2&X-Amz-Signature=7ce77a7d01c35541a69ac6697536d12cb11f85320c83818a1dde4afb6eaf96b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TQNC46L%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCICyLc4VR3Ko5XsAfJQ9x9FHE6f1gO2Pl2H%2BAsA6O9osXAiEAnuKFq2T7lXG%2BNoV8fGKfDVE3hqa50lZ%2F8g7zbEhiea8q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDMN0Tf0gdX%2FxV%2BvzayrcA7qTGXkZ5ho4f6bEk%2F%2BUbYMLaERHhyexEPWcXmZCi2OdHDJawytiFdX0LO2fZIrFlVMZGdttxI3sS3KQy7Vicpu4MfxnXONDavpxVap4S76C0ClkLIjE2CmHInXhYzyYy6vNa%2Bb8nR49%2Fcjoq4wnYYSx1st6fYkOSOgE41X4qqMqFBLTluZKaz3wD8ONLXOPJxU8%2Fn3dy8eWnOETqDI9CnWnBfzPoEz%2BL5zh5shOA09Y7JGbFpfbBJmShBJDwP3HhVTgIfDxIgZwcKFrsOWJozGBh%2Fi9Rc85A9JpU7KMUWN%2FJ7YYKL7l7Du967biLb8xUga5BBSBjRRegOxscKCDjXgizcz0V8eEjAbBCDjGYHeai8Oq4K56yzpceb0teGsjdK%2BxsXXUKw8iY%2BijzLVMwzPQ2mPJUWkBdPfIoTJDU9V6iSemEFd63r897Gi9dVp2Y2BmGEwjFjAtcJTChJdwteHsgOTTRbdnlWZRDEbspF%2FiSG7V47zFz%2FTbGlzINDfmMILLgI6gve1CNRZogHpRGC2pfIavTynIOBUIdUL1Zxb%2BWKa%2ByjuzcKNo2yumUbUxvmgqX1Rbdce0ZA3%2FED4gS2Kc9yr7pK2L05jMUcC7%2BVv3rFuEG9rfUuDUmG2UMMuLlM8GOqUBPSOVvO2Fj88s9GJGBrs8R2TqCHhWjVfm%2F8xLxXVsSeww0qI%2BocH3MKcAsvtlPtTzgCOzuFSRGR45U5vU5c7cFsoT44GmJuFHSxA%2BoTzEuDhgOnjr%2Fwxy73IgQQjMVAsoEGxIuMwAOvDW%2B5h71BqIfVYcfncJAJOJfU9P%2BATCtR6afohWyFJKYNFCBn2gAEJHofGS%2FsazfYEIHl5V%2B7x%2BZGhOphhp&X-Amz-Signature=7509666602f7ec8a621425d0b10aa4c4036f1af123f2dc5864ce6edd37785fb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UNKATC4%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDlIIMrPIDiob%2Bya0xo9wxrNbPOqCgldoizlGSETClGzQIhAIxbHP%2BYHDt6fdYN9FiNXNJMuwDrqqVtkK30Gl5p6YqhKv8DCAoQABoMNjM3NDIzMTgzODA1IgzAqTpWMq7uz4AysDEq3APfXPXktDEAwN94n%2FYKWS6Pe%2BGP6wXs9KuiRvsd1kBlUIeJwrJn6ZqTt4FUe3AxNSKedTw0boCa2E5F2vfhUMd6%2FDo%2BhTp34Dj3xBR5nd3h%2BlBqmuAaieRiE2DAQdI%2Bsp07%2FcfmlXphWys6bQRgZ%2B5C%2FHyeiuPe3gEOalOeHnhS8APU9EDSdB2%2FcdhqL%2Fum9%2FSzP3P2I4HvsAbpemrAKV6xAexwOM23F2x4U92RQ0L8u6blQWnZhnAIsBZY9k2C2pkwRk9Os0lqwBR64B9WGxpu1UQ9bd1xGtJg2HM4hJaKjaQhc5swddrS2hXnvSPYo4IJiYK4pcBzrDINZ6Enopzk1JgUjoK2QBBt1LauVmvaNROCqn5LGHHefN9ELqHMUYz1Zjs3DE4%2Ftx%2FwB2afxY1x3W8o4adMYN44NaplCzsVlMpNALGoGvxzr%2BEQSFxQwCgfwMiu7PKpLBMxmSFaJS08HLOwk0Q2S8GfgbnJTEN8wQ0I9i2KykwnzWiBPvR8eQM0vHdX0bzo953U5xuHVOkrlc3IKXnu8bLgbsah0Z906sWYZVNK6gJkdWl0QQTwJP811HlTFsOSVn590DBKgVdAtJXrzuCSIBTmjBph%2BbRRFPWUguAVVebIMwtMIzDxi5TPBjqkAaCmzOl6kqhVsWW3sPS90TBjq1rVQ1b%2B7N1r1deOw%2Fsm6tXcV6rPKAat6trqb%2F3QL8PW2k1SgmcsyJzYaMEyd1QeQHyXfyQX4Ok%2F2zTklI24JMa9K2wo49gnnkZI2R4iKjDUdBPRLIqhs8InCq1OtSZf7sDvU8ZQi1mgZlTccUu7sG02c6Yx7BIVAAuExr4sDD3RacGxBgSCGFWWcaLrH%2FELbW%2FJ&X-Amz-Signature=14d9f3b2053169fdcb3e229174223d81ac9a98775d4bf490d0f8d59f482b0232&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UNKATC4%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDlIIMrPIDiob%2Bya0xo9wxrNbPOqCgldoizlGSETClGzQIhAIxbHP%2BYHDt6fdYN9FiNXNJMuwDrqqVtkK30Gl5p6YqhKv8DCAoQABoMNjM3NDIzMTgzODA1IgzAqTpWMq7uz4AysDEq3APfXPXktDEAwN94n%2FYKWS6Pe%2BGP6wXs9KuiRvsd1kBlUIeJwrJn6ZqTt4FUe3AxNSKedTw0boCa2E5F2vfhUMd6%2FDo%2BhTp34Dj3xBR5nd3h%2BlBqmuAaieRiE2DAQdI%2Bsp07%2FcfmlXphWys6bQRgZ%2B5C%2FHyeiuPe3gEOalOeHnhS8APU9EDSdB2%2FcdhqL%2Fum9%2FSzP3P2I4HvsAbpemrAKV6xAexwOM23F2x4U92RQ0L8u6blQWnZhnAIsBZY9k2C2pkwRk9Os0lqwBR64B9WGxpu1UQ9bd1xGtJg2HM4hJaKjaQhc5swddrS2hXnvSPYo4IJiYK4pcBzrDINZ6Enopzk1JgUjoK2QBBt1LauVmvaNROCqn5LGHHefN9ELqHMUYz1Zjs3DE4%2Ftx%2FwB2afxY1x3W8o4adMYN44NaplCzsVlMpNALGoGvxzr%2BEQSFxQwCgfwMiu7PKpLBMxmSFaJS08HLOwk0Q2S8GfgbnJTEN8wQ0I9i2KykwnzWiBPvR8eQM0vHdX0bzo953U5xuHVOkrlc3IKXnu8bLgbsah0Z906sWYZVNK6gJkdWl0QQTwJP811HlTFsOSVn590DBKgVdAtJXrzuCSIBTmjBph%2BbRRFPWUguAVVebIMwtMIzDxi5TPBjqkAaCmzOl6kqhVsWW3sPS90TBjq1rVQ1b%2B7N1r1deOw%2Fsm6tXcV6rPKAat6trqb%2F3QL8PW2k1SgmcsyJzYaMEyd1QeQHyXfyQX4Ok%2F2zTklI24JMa9K2wo49gnnkZI2R4iKjDUdBPRLIqhs8InCq1OtSZf7sDvU8ZQi1mgZlTccUu7sG02c6Yx7BIVAAuExr4sDD3RacGxBgSCGFWWcaLrH%2FELbW%2FJ&X-Amz-Signature=7cd1535e1a39ffca877c8e88e0f62d46db4c35d08e0964c949d55605b0538739&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZMK2LAB%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIAfWl%2BXgZa4paUldYv7mEkEwI27irWjNAKK%2FmZhHKWlVAiEAodcMNaILXXyQVi8c7UqA9kWrqmirPdcL%2F5%2FJ%2BB54rzYq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDBzbtDsZQo%2Bzgc9UwircAyPR3TWJ6f8onN7K6z0AeQuw0D4gwNPYEhAsRrMDUzMZKoXh6kjVqoFWcRuDRM3HBEgb9ko808Eegk8WJnTSRNALwGGNhgIm8MaQ0rDG%2BTqrZep2w3zfxv8L%2BHupL2xOT7YP6RnFrtwQE9KeuX%2Fg%2B76ES82dc26DCmivn%2Bp0ERR0Lk2NIPI4%2B0zX4v8aKpHv%2FQ1LAW%2FlNtDtZPBVEgkY77Y4YS%2Bk34%2FTxOHytNrvCTssfrCFFlMfvN2AM2MkFIjeyoHOlV9cgOqlZEuXMYKc7Qz2WboA5p9DjC4DlQycqjN0BGBgzHPbfxYlV3Wz8NEIae4FUAO9mWVDXc0RmRX6ZwNvftMQDJo8uoC3KpkP1YsDZQSQ4LcZbTR9zh2kD73yxK87gXjPRrx6BTMzqg6Q2YGHp31Q%2BYDpXzXo1%2FxIydlJujQhJsY1Qc3MOqkEWK8c5mqgSrmh2LdYwggexV1SCXwyvPRnng9dBPL%2BvNe6vtJzoAjwWlliPO5PGUxtJlCIHDG0muOL4J0eOPmfhK8fsgqYZdK21tVJsKJT%2F6kFRI3ft1sB2z%2FZQq6ZeuA4nZs%2B6dFKeHKIJIgG8nxfKA2qzZHletWdn2fSCZKrxf5QNNtI3Lz1etyUxEU%2Bd7rNMKyJlM8GOqUBglzfPjuLHw6EbUO68Lvq5Qv0ikFLa%2FCiQJbzH1708KZQ5MKQiFY%2FQe1LE75Ms9wA4zYz8GAySfspnJKNyzoK9cUFskmMLRS%2FrfNwlO6Tu9r8wsqlbCt%2Fb03U%2BMCySsgNNiSKLGWBys9JJy65jJeYZm39eNDZ0iLEfBpro%2FxjXIa00NeUwEYKlFfikyLP5dCcgn0UFhxfzHzb3I2zWaJwHImqFFtk&X-Amz-Signature=6b675d7b16450956d90cc80e8d692efd44b0534c7c08853345df303a0f2f3090&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTHH6TGO%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIH8%2BqHM0IHbLlSNptKMS7o3ifjnAi%2BlQchz9cOIzrKl4AiEA5QLOH87bjFUDBnQkKGAbLbKMe%2Fy8%2F9aq%2BzpDvV6awg0q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDLXgTioht0vh1U6L2ircA3uxiSEIdoV0TZMb33Hz5opW6CTmaE4VaVPlLgReh9O8wrPd2gME0JXpLGtg7b8CNcjjGJUzW2Qfx%2BGPEbaLR%2F8asawt4reIYahUKShaVwPQ09TZ5UmBC6ATb7qca%2BZhynhWDU3i2hTKXaUBuRjMg%2BaN5vuqnZdp7cq93G6cRnB50X2PW60GyyzYY5Oi7CNy4dX2sxemF4bHhF%2FMqhqgD2BRJJChm7HL8dh7INKcDt%2BGHJq0aVKrTFx1giWjP1%2FLX%2Fhmi1Ec9esErsXS25uCnXaLAaGx%2BFiporAlIThDNlbodlMz4UzUKna3eXjSmxnZvYqjtdZHA2Ev4CBW15r%2BCTJnhVY76vRWIfz5mYZEr6%2BtwWloCvnrAEMuOsJtyNdTUuXDt5WJJ9i11OmBWnq2jRdUNt2V96ZXPDmBt9uajZSMeqEoh5XRDKKHFCwX1bLjra%2B%2B53wpQkBfR0hL7dj%2FPXifZDOZS5VHc0UZQAtlXnga4DijBHs%2FBD%2FXVSc5IN58XYaCKRGT2X%2FXzpidI9s3h%2BULu1S2Wvh32O5Ffc3pl7hVx%2FYuWd32HnGtW1v4vq7XQstnwYAYe106qRLFdmHbObWE%2BDHQjLheYdaQU6h8B%2BzRzIw9AywKHqvJxdFZMJiJlM8GOqUBDPnGnOlcX20U5J1WRasFSByIR2YkT1fLz%2F7WRH4JjptArC3bBF6CqBJz1t6%2FFPYNzZjFiXjA2Q3ZoGZ%2BLQOfsuFs%2Fq2a9rdtyeDXxcj4GTiB%2BYNOsV7izK2eKYKgpp9GUP8J130MP30cDlK%2FOtVu6JAEIXBPqF87Al7ZvTIdJrauYO%2FOGWH4%2BPMDIJPghFM0VuedAvLAhCDQCU7LFZR5t2c25yBC&X-Amz-Signature=8dde6ef3bba9629bf45ad549c6be78ce80b7dd180d5d54c5d3ab373aeeed6733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTHH6TGO%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIH8%2BqHM0IHbLlSNptKMS7o3ifjnAi%2BlQchz9cOIzrKl4AiEA5QLOH87bjFUDBnQkKGAbLbKMe%2Fy8%2F9aq%2BzpDvV6awg0q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDLXgTioht0vh1U6L2ircA3uxiSEIdoV0TZMb33Hz5opW6CTmaE4VaVPlLgReh9O8wrPd2gME0JXpLGtg7b8CNcjjGJUzW2Qfx%2BGPEbaLR%2F8asawt4reIYahUKShaVwPQ09TZ5UmBC6ATb7qca%2BZhynhWDU3i2hTKXaUBuRjMg%2BaN5vuqnZdp7cq93G6cRnB50X2PW60GyyzYY5Oi7CNy4dX2sxemF4bHhF%2FMqhqgD2BRJJChm7HL8dh7INKcDt%2BGHJq0aVKrTFx1giWjP1%2FLX%2Fhmi1Ec9esErsXS25uCnXaLAaGx%2BFiporAlIThDNlbodlMz4UzUKna3eXjSmxnZvYqjtdZHA2Ev4CBW15r%2BCTJnhVY76vRWIfz5mYZEr6%2BtwWloCvnrAEMuOsJtyNdTUuXDt5WJJ9i11OmBWnq2jRdUNt2V96ZXPDmBt9uajZSMeqEoh5XRDKKHFCwX1bLjra%2B%2B53wpQkBfR0hL7dj%2FPXifZDOZS5VHc0UZQAtlXnga4DijBHs%2FBD%2FXVSc5IN58XYaCKRGT2X%2FXzpidI9s3h%2BULu1S2Wvh32O5Ffc3pl7hVx%2FYuWd32HnGtW1v4vq7XQstnwYAYe106qRLFdmHbObWE%2BDHQjLheYdaQU6h8B%2BzRzIw9AywKHqvJxdFZMJiJlM8GOqUBDPnGnOlcX20U5J1WRasFSByIR2YkT1fLz%2F7WRH4JjptArC3bBF6CqBJz1t6%2FFPYNzZjFiXjA2Q3ZoGZ%2BLQOfsuFs%2Fq2a9rdtyeDXxcj4GTiB%2BYNOsV7izK2eKYKgpp9GUP8J130MP30cDlK%2FOtVu6JAEIXBPqF87Al7ZvTIdJrauYO%2FOGWH4%2BPMDIJPghFM0VuedAvLAhCDQCU7LFZR5t2c25yBC&X-Amz-Signature=8dde6ef3bba9629bf45ad549c6be78ce80b7dd180d5d54c5d3ab373aeeed6733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NONEJ5X%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T172446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIFTwBGHHrw0tBvL8VncXksatf13JRyJ%2F%2Ft0Beu8DV0QKAiEA%2F%2FcJgOwPFEYabFqqXNMg2VRq469dYqI1qYpxCfXX8XQq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDCTiR2eD3pz%2BeFmyIircA7wpXaS2rKZ46JLcnRSu%2Fb8KEhS41X8jZTDv39cAVg7rgN2kSJmr05EsdEbkmq0W4zVMgn0hUF%2F6e1cdvHIJ4E7hzDqsRl24yfMiM8aUwFSSeVIIACpS69P4urLAgz1Cqye0a6qcMQ6qqIEoohLNmyW%2BSnj9yKOHGGffKubyOAqW41fHRc%2FHDk5L3q6S2eLopqfOZdb%2BPpnM95q5HNtGvoZNQrMMMbg2HEDJqwH5jKqZ%2B8856vv8rA3SxfBtFVvgfnTP4tEKIU9S2IKdC8sPKOn9D4i5B8Wp%2FEQB3NWSs5brTEjnhM0R5T8nUVLx%2FureizyHqhuXvugI3h5aIjQ7RPEehdRVP4IwsqDZZpa4tpoGcOP4BHAnzhpKBceEuPYXEYoMcQfMXmcvzNsLBNsvulDcpSf1DWe9FrWohW%2BDsXExasxAI%2FxBJLXmq3Hnd6wj29geM0oNgiKnH0PvHWLOV34JsCi7ZUZcLfKnJekyVhrhsegx6CYsTIpxSy%2FOKl6zy7ORStJzQkDGzAlzB24pF%2BMikhMqcCG6d8OmOvItTOowilMro1WbIALzmyoDPBWAq27G2B9Ef8%2BpFAZa3QjKvghY6Nm5soO%2FRMAs98%2FWOxOHl9rA4kPZLTlvbs5SMLGKlM8GOqUBAELDrKDb8Uj4%2FuW%2F9HnXQpXPbRZRWIG9YNXIM0JL9dF9ER2YTWCt3LjTc4U%2FHjMP8vmQwO24ezlVA5tVNtSTHtsi6dDvcShSWAp4Gj0fpuRfDp9Tc%2Bwkb7koknPXL5Hr%2FR6LJtbInRJVM9fUhyVBbxubGjCkKKwgr4rW5rkycsbdlweA8uF3wtBcKo6AVTOJmCpq2tcewVbDAVdUnwxzdLQi4swO&X-Amz-Signature=a6b790a43ae3cd1df8672d1ec587854a2b536f8c6f5c089a9028879ae9b2d865&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

