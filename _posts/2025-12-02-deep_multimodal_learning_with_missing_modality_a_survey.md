---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKGNLLCH%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T110104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIFo%2BDr0X5vI9g87eSZ2Q75EzTo7a26CvIUoNBaCPVYXdAiBgPRJzv3X0YZRHjcAkSMVytao1Bu7XrAHmlubhxwH%2FFCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMH%2FvQKME9ZIN0wRHrKtwDKRcdkiqiyLiVP5ZvR2j5wmILPHTgHJoU9Wj58RLtq4XymNQsdldLqiBDfmj%2BdkJReR5CbyjtfyviqPHd5auv2qfkroTReY2%2BXXZ%2FznvQOj2CJau1R7iZc7McHFOm4SdGNlgaQzBk%2FEGf89v%2BMSTxC80HaFP1iyGOTV8z4Vu%2BlA74WLMwrMwz9Ruo%2BpOXXfrDvBbj5OgzDR6exObTj4NZNnkxtB4bOxAJLH24LWnD065wgDhLz8D7zWhX7lgviBkyNxRLUpEwlv8%2FwXWBNcwCHseMxi4Cd6pn2m5NnE0HOozlSOm2%2FXmL14W5jW6cZn9SQ0%2FCm1VDPgkXSltVRWAgpnAcrRpeis3MFNQOucs76YcT9L1UvIT%2FEjXHAQ44%2BvzaZz%2BgR3mCRVYa6dVS%2Bv5CIEh5O8lQIdfH3SC80ubuzwmemhklXlip7bxxiVwPjifWsEeXY0CXFVvLtmoESZjzJ%2FzHI3WJcxsmN9ITVGrTbyVA%2F0RH1mhwVFn3C3HvLcy5ifBWLq1SlW%2FV6xIBalDdC7znM%2BwkOYi0hcltHZR07%2BBpjfd%2FL9dNcHvbxVmmtTHgyDW5dsqu3uSQBlNqIRmY9Fw0ijEO9KlueeXZ8EPcqnZxAAcUZ4%2F637KdhJQwg%2B%2B6yQY6pgGSmURR00DJMTE45s%2B4EZ%2BQ0nLstmHmiJOoG6G1pnJXR0nCHr28U1evExqUQbEEvpBBqeKocJrpUTQGS287PomCtnnC%2Fhc43yLRumexlz%2B02xh9auxqKe6umK%2F7HlaMVGF3Chd2%2BcBCBrszP0y7zthu1Qs0Cc1S7fevOxYZGQCnN%2Bv9bqfz%2FPhgTfF%2FuKkCPGlrRYOxKrRjbPUBMT2nMFZZOZEdN%2FNi&X-Amz-Signature=f57948298f47d701c50637a76ad84f3fc485f18ab1e868e319d11bb6ecbe5f63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKGNLLCH%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T110104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIFo%2BDr0X5vI9g87eSZ2Q75EzTo7a26CvIUoNBaCPVYXdAiBgPRJzv3X0YZRHjcAkSMVytao1Bu7XrAHmlubhxwH%2FFCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMH%2FvQKME9ZIN0wRHrKtwDKRcdkiqiyLiVP5ZvR2j5wmILPHTgHJoU9Wj58RLtq4XymNQsdldLqiBDfmj%2BdkJReR5CbyjtfyviqPHd5auv2qfkroTReY2%2BXXZ%2FznvQOj2CJau1R7iZc7McHFOm4SdGNlgaQzBk%2FEGf89v%2BMSTxC80HaFP1iyGOTV8z4Vu%2BlA74WLMwrMwz9Ruo%2BpOXXfrDvBbj5OgzDR6exObTj4NZNnkxtB4bOxAJLH24LWnD065wgDhLz8D7zWhX7lgviBkyNxRLUpEwlv8%2FwXWBNcwCHseMxi4Cd6pn2m5NnE0HOozlSOm2%2FXmL14W5jW6cZn9SQ0%2FCm1VDPgkXSltVRWAgpnAcrRpeis3MFNQOucs76YcT9L1UvIT%2FEjXHAQ44%2BvzaZz%2BgR3mCRVYa6dVS%2Bv5CIEh5O8lQIdfH3SC80ubuzwmemhklXlip7bxxiVwPjifWsEeXY0CXFVvLtmoESZjzJ%2FzHI3WJcxsmN9ITVGrTbyVA%2F0RH1mhwVFn3C3HvLcy5ifBWLq1SlW%2FV6xIBalDdC7znM%2BwkOYi0hcltHZR07%2BBpjfd%2FL9dNcHvbxVmmtTHgyDW5dsqu3uSQBlNqIRmY9Fw0ijEO9KlueeXZ8EPcqnZxAAcUZ4%2F637KdhJQwg%2B%2B6yQY6pgGSmURR00DJMTE45s%2B4EZ%2BQ0nLstmHmiJOoG6G1pnJXR0nCHr28U1evExqUQbEEvpBBqeKocJrpUTQGS287PomCtnnC%2Fhc43yLRumexlz%2B02xh9auxqKe6umK%2F7HlaMVGF3Chd2%2BcBCBrszP0y7zthu1Qs0Cc1S7fevOxYZGQCnN%2Bv9bqfz%2FPhgTfF%2FuKkCPGlrRYOxKrRjbPUBMT2nMFZZOZEdN%2FNi&X-Amz-Signature=f57948298f47d701c50637a76ad84f3fc485f18ab1e868e319d11bb6ecbe5f63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3LXMOGC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T110105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCyOCKsQ5pc4t23Y7qvBoBoX9eN1xDt52sJRcwWylSvpwIgStP9O5kxK38JskjYqmQvzOpXkjct%2Bk%2FbHyRW%2FF5oSkkq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDKYjgAlBRvWgGyzdwyrcA37F1tDnOZBTooX841aQt5wbtg3171WSdZok9KrKigX%2FftpOiKGGmXzP362EtSAVG4mS3PNz3r8t9MAIjQo5WeDAsW%2BOSNCl0PzPd7S8ET9v9Mif%2F62YBjA3sQdHTbtGSByGkSctLhMCHfgJEZ81HB6pPjEDFxyeL3ImK718PuXo0rZYEMIa%2BHrPL0Vh8rjJQ%2FcVPbC3hdQ%2F3%2F78qKZq0MMImArXglMTmw2mMP4jG6LI00CItFpwKomJwAZzE0%2BJlB7gImeLLX1uQ3hSbS47q56VTuvM%2FNw%2B3%2BbUrH720qwL%2FKWYzchgo3uKp62xoPjGG0q3XaI6KZScEpRKRCacjWxJR5mxYudIdZnAV%2B4WoG7rB0cDjEgVwusutDrQF6txF7OiNKpJI2BIRjm4BVKoDKT60%2BrPHyi8cmFognDUbMWqkl5BX6HCYIK7%2FXC9aTMt869VYOEwAi9tHo7L%2FwfMJHTmKrlX4EYg3BAPJlEu9GPe7WagXB7NC9mxMwUDgICUCAWCREZt3TjOMAnzNa6n96Uyz6TO4wbl7upA5PPo%2BaIFDJpDObIZCBxCjBoRj%2FwsakKlivyqO0w%2Fn8cCrqBCywN1x6fsOVVu%2BQBEmdz6iIgNJ8b2Eo5J3ShjB1z0MJ%2FxuskGOqUBefEpwZD%2ForMkGBspe7eUwn2w7DGR9UyCMOfAf0WssZfTdnKo9eAV4b6yu6H4azChCAdz6MtpdkRU1xmyQBpgkEjZdRB9W9%2BYojDu1OV8K%2BwgUX8tgW1JkTjeRl5gddyOK8rhsaCvO6jLSjsypGyllvrMH8297Sa4B27C2FTUEkPQjVno1%2BjOk%2Bc1PfCLUQv5wcSi4hn0EqQFQ%2F%2BtJCM1%2FmiJdbHb&X-Amz-Signature=74de73db2b76f890c25e0ae5e611f70c8a986dc8132677c2779bf8bd709e0409&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3LXMOGC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T110105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCyOCKsQ5pc4t23Y7qvBoBoX9eN1xDt52sJRcwWylSvpwIgStP9O5kxK38JskjYqmQvzOpXkjct%2Bk%2FbHyRW%2FF5oSkkq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDKYjgAlBRvWgGyzdwyrcA37F1tDnOZBTooX841aQt5wbtg3171WSdZok9KrKigX%2FftpOiKGGmXzP362EtSAVG4mS3PNz3r8t9MAIjQo5WeDAsW%2BOSNCl0PzPd7S8ET9v9Mif%2F62YBjA3sQdHTbtGSByGkSctLhMCHfgJEZ81HB6pPjEDFxyeL3ImK718PuXo0rZYEMIa%2BHrPL0Vh8rjJQ%2FcVPbC3hdQ%2F3%2F78qKZq0MMImArXglMTmw2mMP4jG6LI00CItFpwKomJwAZzE0%2BJlB7gImeLLX1uQ3hSbS47q56VTuvM%2FNw%2B3%2BbUrH720qwL%2FKWYzchgo3uKp62xoPjGG0q3XaI6KZScEpRKRCacjWxJR5mxYudIdZnAV%2B4WoG7rB0cDjEgVwusutDrQF6txF7OiNKpJI2BIRjm4BVKoDKT60%2BrPHyi8cmFognDUbMWqkl5BX6HCYIK7%2FXC9aTMt869VYOEwAi9tHo7L%2FwfMJHTmKrlX4EYg3BAPJlEu9GPe7WagXB7NC9mxMwUDgICUCAWCREZt3TjOMAnzNa6n96Uyz6TO4wbl7upA5PPo%2BaIFDJpDObIZCBxCjBoRj%2FwsakKlivyqO0w%2Fn8cCrqBCywN1x6fsOVVu%2BQBEmdz6iIgNJ8b2Eo5J3ShjB1z0MJ%2FxuskGOqUBefEpwZD%2ForMkGBspe7eUwn2w7DGR9UyCMOfAf0WssZfTdnKo9eAV4b6yu6H4azChCAdz6MtpdkRU1xmyQBpgkEjZdRB9W9%2BYojDu1OV8K%2BwgUX8tgW1JkTjeRl5gddyOK8rhsaCvO6jLSjsypGyllvrMH8297Sa4B27C2FTUEkPQjVno1%2BjOk%2Bc1PfCLUQv5wcSi4hn0EqQFQ%2F%2BtJCM1%2FmiJdbHb&X-Amz-Signature=74de73db2b76f890c25e0ae5e611f70c8a986dc8132677c2779bf8bd709e0409&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466757B5X7G%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T110102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCh2rkd18QoTngjl%2BJOhM8p35CEGukso7yZ%2BkOWX3NyQwIhAJicUVwoYPLd0uJvfbzE8sdweSChbp7eNuU6Gg88tJaIKv8DCBMQABoMNjM3NDIzMTgzODA1IgxnllFy6mHzd2uBItAq3APaTCE2uX%2BRJbD1Ts8tPW7%2Fe7FnzpW1V78K%2FcURswxsLj5MGLgoXnH%2FioIysGGHczE8wIQTSzyaxDv5zLGD8iwIwHAvPi1WELim8%2BiqtQgxWBckDEnTQPDlxWiw2SWs1HRoNKvLiEzJqkuo7JJTrOuv4LWW1m0UFVApY7mm7y3UHa5LQaciYb3LjXVUCQGb%2BdR%2FN15q2omCAA%2FrgYQ67LgSAZTRl7ExHOBHR6o8ABFnfV7t7TpesSVFk%2F3rpeXzd0eIfDB43lvqkgusU5X29OmEFV8I%2FfXUMAkLT3Id%2B3KgY%2FBBJqY9kxJdTheFnOtQBFrTerwGee0BQURd7IMYbntGHJwkC7sTIVF4BmEYt49Oz%2F2XjieKU5JKIdJNJHJ7KdsdeZu12obdAlLj%2B9h6COKeoIO4%2BUh2SR3lbBcqF5vfxWdF6ud60YeJbz%2FVZvyIiOklkqa0PvjucSv0jiosqUDyXdQmZtgjeHYQN9Gdm3tFZJSnNBuM8z5NR8ef1rgGXiQsYn4VQo6IttWJd5pru4BEgrwKkjlmqSV3dcQRJADB0czr6qZ0djK6mMdCAGzrzwHJycwaKdrlDtVHASz7KR2NB4cMO3ZOXSczlw7a78jiudKCnW74LqB%2BkDpWHzCv77rJBjqkAZOAzJyxkYmM%2BIjZI4sjoxUmDODpBFOr92bReIebORALQ7uBU4A%2Bs%2Bmqcn6DVY93%2BSCOj%2BsHLjmILD3zikqheEmAyUoim0Ndm52qFuk%2BW29%2FdQsJfI71EydJp%2BpmP%2BGdx8KV066a5KJt8eBWW%2BxMWtqSW5Bl5IdATMm87fgedXX9QnE6f%2FG4EIjylbAxKF3qtK0A3wVX0ezEMx3VLBp%2BlHlwkpiS&X-Amz-Signature=6b88c184282face56f64748bbcf9d950f786ed5c6f8465b066fb5b075a40e95e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHQNVGBZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T110107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIALi0T9QaUWo5PjxxCWOECvnfOGysnXuamI2UUUgExEnAiBdvGlAN3Zjou1b0j%2Fdn2AdIsscLMZVJQZSl5hyjy9GAyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMldOR2N0Wtr6oCkeLKtwDnFq94VaoA4Aj5IEAvtua0RwL2xYWDmza9waXypuY8uqhHB0xPBqng8CYRAnA4%2B8nY5Ul4qablH4993VKghr7flo%2BvKum4Ne7nwbxiDfduFNSleapc7jyCn1MErsI46rbCAfCxJNQMQvxqrY8rtfJExJIxk19dB8w8ZhArlO7rv5cfBXhZAh%2FLvCRED11WZ3kRyOyCP3pZLEU1VeOGZTHptpqdxuIhqKkIC8pmUqWdpAqpPnXZTSXzRMCyhFLAU11iDazlnqv37DXIzwvMMpZZZedqqTtSMah0dB2ul6mAiMmWMeRWLEkjRuiqlhEehWhRh%2FRrAi4A0qKBtwJQpfzffi0qH2tURdXae0PdSzlrxXpam9SUIMn6tmpfyobKzprK%2F196wfFOOtV%2BStHpjdu5MROyiTiCn0exTpTToSQrD3WaFv6GNi5HFn2SMcIOSIX2W8Swdpub4iAmp5fhJ94L4%2FVE9axTR3XkE4rpcpdQUJSvJvpO9x00Y94MJylsaaLeq%2B9bvIq6qyUZUGahUK74jRkDQyxbiKi7NHnU84vICvWA6L%2FjMpay1t1Y6GmZ6%2BGm8ENJ3EDQXz8i9HenOWyHyOqGcHDgs5cGhBTS8n4EFJsjQwA38UVftiqNKYwlO%2B6yQY6pgHWqrZjm6gifgQ3lZYK7j3ONPsmzpOnLrOpSC4h0UPMvXem1w3W1fxVEa5zWCAVM5AInvQla3eyU25j6QHIPHmAfXssyDNY9kvzw68dnT9jyA27nPIevky3D4L9PzB2wAweV5G2osjRCbRoZaubN4gC1%2FAtAd0a0fTrL1Z2ewsG2UDv1DU08vt4V7Dr%2FddCbL%2Bdi3TKGIF44LSbxlJmd3TwkJgqtzuD&X-Amz-Signature=2e2cdce15f886c6237f25c25376a1ac0ab771d33a93875730a94785066c87d12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHQNVGBZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T110107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIALi0T9QaUWo5PjxxCWOECvnfOGysnXuamI2UUUgExEnAiBdvGlAN3Zjou1b0j%2Fdn2AdIsscLMZVJQZSl5hyjy9GAyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMldOR2N0Wtr6oCkeLKtwDnFq94VaoA4Aj5IEAvtua0RwL2xYWDmza9waXypuY8uqhHB0xPBqng8CYRAnA4%2B8nY5Ul4qablH4993VKghr7flo%2BvKum4Ne7nwbxiDfduFNSleapc7jyCn1MErsI46rbCAfCxJNQMQvxqrY8rtfJExJIxk19dB8w8ZhArlO7rv5cfBXhZAh%2FLvCRED11WZ3kRyOyCP3pZLEU1VeOGZTHptpqdxuIhqKkIC8pmUqWdpAqpPnXZTSXzRMCyhFLAU11iDazlnqv37DXIzwvMMpZZZedqqTtSMah0dB2ul6mAiMmWMeRWLEkjRuiqlhEehWhRh%2FRrAi4A0qKBtwJQpfzffi0qH2tURdXae0PdSzlrxXpam9SUIMn6tmpfyobKzprK%2F196wfFOOtV%2BStHpjdu5MROyiTiCn0exTpTToSQrD3WaFv6GNi5HFn2SMcIOSIX2W8Swdpub4iAmp5fhJ94L4%2FVE9axTR3XkE4rpcpdQUJSvJvpO9x00Y94MJylsaaLeq%2B9bvIq6qyUZUGahUK74jRkDQyxbiKi7NHnU84vICvWA6L%2FjMpay1t1Y6GmZ6%2BGm8ENJ3EDQXz8i9HenOWyHyOqGcHDgs5cGhBTS8n4EFJsjQwA38UVftiqNKYwlO%2B6yQY6pgHWqrZjm6gifgQ3lZYK7j3ONPsmzpOnLrOpSC4h0UPMvXem1w3W1fxVEa5zWCAVM5AInvQla3eyU25j6QHIPHmAfXssyDNY9kvzw68dnT9jyA27nPIevky3D4L9PzB2wAweV5G2osjRCbRoZaubN4gC1%2FAtAd0a0fTrL1Z2ewsG2UDv1DU08vt4V7Dr%2FddCbL%2Bdi3TKGIF44LSbxlJmd3TwkJgqtzuD&X-Amz-Signature=2e2cdce15f886c6237f25c25376a1ac0ab771d33a93875730a94785066c87d12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

