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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC2NMQLA%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQD4ALbmOdx2zuN5dIjJy0n7CZTh%2Fj82oLV09fqH4cuYMAIhAL%2B61s9dP3SYKymtGASkPVDvEb2Q5jRoxjOtAVBz1cX4KogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxbl%2BRrIfbTADb3k6sq3AMuA7gb%2FnmsPGjI2%2FN012FwijMNZMukQTmUqxvWRSUulFWqprH1IZTcFEV1Jd3uM16kNUQ3M1mL%2Bn0UJHSuujglvlhq5z70v8mHx1OSui7ya%2BMoifzGczz4xw9pa%2B3y8pPrXMjgUKF0XxbjBSpGRDOJswX5UJNvOBIQ9U3j1HcD1oU5mqsXQK3yt2EhV%2BUiq2b5VqrIbTG2m2ipAAUC5OT%2FX5M23Uk38bk8uXf4FpQgBb9i0TJKwVx17%2FjVVNK4M0e7DL4KNvojCa5arHFOjhV%2BJdz%2F9MOPL6Qr7E3qeRHlcrof%2Bwsxpprfjpz%2F29NjH%2Br8aP1M5ELoxzm0%2BWgq7Coj1CQ2eVcdLT4h2hWhoG0pccJNxAlcAkX2lJevutwWY%2BVahftzAeNx6LWbxSH6dGbYb31LylQ1HUfFcBDkQ8KBU%2BS%2BCOG0v7RNK5AljdEwkoSO9O5SaspeCNqZBtPLI8XdeIKTHQ%2FxL1DvbbYch0t4oJI%2Fjm%2Fp1dDMb%2BFp6YfTQHvx7cbVofohaCLA3VjuZRkysrka521XTl70OEJ%2FkdDZ5hVZNsucpUdJq1jizqutvfqiel9Wp07WDeK6RqhWAjx%2BgAZCReiLcAYjtmtjkIYUALf9ardyYvD%2FXIKGGzDbxcPPBjqkAVnti%2Bb9b%2BmwbUUDlgJoQsZaO8eV832vyX9aN9YIXizwwvC3bkJyV8iPrZllQqNo9ANx8A4Ew8BxDqJ0%2FMnmNnkIYe3N2HYo%2Bk6CMRC3HnOO0nrcfOR4OpLU5ni8RFT0INafZ1Dqd2BxkqxlQUHYJdC0pKp8iVsuL1J9yJPnfHkCgHKD1ah%2BfSsfdkGnMG90Sgta3hodF70ck3ixXxqShTtCisWl&X-Amz-Signature=a765e54c5f0ba800043904b093774fb12c5ac747a46252cc31ccb956ba1876ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC2NMQLA%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQD4ALbmOdx2zuN5dIjJy0n7CZTh%2Fj82oLV09fqH4cuYMAIhAL%2B61s9dP3SYKymtGASkPVDvEb2Q5jRoxjOtAVBz1cX4KogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxbl%2BRrIfbTADb3k6sq3AMuA7gb%2FnmsPGjI2%2FN012FwijMNZMukQTmUqxvWRSUulFWqprH1IZTcFEV1Jd3uM16kNUQ3M1mL%2Bn0UJHSuujglvlhq5z70v8mHx1OSui7ya%2BMoifzGczz4xw9pa%2B3y8pPrXMjgUKF0XxbjBSpGRDOJswX5UJNvOBIQ9U3j1HcD1oU5mqsXQK3yt2EhV%2BUiq2b5VqrIbTG2m2ipAAUC5OT%2FX5M23Uk38bk8uXf4FpQgBb9i0TJKwVx17%2FjVVNK4M0e7DL4KNvojCa5arHFOjhV%2BJdz%2F9MOPL6Qr7E3qeRHlcrof%2Bwsxpprfjpz%2F29NjH%2Br8aP1M5ELoxzm0%2BWgq7Coj1CQ2eVcdLT4h2hWhoG0pccJNxAlcAkX2lJevutwWY%2BVahftzAeNx6LWbxSH6dGbYb31LylQ1HUfFcBDkQ8KBU%2BS%2BCOG0v7RNK5AljdEwkoSO9O5SaspeCNqZBtPLI8XdeIKTHQ%2FxL1DvbbYch0t4oJI%2Fjm%2Fp1dDMb%2BFp6YfTQHvx7cbVofohaCLA3VjuZRkysrka521XTl70OEJ%2FkdDZ5hVZNsucpUdJq1jizqutvfqiel9Wp07WDeK6RqhWAjx%2BgAZCReiLcAYjtmtjkIYUALf9ardyYvD%2FXIKGGzDbxcPPBjqkAVnti%2Bb9b%2BmwbUUDlgJoQsZaO8eV832vyX9aN9YIXizwwvC3bkJyV8iPrZllQqNo9ANx8A4Ew8BxDqJ0%2FMnmNnkIYe3N2HYo%2Bk6CMRC3HnOO0nrcfOR4OpLU5ni8RFT0INafZ1Dqd2BxkqxlQUHYJdC0pKp8iVsuL1J9yJPnfHkCgHKD1ah%2BfSsfdkGnMG90Sgta3hodF70ck3ixXxqShTtCisWl&X-Amz-Signature=a765e54c5f0ba800043904b093774fb12c5ac747a46252cc31ccb956ba1876ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FYYEA3C%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCID9aO4xbvlWmIL6qzfAHVsvoTlXQkQBD8Z%2FDUtX2h0OTAiAreTNz%2B5b03F0YC5RQCYcRpkjiJVHeBKzezYVmzIciqyqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTwx%2BuokoZOdkDt0zKtwDyzblQnAol%2BoR7h8B37uT9MDzbF%2Fa%2BejDZSM7oY8HaoYn3CSkffM%2FTigALc3ZzysvaP9%2BGlq05C2hP3lLZPq5s1ijmnunAJZap6CQV5JnRduZxygywgXzW83LeXhWaje6z4xiyuKErH8P5Z8zGGjE2JHTOIlaU%2BmKaqnYqWk3v1ulVw7DHFWN9IjHUkTwxgXA6zZRH798rTftW674uZSFhT8q3pJWS1IfWOUi%2F1XlvXaxPx26EyZhOhhsVzWaRcCeZ9NLS45LkaQW3%2FPf1IpYvm1Rl3TlJFKJpxvwrni%2FZVqnZc1apsxoibRCMOuvLHBD9iF8zzc6giJjuaiLvlMUnIhn%2BZ%2FbwPu0H3%2BoTPjt3GwjIk26iujG0p95OIkJB1j0jdcrorpi8A4fDzFg%2BSVtn7aCtnqRuPZBamxh6%2BqOSK1jeGLE3ReRq4bNqUxmzhwfxTzwO3AnbwkVImYQ1xUxOFN1lgzNmMNTnxeoiEggPli2EvXXQIBiFPGdXeTZ9LE%2BMriE%2Fawz%2BLl9N7QSZxLGe6m7m9TkvNQ21VeYV8Cys2saW4YSuqf7s1YeBYruvi7Xph0DOKP%2BmGWEiGkG%2BBiU5UHc7y%2BD5Z6d6DePPAbDgiM6x%2FofAT4H1Tvjs0Aw88TDzwY6pgGry%2Bsh%2Fh%2FlNg0wXJWeEkEcrqk5wChoSClRGbDMVfb7m%2BUzdSOrOROMKFSnesuyRG2cVy3j6BK13rG4lXf%2FSoPqqyuLoWVoZVvLWH%2BuiZGDf%2F0HEOmzmEuPz5k7B5Y78TyQE8PM%2B8mg%2FgYBF3DrMiSVHc%2BxvC2CaZXCP9jgUzgMX%2FFfY2Kj4MhYeLA05SPeYHRmFQittBKI2KSJoGIS7xLdNklXUeuu&X-Amz-Signature=5582f75ea3a640b62becb0b83847457e60989dd498822f9af87bdef4c5b37354&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSJMTDTN%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQCVDdNfhKdxaNrqWc%2BgOStJlOGvSYsKTPyc5xHOkmTJAwIhALeSbgR8dseatTdtJhrm86AiPfSvXAPAd3NHfD3ffefuKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwjN6PTNj5wRsozcxsq3AOOp836xPA7DYXR0YMG1IwoolbrbmRXbCJ%2FibiQ%2Bwh4p41UOOI9nPVjUYilb7rgMSTPr5bMUF2m9k9xKpwn3N6oM0djCuF0mUpOcpv7hlOx%2BfZwvw99THq2AzAq1eXcn6Y6qJM74bcu%2F9fv%2Brm45SJL4IXL8evmxqVEkAo9qnR8TrGkyorm2L7LQNFdfqbaI%2BM0c%2BTir8QytfVD%2B11RtPhGFmgjEc1UyEAoXLffUo4ytZRzHLgpV54U9F96lZs25mVyNV4OO5xncLiQDEGwFcDYR0JxBWYxyjEDWj1J6vmYxBLbkQO7Id8ABsDU6Qk6qQ6n3g%2BODmblu1wnu%2FzfD%2Bc8YeN7L79b3iZ%2FLBgsaQNQcPCpqR9pkL6tx4tpbFB%2FkkVOOPx9R6fWI8TBOaJ%2Fqh3jg6%2Fk7BlTLCD9sLG0BriS8Sxwo2b8x7IgwFJy3lWyKgin6NjygUkIhiG0AGd7GjUtCLFkjlVa32d5f0FGxKN999UhMG70Hpy6eUe%2Fhr%2BVQy%2Fxwduq8zz3w3yZ9iT1SXwknu4fY0BLvtY3Xo4%2FRt5X5Z1JMRNDAcbnbGUF6105uyTZiP7H%2Fi06jDSxGLdMeR7%2BdF6jA86fW5qA5qEwHYViHv6E5rOSq4oLM9wElzDfxcPPBjqkAVGQMPt%2BemfkrJAdZ7nKNhW7I0gnf9Xo%2FO5HmEiwz0vTlSmk52I1XESL8pAhbgyYZ1jqwxoiSK3H%2Bc9UHH11wSo7bFQTyYp0AS1n%2FxzmN0rZ4fHc9%2ByItQzVfMaWo7FtJMCYpFfTCiK3vDYSRq2qOltodUotj%2BQTWtnKK7KJYTcalPHV7FEpGgHi3z09dnslXyuI7QEqkOTYcgnBHMhVMpnDsbnY&X-Amz-Signature=0e2ee054dca3cdb07b67df2f369ea0dba2d6e46098012f17bf729ffeb132dc4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSJMTDTN%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQCVDdNfhKdxaNrqWc%2BgOStJlOGvSYsKTPyc5xHOkmTJAwIhALeSbgR8dseatTdtJhrm86AiPfSvXAPAd3NHfD3ffefuKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwjN6PTNj5wRsozcxsq3AOOp836xPA7DYXR0YMG1IwoolbrbmRXbCJ%2FibiQ%2Bwh4p41UOOI9nPVjUYilb7rgMSTPr5bMUF2m9k9xKpwn3N6oM0djCuF0mUpOcpv7hlOx%2BfZwvw99THq2AzAq1eXcn6Y6qJM74bcu%2F9fv%2Brm45SJL4IXL8evmxqVEkAo9qnR8TrGkyorm2L7LQNFdfqbaI%2BM0c%2BTir8QytfVD%2B11RtPhGFmgjEc1UyEAoXLffUo4ytZRzHLgpV54U9F96lZs25mVyNV4OO5xncLiQDEGwFcDYR0JxBWYxyjEDWj1J6vmYxBLbkQO7Id8ABsDU6Qk6qQ6n3g%2BODmblu1wnu%2FzfD%2Bc8YeN7L79b3iZ%2FLBgsaQNQcPCpqR9pkL6tx4tpbFB%2FkkVOOPx9R6fWI8TBOaJ%2Fqh3jg6%2Fk7BlTLCD9sLG0BriS8Sxwo2b8x7IgwFJy3lWyKgin6NjygUkIhiG0AGd7GjUtCLFkjlVa32d5f0FGxKN999UhMG70Hpy6eUe%2Fhr%2BVQy%2Fxwduq8zz3w3yZ9iT1SXwknu4fY0BLvtY3Xo4%2FRt5X5Z1JMRNDAcbnbGUF6105uyTZiP7H%2Fi06jDSxGLdMeR7%2BdF6jA86fW5qA5qEwHYViHv6E5rOSq4oLM9wElzDfxcPPBjqkAVGQMPt%2BemfkrJAdZ7nKNhW7I0gnf9Xo%2FO5HmEiwz0vTlSmk52I1XESL8pAhbgyYZ1jqwxoiSK3H%2Bc9UHH11wSo7bFQTyYp0AS1n%2FxzmN0rZ4fHc9%2ByItQzVfMaWo7FtJMCYpFfTCiK3vDYSRq2qOltodUotj%2BQTWtnKK7KJYTcalPHV7FEpGgHi3z09dnslXyuI7QEqkOTYcgnBHMhVMpnDsbnY&X-Amz-Signature=98c3efa49023976b7f3307c0fd0d2298bca71f0408318a7a506e1cd292a03922&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZYRTAJ5%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIEpqO1zzTrVJyo2mzBORAFjU5Ls11xZa63KSchNQsuYnAiBoagde7gCwTgAHeyK%2Fy%2Fg9SUoGHeUkviJNd2WXU6Xm5yqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM22cvoId55g24fcY2KtwDXDs4FeSv6wISlTPCH3HGJvNLQfpknqmHrRLzeZMlrfAr31V964qhpusJYvTv88eoKeEFzcI7u7FjkmjDupE1%2B11K3Q7g80shqvOsjQvU0TfScKCen40Mc612eQg%2FLqD6sU%2Ft%2B29KJYp9AI6mrR4CruYOQAGYxYC6utDGtY76B99XIsUvDy9HrBakupuifVzlo6jAD%2FFLYGXQLlrwzKLAdjwNUj0lpZdz40LUgOqrGsLCewVit23pjpoTdkyUSrlln5m0xdA0DhlfCpayqAaxRzhL6VoFPSQOALOPnFIGDyYX7fYHhhPqqEtzGs2EGNb5Wr3sQCq7U2oZLBmVq0DE2B3SYW%2B%2F1O4hn1Nn7bPevYUeuF50pW2so7ArLM9AGN366QddjeVIMgIBLsTA2x9SfZLvLHBzrAQhW2ppOaMifFL6FGW1C%2Bl%2BdSY6Vhtc%2BOtNuX8mD%2BrkTIYKsYTxXCVjrX%2BXqPiE%2BEIcWWXpDZAMreDucKmlSRAmxZVukcbthG%2FH5MVZgvobWLnd5wmIMFbiA0TLy7RWt3SaSImWwgIG2WqE2oZpmr%2BG3W0LYfx1cKDN7oPFp84D1oO5VIkr5zhDzwOamudFZKV2XjJ0cUaH40nUvwulPGU3yxNGHmgwyMXDzwY6pgHke%2BTDEWbjRh5kcFIVrVTe%2BIgIbafuZrsSJI4asO5CvoSmDHABx2TDtqFiWiS%2F%2BgVzX%2BZHJd%2Fj3B7XPYNaH44GjMeYDGO9%2ByMceAxWcM14avrjMxi4LkP5YU6ziZypAaCOEoj6I5aiGdn23MVo4hDZs2Ws73l9VL%2BsvsuOeMbt6tZRDCe8bgV695z0qy8G2y%2BOmhn%2BcW5nIddfYUY7WAChABqhbtY%2F&X-Amz-Signature=be0e6344d29ce04892d8fe811efaf4b18c92de731359f713ff70999c58b0d97f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676CQIJZ7%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCID2JTTJIc0pfSsPktAp7dVPeIdxxQz9JRfAYodIxwNp6AiBRjVM7WR3uY083Cqxup1cmr2lrVsJ%2BtlWe6UTSGr5ZpyqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnxfQaxCQWDhH0Rd2KtwDvCn1qxkeeJWOwAyykqgerCdpg%2BT3Q%2FFmbx1d5BmROGfgjrqxRnl7sfGXUbrMr71mbT5W%2F9jBBnkZTcF6ZCqJ6FbWQAjbEcgyYH4ekgxlIvQoKNPOw2abmu3ei8bND3hiHaPqFK26t8ZxWLjh2dTXVlBkoVxIVFlL019ejhihvJFMc3aWE0uAVQGRGRUiGgOpXaGJz6PgqPncij%2BQR5O%2FUN%2B7YPEPkuHMG%2F%2Bm50A5%2FDYBu%2Fw23xbqb4DLRvX33Ts7DVazvZLF0aqRs4nZypN1h1MymLOdyLmCejSkEkmwP1AKUz5tZWgMDwz3ifV3HkWxBsmwxuadZ9ROULGF58hNm94nAI65s90N97GjemK4wRmvmsgOZ5kog42tmFKjb00a3nIX34C9hEG87Bdvlsxbjpft4EUBMMktemf2MwcfMdEGal2FB2HM1%2BH0xn92Bdg53gvqnUB3VHun9k97CRZ5Un3VMdBnQEDQA7AP%2BMKwKkR2pzKooItngjlAjwkSDWhxQ3kTeWOP2TpDlu5A6clSuJYDhr53uz%2FR7DpDIClY1von3w5vLkXBNqG3rcjbSbnoZQtitedG8bainbkRgxlu60rbGHWrZfzHQSW8rl5AS9RAhqGwH1YDhRd0FwAw4MXDzwY6pgEUoTf635XUmqsvyWKv3EYNGFL4fDmQC%2FUEZ1Yd6zhfmSwD5484Fvhz4IrN8inGn9gCEd3qmT4PwEhJEPKJTh65tNFw92d%2Bxz4eQmEfYobVBxTvOmmzAnOL8oTg9i0ScmrZgFpziuPp0RJ4HS8q3EZoRFub3KvjDQ3y5t4G%2Fh3cALFuIr76NGAUo6FlprUgqWCBsCJDU%2FxEy%2Fg5BmuOsEwuho9C3YfL&X-Amz-Signature=6e69e705f9ee2a133097e89451af2e36f9ea303a71b4e8bab54c686c222eb41f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YN32CWQS%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIAFq6PQkCEbzS4cGxpFP%2F19zzs89U0NEDMlmaSL3T5%2F8AiBL9qmaJYmtOGOh0Uc1ZNMPNK%2BIiPpnJmgS0TQEVy%2BQBiqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMaO8YVJdZrbfsfkdJKtwDK%2B4bEF7ySgRZV5eFtebGvfgxvwGDMW1p0cBu8%2BI7eW6e%2FCg4WzjoxJCCuXicMLL7CPEc8Bc%2FqT4RlFV3IXcJWbIk6X1H2r9CzI0No7XsUcmzZkQnPdYiWTFuTYwEJOC9dzpB4AreEKXhJKbAkwZm2PF1OPB1TBU1O5g88pr45%2FzZUpwmrmYfGXrsxi3uzooZGaz4P%2B2cmyrGgacQ6JslpmyXHdV5vZBqa69f9Ti220YOG1ik3SKtZ3lO2bUsb3KtZe9SNhusJWq9OuwTPUe1KgtxPf%2FT1ABWVcteuoNlYU3e2V05D2n2huS5E%2BBhrTURigCpKqaX1Kdx%2BbHizxjHYmOP7v9DwFC6RkrX7aVhQa5r1TlpjVaN0Rws0IMhyNCtmqYOt50I%2BG5JmrjicchCIJqUGpefnJS1oQscl67k2yASktRjGfVf5UeeFggeBF1SGuwgu70Ktb1Mw7QlocQQR%2FGB6RK5Bp2Rbw7NVBS7jlG2AusDMht6%2BYIylcv6OOqgSmfCaL69u06QL%2FIw6s5CUvy05yILHdonsisjD450Q0DEq02I1Vg7Zelp7GZ4rrLSkCtPLuDL8SlqmH50C01zVQAPjIkc2qsAwAELpPzilF4dq2uuLO8kA4C8bwIw0MfDzwY6pgFcAkHvSRnBHoVvulpUf%2Fr3Tfi5hPzoG3opPkGmME8tUdl0yoK73G6kI%2BRMRQeqXi3rpI4SaLoL8cibkWevsltlS698KTcyfAeUEePjd4kY7549qtvKKb5p5b7zczxoUDjcKBeKqzmIun63UPjnBLQgtUkrdluvsL0lRzw%2B74UtW5Wc8HhLLK3f%2BAz%2FU3fPkAuUvkcJpXaI1rd%2FCtt79lq7hZVQ6pyu&X-Amz-Signature=6aae106ffe5ddd8ce916dcf083727ef59616efd707b3cfd9242c463c4ee96056&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SM3G7U4G%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQDHNRuu6B0ikj1mdf23j9wtBTFnxnYArOzV%2FTKtYSPOZQIgFUjfpb2C1PfOWDGtFJacTz0u6dC0XtANUwbenIu5rX8qiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGH4W6iF4hpWRO7wFyrcA2otmJ%2FOQOxGWqIj8frdrWdtdc8NU4wxQqeEeIn%2FvjUcNrt5FGrwX4l74f8aTNW5EX663nsbmqxFWk5AGLLwF7nBMf%2FQF0P0LUr6q%2FwXXXG8mULXo9MqnRoH4xAKzYCwQfCnra6Hyq2eXeHE5%2Bi%2F1w%2BE2u7eGUB6gBZs9o%2FTdn29VsEND2CgsiVIS2Bp%2B4%2BVVZj2I70OprSc70oEzvAXbqFsyBj7Vssof3g58LDxABycg1vemxT%2BZYksRAddvSkurlYAV21Rd7vuH%2FK75pgsxzPTq4Un6Q73X%2BKZIhdE6O2Tunbgif2VnI5uDohpd6icukc8edO7uy93yYt7lshsLnEkcGDSF1eQ6L7f0X%2FtCJpfOqmrV30qK8yCepOc0Sps0NFgX9z8Jd0rseT6Arp14SzeVBlDundVXfuQQJnYi9g3E6t0gCSAx0%2ByGSSj%2F1v5o00myUX4vbNPDh36nA8Uw7DyX8CBzvsvcScIjrAKFLDyrCNt1KC%2FmZofb%2Fl2J3oqoW%2Ffi%2FAbqJI40kan%2FZgB6uVzFprQgETYRPAsly9YjQOOV8Kvw0tSWhjhg2jlEWgrd4sVPNnAAz%2BOOLw7uhZMAymp7kSqHPxHYy%2FFEePcsnfnBldCZHIXvScNQelkMOnEw88GOqUBZ1jdGpDlBbvF0tr7dxKrC1Jgr6zNel4%2FKQY67Rm3ZMhy5yENlIAhBSj5KPwGtsdQWn1otbGaccQn32u7fvo3aZCDAmQOYZFYKLgQ%2Br2UJYvQeBcOWYUCIoubBw1jcE6KvOYKDROgm%2FrDXqepuoxA54xlG1VPSbvlmSDHbUUaF5PG42t9qqrNisbiJ0QstElxqK3Nr3T98dbQcuhW0sIQ7Jxi%2Bb%2BA&X-Amz-Signature=1cc59f985485f805714eaada95196f8f9aaefcf5527aa47fb0bae379b2b7cee0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SM3G7U4G%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQDHNRuu6B0ikj1mdf23j9wtBTFnxnYArOzV%2FTKtYSPOZQIgFUjfpb2C1PfOWDGtFJacTz0u6dC0XtANUwbenIu5rX8qiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGH4W6iF4hpWRO7wFyrcA2otmJ%2FOQOxGWqIj8frdrWdtdc8NU4wxQqeEeIn%2FvjUcNrt5FGrwX4l74f8aTNW5EX663nsbmqxFWk5AGLLwF7nBMf%2FQF0P0LUr6q%2FwXXXG8mULXo9MqnRoH4xAKzYCwQfCnra6Hyq2eXeHE5%2Bi%2F1w%2BE2u7eGUB6gBZs9o%2FTdn29VsEND2CgsiVIS2Bp%2B4%2BVVZj2I70OprSc70oEzvAXbqFsyBj7Vssof3g58LDxABycg1vemxT%2BZYksRAddvSkurlYAV21Rd7vuH%2FK75pgsxzPTq4Un6Q73X%2BKZIhdE6O2Tunbgif2VnI5uDohpd6icukc8edO7uy93yYt7lshsLnEkcGDSF1eQ6L7f0X%2FtCJpfOqmrV30qK8yCepOc0Sps0NFgX9z8Jd0rseT6Arp14SzeVBlDundVXfuQQJnYi9g3E6t0gCSAx0%2ByGSSj%2F1v5o00myUX4vbNPDh36nA8Uw7DyX8CBzvsvcScIjrAKFLDyrCNt1KC%2FmZofb%2Fl2J3oqoW%2Ffi%2FAbqJI40kan%2FZgB6uVzFprQgETYRPAsly9YjQOOV8Kvw0tSWhjhg2jlEWgrd4sVPNnAAz%2BOOLw7uhZMAymp7kSqHPxHYy%2FFEePcsnfnBldCZHIXvScNQelkMOnEw88GOqUBZ1jdGpDlBbvF0tr7dxKrC1Jgr6zNel4%2FKQY67Rm3ZMhy5yENlIAhBSj5KPwGtsdQWn1otbGaccQn32u7fvo3aZCDAmQOYZFYKLgQ%2Br2UJYvQeBcOWYUCIoubBw1jcE6KvOYKDROgm%2FrDXqepuoxA54xlG1VPSbvlmSDHbUUaF5PG42t9qqrNisbiJ0QstElxqK3Nr3T98dbQcuhW0sIQ7Jxi%2Bb%2BA&X-Amz-Signature=ee91cd413e72f59a395c3435d2b5f228acbac46d2b640801624244e624ae5730&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXXGJTSH%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQCgKzjB9jMnTNRpwL3tBw1rCq%2F%2BWMWaN9JK%2BDbvTbAnuQIgLi23%2BHRr53bmvlgj07G7qP6QlENJAqsC0vfnNj3DiCMqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHb2jZJvYCcfYYeURircAyOK1mU1wFlgnFFHqiBA6PReUbyFrTdle%2FUaMXy3MW15%2FTRgdqL9F3ryOAfkwidaIMUnN7bW6RAOmLFhgZj%2Bex6ZHyw3u3vkFGy7MKLO2zqk3pSlFmXriNoISamMAwTMI3v%2BBC6ZftuTAkDQH7xY2iYQvurRnlbdHhwyqtB%2BPp9707%2Bq5zytsrscZaZduAs7TwyP77d1hBc8jyRRG1hA4tXBOKa03tZAV7W4N00zVqYwNWBs6VX5bWsDBubI6yrE0aShoKGL7lrMTtHgeky6OO1TvMwNqSOhOIIxabo9vQAugbj%2BJ6RIcbGRaGi4V6Lt92d510z1S9eKcloRaoiHmFYaXOqqig%2Fa5u1v3h2IWW5kQb4fy5CUap%2B70ppffvoIRx%2Bv9sgh97mVdeJ90HgtBp%2BJNDRdclGx%2FnBS5luvOmcbSgqdRh9f2f6RNpgd4Rs4pV3ajUe5i5CCv6e2scCqmAlXpZjXIzhL%2BKlu%2B4iWbpkcFl2gGoaBQ75GiWvDfL%2Bq6Alr3xhSLyrDE18e%2B%2Bictp6ty1iwLbBWKCbmr4jp14nJu%2FwOcD6Jdvky1gWxBxUfPm4h9n6PSdUrkzo495%2Bs%2BTA2gue27Vg7wSDzQUX48BfGuRu8QYcYOqb3R7eXMJDGw88GOqUB4MCpw5UCDqB3S9K2yOESY%2BF0BNZ1%2BDLB9lsR0Q6YcEW%2FPtVrAlaGB%2BY2l54yflYk5Rr7rNyCU7RHXnSQWnnf1rA%2Fd%2Fq%2BddpyM2JTd4kRWfSj3AxY9Uc9nRErRk3PGt9N4uCWYsUp5LYXqk6ALXIAaSP9gG%2Bmn4J19UsxN8t1U31XSlO99OAQ0eytqGDu6%2BvJQi0OWn9XfJj2iinzw2gRP%2FpJql84&X-Amz-Signature=d91fafd07ac7aff03e0e6b021fcac645af24dc6613d17ab0f8b2c27281ed5515&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAP74FUT%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIAtYD9muOqeAs8BpPAMJb0190q2FFvCdDHJcINqnIF%2FIAiEA8jp%2Fcx4qTWnu7BHa2W2L1M0CvUQ5caw8%2B2eW85YryZ8qiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN0yTIcONL1o7b47UCrcA4pZoF4RVvjGk%2BipgVO82Gy158n6%2BSbqMEAl7at0UhLYmDt%2Fi%2FOstw4g6f5p64gKhpaSecvuDqd0%2B159qO1TgH3YvAd7wkb7e2las4%2B0wgZOIQWRgz0BBi%2BTpc2mRe3t3Cslv0hFKPJWCMjM37FAH7bMnYdjFedCrXTVx7qMT%2FGa3eKr2tjvntQALGjmL3BofZG7W2iv9IogwyCpaAApeLptaGFaBigDyjiQKNPB4SweYn5sd4zypGUxdSv1ryPlHlJIobp4%2F14D9HjX43olU%2BnlIbpZQFPEdHFnKhPet9voXbXhGfTQQPpCTPIo61p2dzjLUKXPopgcfN9MAhf%2BaxpafJtWD3eb%2F%2BMFvKNCuCh%2F4jT2hm4klT1ddE4YDjrLCRG5T38Mwi7QKmYBSz2RnhOUm%2Fgp%2BYFS9tmZHBpaMT3R3ij1WnWIdQ7vz%2F1ypPaiLL14LruNSslOe0kxo0PHYGCPDhs4KmZ30MnPk54CIHkby%2FOxXdQ5gZzZKQQnydLVyE0ENcKsVVHpa7nI%2Fa54vPn9366orBk0irZqY4%2BCXXGvB%2BMu%2BYtKaPc%2FVgRTzM3ioeq8ngjxvIZqnY4hDsitN6rgVSpxIKeF7sxOY8rBwa5EhVDG3qXV42BAZ%2FEHMLrFw88GOqUBGNFlQASrJqUhv2mIuPcxYVketBRTQSILA4CVOTyCu%2BryabJTLHnHwTriLOhIabvQ617JuCQa6DdTWS9fyLYb83RTx5CLeCHqjf41e%2FtjUsy4%2B3l0c3KTEnswZlgakvExyQLHPpgsU9x%2FZnHjMlqzMf6Z6bOSSKewPgNi8k0KXejRsXGt%2FXQ4LPVfO%2BjOQPsSx5cUUlooYBxw6OiDXfRMRP%2FFYM5s&X-Amz-Signature=3bff88c89c7af059115eaaf0abbb97c014e28d455ab40942ab7f346e1b064e57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAP74FUT%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIAtYD9muOqeAs8BpPAMJb0190q2FFvCdDHJcINqnIF%2FIAiEA8jp%2Fcx4qTWnu7BHa2W2L1M0CvUQ5caw8%2B2eW85YryZ8qiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN0yTIcONL1o7b47UCrcA4pZoF4RVvjGk%2BipgVO82Gy158n6%2BSbqMEAl7at0UhLYmDt%2Fi%2FOstw4g6f5p64gKhpaSecvuDqd0%2B159qO1TgH3YvAd7wkb7e2las4%2B0wgZOIQWRgz0BBi%2BTpc2mRe3t3Cslv0hFKPJWCMjM37FAH7bMnYdjFedCrXTVx7qMT%2FGa3eKr2tjvntQALGjmL3BofZG7W2iv9IogwyCpaAApeLptaGFaBigDyjiQKNPB4SweYn5sd4zypGUxdSv1ryPlHlJIobp4%2F14D9HjX43olU%2BnlIbpZQFPEdHFnKhPet9voXbXhGfTQQPpCTPIo61p2dzjLUKXPopgcfN9MAhf%2BaxpafJtWD3eb%2F%2BMFvKNCuCh%2F4jT2hm4klT1ddE4YDjrLCRG5T38Mwi7QKmYBSz2RnhOUm%2Fgp%2BYFS9tmZHBpaMT3R3ij1WnWIdQ7vz%2F1ypPaiLL14LruNSslOe0kxo0PHYGCPDhs4KmZ30MnPk54CIHkby%2FOxXdQ5gZzZKQQnydLVyE0ENcKsVVHpa7nI%2Fa54vPn9366orBk0irZqY4%2BCXXGvB%2BMu%2BYtKaPc%2FVgRTzM3ioeq8ngjxvIZqnY4hDsitN6rgVSpxIKeF7sxOY8rBwa5EhVDG3qXV42BAZ%2FEHMLrFw88GOqUBGNFlQASrJqUhv2mIuPcxYVketBRTQSILA4CVOTyCu%2BryabJTLHnHwTriLOhIabvQ617JuCQa6DdTWS9fyLYb83RTx5CLeCHqjf41e%2FtjUsy4%2B3l0c3KTEnswZlgakvExyQLHPpgsU9x%2FZnHjMlqzMf6Z6bOSSKewPgNi8k0KXejRsXGt%2FXQ4LPVfO%2BjOQPsSx5cUUlooYBxw6OiDXfRMRP%2FFYM5s&X-Amz-Signature=3bff88c89c7af059115eaaf0abbb97c014e28d455ab40942ab7f346e1b064e57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UFMMYJB%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T172534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIB7VLhK24y115RfyobpU%2FSKtu0DKl3HOG51LwXxTWyGgAiEAmpD6ao2iNs%2BS5R%2BPw0PHAHQ03mcpOGxqp7hWH8oD%2Bq4qiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAuG9fINa%2FShVNB%2FWyrcA9zvut%2Fa6wRdYjq0Y0vTvHWqy0HAjIspPX9Uqdqe31VQYif3nNJywKa7cxnH1I6C18ibqgoNsO6jcTzEEFyISBYsvHL%2F0W2GyCA%2F9gFByEGCkSICT0VnJge1zd7EopneFJDpRMIC9%2BG7y04buyFkziCaSJ7m7r2OgcJcsBPAgNjuzkkqQqtt4XauwzPs2JvE%2BqWyPWnKXCyoXtX6wWcX5pTx8uPWoHtfwYm8mZlXSj2Vpq5XlOdJHHanm17NYNvLnxWNCygLG6P5IZvTnBmMrv6dPvRLMcj3qgTGVpo3fh5iVubVQpsnLc0Uy2zxXZF1GuP1UTtGMIMjJfFUFBLQtM8Qtm5m2WcDqTxlAkhpCeP3iMCisSGqRIkdsU8%2Fq%2BG0MZj8Vtye29A8ieEz8Lwn4tqjXJKUj6O7%2FgR0Z3X%2B2FDUILz6%2Fzcee0lt3I%2FCWXwZ1OCM3xTDmdYTjc35zRfzaz4J5zLinG%2FmTNHRoQr1cZ%2Fo1y1fEK8Z0Ysq52wzrYxdUF1jTvQbQvrZPDfn%2BfgDDxYHmw37IgPcBIUcQJfO9bE%2B9rmR5iWTLvTunG7s3VyBTVi7iJnsTeKXKPvBNffHQB0jOhvMR6a2BZWAilsGc8zTAEWC476%2BwfWFFgpzMLvGw88GOqUBCBvag70hwNSe3OYaWi0WafQFTvqig3IJjQrZhInI0E9Gav%2FI%2BWU4vPfO09%2FAB%2BAf4WvhKhRKjPd9ZKF%2BfuIGV4bhheUKUQBH5PN1lCXqlt%2BsWn6oKxoGQPPKRmV%2BY5mmkEizDEbJ99UsslWBTKxwaZ%2Fvw9UTHHeZIU7welrbNmWiAu0ng8uZOvf9qIlQKlBAoVW8A4HmAQaRShUUxarPCb%2Fwzg5u&X-Amz-Signature=9283850f469f0088c19d81105d64c79e18e59ae2f95be7350fdd5d175eee8d30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

